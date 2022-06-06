import React from "react";
import { ICoursePart } from "./Course.types";
import CoursePart from "./CoursePart";

interface CoursePartsProps {
  parts: ICoursePart[];
}

const CourseParts = ({ parts }: CoursePartsProps) => {
  return (
    <ul>
      {parts.map((part) => (
        <CoursePart key={part.name} part={part} />
      ))}
    </ul>
  );
};

export default CourseParts;
