import React from "react";
import { NavLink } from "react-router-dom";
import * as Styled from "./Home.styled";

const Home = () => {
  return (
    <Styled.Home>
      <header>Full Stack 2022 Course Projects</header>
      <ul>
        <li>
          <NavLink to="/phonebook">Phonebook</NavLink>
        </li>
        <li>
          <NavLink to="/countries">Country Search</NavLink>
        </li>
        <li>
          ∑<NavLink to="/anecdotes">Anecdotes</NavLink>
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
