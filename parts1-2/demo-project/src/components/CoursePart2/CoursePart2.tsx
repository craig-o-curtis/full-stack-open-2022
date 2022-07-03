import React from "react";
import { ICourse } from "./Course.types";
import Header from "./Header";
import Parts from "./Parts";
import Totals from "./Totals";
import { Loader } from "../common";

const CoursePartWrapper2 = () => {
  const courses: ICourse[] = [
    {
      title: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      title: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <Header as="h1">Web development curriculum</Header>
      {courses.length > 0 ? (
        courses.map((course) => (
          <React.Fragment key={course.id}>
            <Header as="h2">{course.title}</Header>
            <Parts parts={course.parts} />
            <Totals parts={course.parts} />
          </React.Fragment>
        ))
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CoursePartWrapper2;
