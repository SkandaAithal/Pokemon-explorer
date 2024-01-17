import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
  return (
    <StyledNav>
      <ul>
        <li>
          <NavLink to="/">Search</NavLink>
        </li>
        <li>
          <NavLink to="/pokemonslist">All Pokemons</NavLink>
        </li>
        <li>
          <NavLink to="/favourites">Favourites</NavLink>
        </li>
      </ul>
    </StyledNav>
  );
};

export default NavBar;

const StyledNav = styled.nav`
  background-color: #343a40;
  padding: 1rem 2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
    li {
      margin: 0;
    }
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem;
  }
`;
