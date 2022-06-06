import React from "react";
import { ICourse } from "./Course.types";

interface CourseHeaderProps {
  course: ICourse;
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CourseHeader = ({
  course: { title },
  heading: Tag = "h1",
}: CourseHeaderProps) => {
  return (
    <header>
      <Tag title={title}>{title}</Tag>
    </header>
  );
};

export default CourseHeader;
