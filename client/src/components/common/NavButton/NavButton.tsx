import React from 'react';
import { Button } from '..';
import { Box } from '../.';
import { useNavigate } from 'react-router-dom';

interface NavButtonProps {
  route?: string;
  text?: string;
}

const NavButton = ({ route = '/', text = 'Home' }: NavButtonProps) => {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(route);
  };
  return (
    <Box>
      <Button onClick={handleNav}>{text}</Button>
    </Box>
  );
};

export default NavButton;
