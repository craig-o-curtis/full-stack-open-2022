import React from "react";
import { IPart } from "../interfaces";
import Part from "./Part";

interface PartsProps {
  parts: IPart[];
}

const Parts = ({ parts }: PartsProps) => {
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </ul>
  );
};

export default Parts;
