import React from 'react'
import Image from "next/image";
import heroBgBottom from "@/assets/images/Inquizzitive/heroBottom.png"
import mech1 from "@/assets/images/Inquizzitive/mech1.png"
import mech3 from "@/assets/images/Inquizzitive/mech3.png"

const rulesDecisia = [
    "Teams can have 2-4 (max.) members, including the Team Lead.",
    "Teams may be formed across different institutes and different classes but all participants must be students.",
    "Registration will be ONLINE through the official website of Convolution-X.",
    "On-spot registrations may be allowed depending on vacancy.",
    "There will be two rounds: Prelims and Finals.",
    "The top 8 teams will move to the Finals from the prelims."
  ];
const AboutQuiz = () => {
    return (
        <div
          id="rules"
          className={`py-12 relative  flex items-center   `}
        >
          <div
            className="absolute top-0 left-0 w-full h-full bg-[#1A0F52] -z-20"
          ></div>
          <Image src={heroBgBottom} alt="hero" className="absolute top-0 left-0 -z-10 -scale-y-100" />
          <Image src={mech1} alt="hero" className="absolute top-0 left-0 -z-10 w-[35vw] sm:max-w-[500px] sm:w-[27vw] -scale-y-100" />
          <Image src={mech3} alt="hero" className="absolute bottom-[-15%] right-0 -z-10 w-[35vw] sm:max-w-[500px] object-cover sm:w-[27vw] " />
          {/* --------------------------about Image background-------------- */}
         
        
          <div className="maxWidthForSections flex flex-col items-center">
            <div
              className={`rounded-xl sm:py-12 py-6 sm:px-8 px-4 bg-gradient-to-l from-white/20 to-white/10 backdrop-filter backdrop-blur-sm relative shadow-white/20 shadow-lg `}
            >
              
              <h1 className="uppercase text-center text-2xl sm:text-4xl mb-8 text-white text-shadow-dark">
                Rules & Regulations
              </h1>
              <ul className="space-y-3  list-disc  list-inside text-shadow-dark text-white sm:text-xl text-sm">
                {rulesDecisia.map((text,index)=>{return (
                  <li key={index}>{text}</li>
                )})}
                
              </ul>
            </div>
            <a href="https://drive.google.com/file/d/1VuQRbYo6fMCprIjqWwuVfH7PQyCCKAOI/view?usp=sharing" target="_blank" className="mt-4 self-center py-2 sm:px-8 px-6 sm:text-xl rounded-full shadow-md shadow-white/70 hover:shadow-white/30  hover:bg-[#34246B] bg-[#ffff]  hover:text-white text-[#34246B]  transition-all duration-300 ">
              <p className="     ">Know More</p>
            </a>
          </div>
        </div>
      );
}

export default AboutQuiz
