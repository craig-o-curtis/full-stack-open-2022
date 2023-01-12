import React from 'react';

import { ICoursePart } from '../Course.types';
import Part from '../Part';

interface PartsProps {
  parts: ICoursePart[];
}

const Parts = ({ parts }: PartsProps) => {
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

export default Parts;
