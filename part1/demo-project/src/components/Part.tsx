import React from "react";

export interface IPart {
  name: string;
  exercise: number;
}

interface PartProps {
  part: IPart;
}

const Part = ({ part: { name, exercise } }: PartProps) => {
  return (
    <li>
      <p>
        {name}: <strong>{exercise}</strong>
      </p>
    </li>
  );
};

export default Part;
