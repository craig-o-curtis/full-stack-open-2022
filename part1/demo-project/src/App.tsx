import React, { useState, useEffect, useMemo } from "react";
import { Header, Parts, IPart, Totals, Loader } from "./components";
import courseData from "./data/courseData.json";
interface ICourse {
  title: string;
  parts: IPart[];
}

const App = () => {
  const [course, setCourse] = useState<ICourse>();

  useEffect(() => {
    // ** 1.3 course information step3 - data already structured in array syntax in courseData.json
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

  const totals = useMemo(
    (): number =>
      !course
        ? 0
        : course.parts.reduce((acc, curr) => {
            return acc + curr.exercises;
          }, 0),
    [course]
  );

  return (
    <div className="App">
      {!course ? (
        <Loader />
      ) : (
        <>
          <Header title={course.title} />
          <Parts parts={course.parts} />
          <Totals totals={totals} />
        </>
      )}
    </div>
  );
};

export default App;
