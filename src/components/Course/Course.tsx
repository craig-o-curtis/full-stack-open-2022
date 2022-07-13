import React, { useState, useEffect } from "react";

import courseData from "../../data/courseData.json";
import { ICourse } from "./Course.types";
import CourseHeader from "./CourseHeader";
import { Loader } from "../common";
import CourseParts from "./CourseParts";
import CourseTotals from "./CourseTotals";

const Course = () => {
  const [course, setCourse] = useState<ICourse>();

  useEffect(() => {
    // ** 1.5 course information step5 - data already structured in array syntax in courseData.json
    const fetchData = async () => {
      const data = await new Promise<ICourse>((resolve, reject) => {
        try {
          resolve(courseData);
        } catch (error) {
          reject(error);
        }
      });
      setCourse(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {!course ? (
        <Loader />
      ) : (
        <>
          <CourseHeader course={course} />
          <CourseParts parts={course.parts} />
          <CourseTotals parts={course.parts} />
        </>
      )}
    </div>
  );
};

export default Course;
