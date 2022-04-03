import React from "react";
import { IPart } from "../interfaces";

interface PartProps {
  part: IPart;
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
