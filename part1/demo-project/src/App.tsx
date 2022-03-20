import { Header, Parts, IPart, Totals } from "./components";

interface ICourse {
  title: string;
  parts: IPart[];
}

const App = () => {
  const courseData: ICourse = {
    title: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercise: 10 },
      { name: "Using props to pass data", exercise: 7 },
      { name: "State of a component", exercise: 14 },
    ],
  };

  const getTotals = (): number =>
    courseData.parts.reduce((acc, curr) => {
      return acc + curr.exercise;
    }, 0);
  console.log(getTotals);

  return (
    <div className="App">
      <Header title={courseData.title} />
      <Parts parts={courseData.parts} />
      <Totals totals={getTotals()} />
    </div>
  );
};

export default App;
