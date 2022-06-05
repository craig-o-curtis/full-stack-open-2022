import React, { useState } from "react";
import FeedbackButtons from "./FeedbackButtons";
import { FeedbackType } from "./Feedback.types";
import FeedbackResults from "./FeedbackResutls";

interface FeedbackState {
  good: number;
  neutral: number;
  bad: number;
}

const Feedback = () => {
  const defaultState = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  const [feedback, setFeedback] = useState<FeedbackState>(defaultState);

  const handleClick = (type: FeedbackType) => {
    void setFeedback((prevState) => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };

  const handleReset = () => {
    void setFeedback(() => defaultState);
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <FeedbackButtons onClick={handleClick} />
      <FeedbackResults stats={feedback} />
      <button
        disabled={Object.values(feedback).every((stat) => stat === 0)}
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default Feedback;
