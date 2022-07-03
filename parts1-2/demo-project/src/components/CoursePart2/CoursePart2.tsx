import React from "react";
import Header from "./Header";
import Parts from "./Parts";
import Totals from "./Totals";

const CoursePartWrapper2 = () => {
  const course = {
    id: 1,
    title: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    <>
      <Header course={course} />
      <Parts parts={course.parts} />
      <Totals parts={course.parts} />
    </>
  );
};

export default CoursePartWrapper2;
