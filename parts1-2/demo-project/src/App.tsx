import React from "react";

import {
  /*Course, Feedback, Anecdotes, */ RefactoredCourse,
} from "./components";

const App = () => {
  return (
    <div className="App">
      {/* <Course /> */}
      {/* <Feedback /> */}
      {/* 1.12 Anecdotes component is top-level for this section */}
      {/* <Anecdotes /> */}
      <RefactoredCourse />
    </div>
  );
};

export default App;
