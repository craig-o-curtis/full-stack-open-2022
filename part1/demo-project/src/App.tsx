import React, { useState, useEffect, useMemo } from "react";
import { Header, Parts, Totals, Loader } from "./components";
import courseData from "./data/courseData.json";
import { ICourse } from "./interfaces";

const App = () => {
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
    <div className="App">
      {!course ? (
        <Loader />
      ) : (
        <>
          <Header course={course} />
          <Parts parts={course.parts} />
          <Totals parts={course.parts} />
        </>
      )}
    </div>
  );
};

export default App;
