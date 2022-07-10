import React from "react";
import * as Styled from "./Icon.styled";

interface IconProps {
  children: React.ReactNode;
  size?: number;
  variant?: Styled.Variant;
}

const Icon = ({ size, variant, children }: IconProps) => (
  <Styled.IconWrapper size={size} variant={variant}>
    {children}
  </Styled.IconWrapper>
);

export default Icon;
