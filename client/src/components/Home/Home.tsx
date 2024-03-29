import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';

import { useLogout } from 'auth';

import { Box, Button } from 'components/common';

import * as Styled from './Home.styled';

const Home = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleNavUserProfile = () => {
    navigate('/user-profile', { replace: true });
  };

  return (
    <Styled.Home>
      <Box p={2} flex justifyContent="space-between">
        <header>Full Stack 2022 Course Projects</header>

        <Box ml="auto" mr={1}>
          <Button onClick={handleNavUserProfile}>
            <AiOutlineUser />
          </Button>
        </Box>
        <Button onClick={logout}>Log out</Button>
      </Box>
      <ul>
        <li>
          <NavLink to="/redux">Part 6 - Redux</NavLink>
        </li>
        <li>
          <NavLink to="/blogs">Blogs</NavLink>
        </li>
        <li>
          <NavLink to="/phonebook">Phonebook</NavLink>
        </li>
        <li>
          <NavLink to="/countries">Country Search</NavLink>
        </li>
        <li>
          <NavLink to="/anecdotes">Anecdotes</NavLink>
        </li>
        <li>
          <NavLink to="/course">Course</NavLink>
        </li>
        <li>
          <NavLink to="/refactored-course">Refactored Course</NavLink>
        </li>
        <li>
          <NavLink to="/splash">Splash</NavLink>
        </li>
        <li>
          <NavLink to="/notfound">Not Found</NavLink>
        </li>
      </ul>
    </Styled.Home>
  );
};

export default Home;
