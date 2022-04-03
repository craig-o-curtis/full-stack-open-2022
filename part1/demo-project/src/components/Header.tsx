import React from "react";
import { ICourse } from "../interfaces";
interface HeaderProps {
  course: ICourse;
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Header = ({ course: { title }, heading: Tag = "h1" }: HeaderProps) => {
  return (
    <header>
      <Tag>{title}</Tag>
    </header>
  );
};

export default Header;
