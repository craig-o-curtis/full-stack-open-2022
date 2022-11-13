import React from "react";
import { Button } from "..";
import { useNavigate } from "react-router-dom";

// ** homework 5.11 - sorry, not doing PropTypes. I'v been using TypeScript throughout this project
interface NavButtonProps {
  route?: string;
  text?: string;
}

const NavButton = ({ route = "/", text = "Home" }: NavButtonProps) => {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(route);
  };
  return <Button onClick={handleNav}>{text}</Button>;
};

export default NavButton;
