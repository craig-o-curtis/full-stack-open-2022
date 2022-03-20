import { useState, useEffect, useMemo } from "react";
import { Header, Parts, IPart, Totals } from "./components";
import courseData from "./data/courseData.json";

interface ICourse {
  title: string;
  parts: IPart[];
}

const App = () => {
  const [course, setCourse] = useState<ICourse>();

  useEffect(() => {
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
  console.log(courseData);

  const totals = useMemo(
    (): number =>
      !course
        ? 0
        : course.parts.reduce((acc, curr) => {
            return acc + curr.exercise;
          }, 0),
    [course]
  );

  return (
    <div className="App">
      {!course ? (
        "Loading..."
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
