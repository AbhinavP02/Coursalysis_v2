import React from "react";
import Image from "next/image";
import { Searchbar } from "./ui";

const Landing = () => {
  return (
    <div
      className="flex max-w-[1440px] mx-auto md:px-16 sm:px-10 px-6 py-10
      justify-center gap-x-2 sm:gap-x-15 lg:gap-x-20 font-bold"
    >
      <div>
        <Image
          className="rounded-[50px]"
          src="/girl.png"
          width={450}
          height={400}
          alt="girl"
        />
      </div>

      <div className="float-right whitespace-normal sm:whitespace-nowrap text-right text-3xl md:text-4xl lg:text-5xl pt-16 sm:pt-24 lg:pt-32">
        <p>
          Make <span className="text-red-600">Smarter</span>
        </p>
        <p>Learning Choices</p>
        <p className="text-lg font-normal hidden sm:inline-block sm:whitespace-normal">
          Seemlessly compare and select with Coursalysis
        </p>

        <Searchbar placeholder="UX Design Courses" />
      </div>
    </div>
  );
};
export default Landing;
