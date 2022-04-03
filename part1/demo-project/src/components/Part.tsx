import React from "react";

export interface IPart {
  name: string;
  exercises: number;
}

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
