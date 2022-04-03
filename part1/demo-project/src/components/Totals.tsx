import React, { useMemo } from "react";
import { ICourse, IPart } from "../interfaces";

interface TotalsProps {
  parts: IPart[];
}

const Totals = ({ parts }: TotalsProps) => {
  const totals = useMemo(
    (): number =>
      !parts
        ? 0
        : parts.reduce((acc, curr) => {
            return acc + curr.exercises;
          }, 0),
    [parts]
  );

  return (
    <div>
      <p>
        Number of exercises: <strong>{totals}</strong>
      </p>
    </div>
  );
};

export default Totals;
