import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserInputContext } from "@/app/_context/UserInputContext";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="px-4 md:px-10 lg:px-24 mx-0 md:mx-20 lg:mx-44">
      {/* Input Topic */}
      <div className="mb-4">
        <label className="text-sm md:text-base">
          💡 Write the topic for which you want to generate the course (e.g., Python Course, Yoga, etc.):
        </label>
        <Input
          onChange={(e) => handleInputChange("Topic", e.target.value)}
          className="my-2 w-full"
          placeholder="Topic"
          defaultValue={userCourseInput?.Topic}
        />
      </div>
      {/* Textarea Description */}
      <div>
        <label className="text-sm md:text-base">
          📝 Write a brief description of the topic:
        </label>
        <Textarea
          onChange={(e) => handleInputChange("Description", e.target.value)}
          className="my-2 w-full"
          placeholder="Description"
          defaultValue={userCourseInput?.Description}
        />
      </div>
    </div>
  );
}

export default TopicDescription;