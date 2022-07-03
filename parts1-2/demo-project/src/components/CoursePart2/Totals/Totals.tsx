import React, { useMemo } from "react";
import { ICoursePart } from "../Course.types";

interface CourseTotalsProps {
  parts: ICoursePart[];
}

//** This step was already completed in the precious exercise
//** Already using reduce to calculate totals
//** using VSCode Prettier for auto-formatting
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
