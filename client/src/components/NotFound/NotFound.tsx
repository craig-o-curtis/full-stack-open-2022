import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common";
import * as Styled from "./NotFound.styled";

const NotFound = () => {
  let navigate = useNavigate();

  return (
    <Styled.NotFound>
      <Styled.FourOFour>404</Styled.FourOFour>
      <Styled.NotFoundText>Not Found</Styled.NotFoundText>
      <Button onClick={() => navigate("home", { replace: true })}>
        Back to Safety
      </Button>
    </Styled.NotFound>
  );
};

export default NotFound;
