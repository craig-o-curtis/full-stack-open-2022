import React from "react";
import * as Styled from "./Button.styled";

interface ButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const Button = ({
  type = "button",
  disabled,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <Styled.Button type={type} disabled={disabled} onClick={onClick}>
      {children}
    </Styled.Button>
  );
};

export default Button;
