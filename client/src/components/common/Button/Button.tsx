import React from "react";
import * as Styled from "./Button.styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: React.ReactNode;
  title?: React.ButtonHTMLAttributes<HTMLButtonElement>["title"];
}

const Button = ({
  type = "button",
  disabled,
  className,
  onClick,
  children,
  title,
}: ButtonProps) => {
  return (
    <Styled.Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      title={title}
    >
      {children}
    </Styled.Button>
  );
};

export default Button;
