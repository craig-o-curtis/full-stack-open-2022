import React, { useState, useMemo } from "react";
import FeedbackButtons from "./FeedbackButtons";
import { FeedbackType } from "./Feedback.types";
import FeedbackStatistics from "./FeedbackStatistics";
import Button from "../Button";
interface FeedbackState {
  good: number;
  neutral: number;
  bad: number;
}

const defaultState: Record<FeedbackType, number> = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const Feedback = () => {
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

  const resetDisabled = useMemo(
    () => Object.values(feedback).every((stat) => stat === 0),
    [feedback]
  );

  return (
    <div>
      <h2>Give Feedback</h2>
      <FeedbackButtons onClick={handleClick} />
      <FeedbackStatistics stats={feedback} />
      <Button disabled={resetDisabled} onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};

export default Feedback;
