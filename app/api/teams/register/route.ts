import { prisma } from "@/lib/prisma"; // Adjust the path as per your project setup
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      teamName,
      eventName,
      leaderId,
      members: teamMembers,
      leaderEmail,
      leaderName,
    } = await req.json();

    // send a get request to / route of email service to avoid failure due to cold start
    axios
      .get(`${process.env.EMAIL_URL}`)
      .catch((err) =>
        console.error("Failed to warm up email service:", err.message)
      );

    // Input validation
    if (
      !teamName ||
      !eventName ||
      !leaderId ||
      !leaderEmail ||
      !Array.isArray(teamMembers)
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // check if leaderEmail is same as any of the teamMembers
    if (teamMembers.includes(leaderEmail)) {
      return NextResponse.json(
        {
          message:
            "You cannot be add your name as a member while registering as a Leader",
        },
        { status: 400 }
      );
    }

    // Combine leader and team members for validation
    const allMembers = [...teamMembers, leaderEmail];

    // Check if the leader or any member is already in a team for this event
    const existingTeams = await prisma.team.findMany({
      where: {
        eventName,
        OR: [
          { leaderId },
          { members: { some: { email: { in: allMembers } } } },
        ],
      },
      include: { members: true },
    });

    if (existingTeams.length > 0) {
      // If leader or any member is already in a team
      const existingTeam = existingTeams[0];
      const isLeaderInTeam = existingTeam.leaderId === leaderId;
      const existingMembers = existingTeam.members.filter((member) =>
        allMembers.includes(member.email)
      );

      return NextResponse.json(
        {
          message: isLeaderInTeam
            ? "You are already part of a team for this event."
            : `One or more members (${existingMembers
                .map((m) => m.email)
                .join(", ")}) are already part of a team for this event.`,
        },
        { status: 400 }
      );
    }

    // Ensure team size doesn't exceed maxSize
    const maxSize = 5;
    if (teamMembers.length + 1 > maxSize) {
      return NextResponse.json(
        { message: `Team size cannot exceed ${maxSize}` },
        { status: 400 }
      );
    }

    // Create the team
    const team = await prisma.team.create({
      data: {
        teamName,
        eventName,
        leaderId,
        members: {
          connect: [
            { id: leaderId }, // Connect leader
            ...teamMembers.map((memberEmail: string) => ({
              email: memberEmail,
            })), // Connect members
          ],
        },
      },
      include: { members: true },
    });

    // Notify team members
    const notifications = teamMembers.map((email: string) => ({
      email,
      title: `You've been added to the team "${teamName}"`,
      message: `You are now part of the team "${teamName}" for the event "${eventName}".`,
      type: "TEAM_INVITE",
    }));

    // Notify leader
    notifications.push({
      email: leaderEmail,
      title: `Team "${teamName}" created successfully`,
      message: `Yay! Team "${teamName}" has been created successfully for the event "${eventName}".`,
      type: "TEAM_CREATE",
    });

    await Promise.all(
      notifications.map(async (notification) => {
        await prisma.notification.create({
          data: notification,
        });
      })
    );

    // Send email to the leader
    let emailSent = true;
    try {
      await axios.post(`${process.env.EMAIL_URL}/api/event`, {
        to: leaderEmail,
        subject: `Registration Successful for ${eventName}`,
        name: leaderName,
        eventName,
      });
    } catch (emailError: any) {
      console.error("Failed to send email:", emailError.message);
      emailSent = false;
    }

    const responseMessage = emailSent
      ? "Solo registration successful."
      : "Solo registration successful. However, we couldn't send a confirmation email. Please contact the organizers for assistance.";

    return NextResponse.json(
      {
        message: responseMessage,
        team,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
