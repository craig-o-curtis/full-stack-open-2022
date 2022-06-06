import React from "react";

import Course from "./components/Course";
import Feedback from "./components/Feedback";

const App = () => {
  return (
    <div className="App">
      <Course />
      {/* 1.8 Feedback component is top-level for this section, containing inner child components*/}
      <Feedback />
    </div>
  );
};

export default App;
