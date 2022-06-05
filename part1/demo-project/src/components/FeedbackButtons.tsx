import React from "react";
import styled from "styled-components";
import { FeedbackType } from "./Feedback.types";
interface FeedBackButtonsProps {
  onClick: (type: FeedbackType) => void;
}

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const Button = styled.button`
  &::focus,
  &:hover {
  }
`;

const FeedbackButtons = ({ onClick }: FeedBackButtonsProps) => {
  return (
    <ButtonContainer>
      <Button onClick={() => onClick("good")}>Good</Button>
      <Button onClick={() => onClick("neutral")}>Neutral</Button>
      <Button onClick={() => onClick("bad")}>Bad</Button>
    </ButtonContainer>
  );
};

export default FeedbackButtons;
