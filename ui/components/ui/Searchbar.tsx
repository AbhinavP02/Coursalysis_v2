import React from "react";
import Image from "next/image";

interface SearchbarType {
  placeholder: string;
}

const Searchbar = ({ placeholder }: SearchbarType) => {
  return (
    <div className="shadow-lg pr-4 rounded-[24px] border-2 font-normal text-xl w-full p-2 flex justify-end mt-8">
      <input
        className="text-right outline-none"
        type="text"
        placeholder={placeholder}
      />
      <Image className="pl-2" src="/mag.svg" width="25" height="25" alt="mag" />
    </div>
  );
};

export default Searchbar;
