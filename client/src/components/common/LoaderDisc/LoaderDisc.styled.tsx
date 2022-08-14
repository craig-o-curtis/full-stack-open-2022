// ** inspired from https://codepen.io/AlexWarnes/pen/jXYYKL
import styled, { keyframes } from "styled-components";

const colors = {
  border: "rgb(122, 231, 214)",
};

const gradients = {
  border: `linear-gradient(
    0deg,
    rgba(63, 249, 220, 0.5) 33%,
    rgb(122, 231, 214) 100%
  )`,
};

const spin3D = keyframes`
  from {
      transform: rotate3d(.5,.5,.5, 360deg);
    }
    to{
      transform: rotate3d(0deg);
    }
`;

export const SpinnerBox = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const Border1 = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${colors.border};
  background: ${gradients.border};
  animation: ${spin3D} 1.8s linear 0s infinite;
`;
export const Border2 = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${colors.border};
  background: ${gradients.border};
  animation: ${spin3D} 2.2s linear 0s infinite;
`;

export const Core1 = styled.div`
  width: 100%;
  height: 100%;
  background-color: #37474faa;
  border-radius: 50%;
`;
export const Core2 = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1d2630aa;
  border-radius: 50%;
`;

const LoaderDisc = () => (
  <SpinnerBox>
    <Border1>
      <Core1 />
    </Border1>
    <Border2>
      <Core2 />
    </Border2>
  </SpinnerBox>
);

export default LoaderDisc;
