"use client";
import React, { useContext } from "react";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import { UserInputContext } from "@/app/_context/UserInputContext";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({ ...prev, category: category }));
  };

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <h2 className="my-3 md:my-5 text-lg md:text-xl">Select the course category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
        {CategoryList.map((item, index) => (
          <div
            className={`flex flex-col p-3 md:p-5 border items-center rounded-xl hover:border-[#15b989] hover:bg-green-200 hover:shadow-md transition-all duration-200 cursor-pointer ${
              userCourseInput?.category === item.name && "bg-green-200 border-[#15b989]"
            }`}
            key={index}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon} alt={item.name} width={40} height={40} className="w-10 h-10 md:w-12 md:h-12" />
            <h2 className="text-sm md:text-base">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;