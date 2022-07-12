import React from "react";
import * as Styled from "./Icon.styled";

interface IconProps {
  size?: number;
  variant?: Styled.Variant;
  spacing?: number;
  children: React.ReactNode;
}

const Icon = ({ size, variant, spacing = 0.25, children }: IconProps) => (
  <Styled.IconWrapper size={size} variant={variant} spacing={spacing}>
    {children}
  </Styled.IconWrapper>
);

export default Icon;
