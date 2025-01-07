import Image from "next/image";
import React from "react";
import flakebg from "@/assets/images/SparkHack/flakeBg.png";
import flakebgMobile from "@/assets/images/SparkHack/flakeBgMobile.png";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
type Professor = {
  name: string;
  profession: string;
  researchPoint: string;
  img: string; // Image path or imported asset
};

const professors: Professor[] = [
  {
    name: "Debangshu Dey",
    profession:
      "Professor at Department of Electrical Engineering, Jadavpur University",
    researchPoint: "https://scholar.google.com/citations?user=tlzV8CAAAAAJ&hl=en",
    img: "dsd.png", // Replace with the actual image path or import
  },
  {
    name: "Suddhasatwa Chakraborty",
    profession:
      "Professor at Department of Electrical Engineering, Jadavpur University",
    researchPoint: "https://www.researchgate.net/profile/Suddhasatwa-Chakraborty",
    img: "sdc.png", // Replace with the actual image path or import
  },
];

const Mentors = () => {
  return (
    <div className="relative  py-12">
      <div
        className="absolute top-0 left-0 w-full h-full -z-20 bg-gradient-to-b from-white    
     to-[#2CB1DF]"
      ></div>
      <Image
        src={flakebg}
        className=" h-auto hidden sm:block w-full  absolute opacity-40   bottom-0 right-0 -z-10"
        alt="trees"
      />
      <Image
        src={flakebgMobile}
        className=" sm:hidden block h-auto w-full  absolute opacity-60   bottom-0 right-0 -z-10"
        alt="trees"
      />
      <div className="maxWidthForSections">
        <h2 className="text-4xl font-medium text-black text-center ">
          Judges & Mentors
        </h2>
        <p className="opacity-80 text-center mt-2 text-sm sm:text-lg font-medium">
          Meet the Judges and Mentors of Sparkhack!
        </p>

        <div className="mx-auto flex justify-center mt-6">
          {/* ------------------mentor names---------------- */}
          <div
            className={`font-sans flex justify-center flex-col sm:flex-row gap-2 md:gap-x-12`}
          >
            {professors.map((professor, index) => (
              <div
                key={index}
                className="rounded-xl bg-white/20 shadow-black/20 shadow-md backdrop-blur-sm flex  py-6 px-4 items-center gap-x-4  sm:max-w-[500px] "
              >
                <Image
                  src={`/MentorJudges/` + professor.img}
                  alt={`${professor.name} image`}
                  className="size-20 sm:size-28 rounded-full shadow-white shadow sm"
                  width={112} // Adjust width
                  height={112} // Adjust height
                />
                <div className="">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold sm:text-base text-sm  ">
                      {professor.name}
                    </h2>
                    <Link href={professor.researchPoint} className="">
                      <FaInfoCircle />
                    </Link>
                  </div>
                  <p className="text-xs sm:text-sm ">{professor.profession}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentors;
