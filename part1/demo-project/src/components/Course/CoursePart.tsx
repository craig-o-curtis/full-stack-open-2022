import React from "react";
import { ICoursePart } from "./Course.types";

interface CoursePartProps {
  part: ICoursePart;
}

const CoursePart = ({ part: { name, exercises } }: CoursePartProps) => {
  return (
    <li>
      <p>
        {name}: <strong>{exercises}</strong>
      </p>
    </li>
  );
};

export default CoursePart;
