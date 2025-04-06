import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";
import { useContext } from "react";


function SelectOptions() {
const {userCourseInput,setUserCourseInput} = useContext(UserInputContext);
const handleOptionChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
}
  return (
    <div className="w-full px-36">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium"> 
            👨‍🎓Difficulty Level
          </label>
          <Select  onValueChange={(value) => handleOptionChange('Difficulty', value)} defaultValue={userCourseInput?.Difficulty}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium" > 
            ⌛Course Duration
          </label>
          <Select onValueChange={(value) => handleOptionChange('Duration', value)} defaultValue={userCourseInput?.Duration}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="2h">2 Hours</SelectItem>
              <SelectItem value="3h+">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium"> 
            🎥Add Video
          </label>
          <Select onValueChange={(value) => handleOptionChange('Video', value)} defaultValue={userCourseInput?.Video}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium"> 
            📖No of Lessons
          </label>
          <Input  type="number" onChange={(e) => handleOptionChange('No_of_lessons', e.target.value)} defaultValue={userCourseInput?.No_of_lessons}/>
        </div>
      </div>
    </div>
  );
}

export default SelectOptions;
