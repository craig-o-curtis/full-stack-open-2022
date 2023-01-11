import React from 'react';
import { ImSpinner9 } from 'react-icons/im';
import styled, { keyframes } from 'styled-components';

const loadAnimation = keyframes`
 0% { transform: rotate(0deg); }
 
 100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Icon = styled(ImSpinner9)`
  font-size: 3rem;
  color: dodgerblue;
  height: 3rem;
  width: 3rem;
  animation-name: ${loadAnimation};
  animation-timing-function: linear;
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
`;

const Loader = () => {
  return (
    <Container>
      <Icon />
    </Container>
  );
};

export default Loader;
