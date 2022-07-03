import React, { useMemo } from "react";
import { ICoursePart } from "../Course.types";

interface CourseTotalsProps {
  parts: ICoursePart[];
}

//** This step was already completed in the precious exercise
const CourseTotals = ({ parts }: CourseTotalsProps) => {
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

export default CourseTotals;
