import React from "react";
import { FaRegClock } from "react-icons/fa6";

function ChapterListCard({ chapter, index }) {
  return (
    <div className="grid grid-cols-5 p-2 md:p-4 items-center border-b">
      <div>
        <h2 className="p-1 bg-[#18cf97] text-center w-6 h-6 md:w-8 md:h-8 text-white rounded-full text-sm md:text-base">
          {index + 1}
        </h2>
      </div>
      <div className="col-span-4">
        <h2 className="text-sm md:text-base">
          {chapter?.["Chapter Name"] || chapter?.["Chapter name"]}
        </h2>
        <h2 className="text-xs md:text-sm text-center flex gap-2 text-[#18cf97]">
          <FaRegClock className="mt-0.5 md:mt-1" />
          {chapter?.Duration}
        </h2>
      </div>
    </div>
  );
}

export default ChapterListCard;