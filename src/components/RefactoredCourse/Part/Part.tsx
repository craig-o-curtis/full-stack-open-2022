import React from "react";
import { ICoursePart } from "../Course.types";

interface PartProps {
  part: ICoursePart;
}

const Part = ({ part: { name, exercises } }: PartProps) => {
  return (
    <li>
      <p>
        {name}: <strong>{exercises}</strong>
      </p>
    </li>
  );
};

export default Part;
