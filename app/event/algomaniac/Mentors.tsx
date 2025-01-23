import Image from "next/image";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import decisiaBgMobile from "@/assets/images/Algomaniac/starbgMobile.png";
import decisiaBg from "@/assets/images/Algomaniac/star bg.png";
import line1 from '@/assets/images/Algomaniac/line1.png'

type Professor = {
  name: string;
  profession: string;
  researchPoint: string;
  img: string; // Image path or imported asset
};

const professors: Professor[] = [
  {
    name: "Amitava Chatterjee",
    profession:
      "Professor at Department of Electrical Engineering, Jadavpur University",
    researchPoint: "https://scholar.google.co.in/citations?user=hs1L7A0AAAAJ&hl=en",
    img: "ac.png", // Replace with the actual image path or import
  },
  {
    name: "Smita Sadhu",
    profession:
      "Professor at Department of Electrical Engineering, Jadavpur University",
    researchPoint: "https://scholar.google.co.in/citations?user=IG1XQYkAAAAJ&hl=en",
    img: "ss.png", // Replace with the actual image path or import
  },
 
];

const Mentors = () => {
  return (
    <div id="judges" className="relative  py-12">
      <div
        className="absolute top-0 left-0 w-full h-full -z-20 bg-gradient-to-b from-[#6435AD]  to-[#2C1071]"
      ></div>
      <Image
        src={decisiaBg}
        className=" h-auto animate-twinkle hidden sm:block w-full  absolute opacity-90   top-0 right-0 -z-10"
        alt="trees"
      />
      <Image
        src={decisiaBgMobile}
        className=" sm:hidden animate-twinkle block h-auto w-full  absolute opacity-90   top-0 right-0 -z-10"
        alt="trees"
      />
      <Image src={line1} alt='Mountain Image'  className='absolute object-contain w-full top-[80%] h- right-0 '/>
      <div className="maxWidthForSections">
        <h2 className="sm:text-5xl text-3xl font-medium text-white text-shadow-dark text-center ">
          Mentors
        </h2>
        <p className="opacity-80 text-white text-center mt-2 text-base sm:text-xl font-medium">
          Meet the Mentors of Algomaniac!
        </p>

        <div className="mx-auto flex justify-center mt-6">
          {/* ------------------mentor names---------------- */}
          <div
            className={`font-sans flex justify-center flex-col sm:flex-row gap-2 md:gap-x-12`}
          >
            {professors.map((professor, index) => (
              <div
                key={index}
                className="rounded-xl bg-white/20 shadow-black/20 shadow-md backdrop-blur-sm flex  py-6 px-4 items-center gap-x-4  sm:max-w-[500px] text-white "
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
                    <Link target="_blank" href={professor.researchPoint} className="">
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
