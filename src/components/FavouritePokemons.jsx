import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PokemonCard from "./PokemonCard";
import { FaBookmark } from "react-icons/fa6";

function FavouritePokemons() {
  const [favouritesArray, setFavouritesArray] = useState([]);

  const navigate = useNavigate();
  // ! get the favorites array  from the local storage after initialrender through useeffect
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavouritesArray(favorites);
  }, []);

  // ! filter the favorites and store it back to the local storage
  const removeFromFavourites = (name) => {
    const updatedFavorites = favouritesArray.filter(
      (favorite) => favorite.name !== name
    );

    setFavouritesArray(updatedFavorites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
  };
  if (!favouritesArray.length) {
    return (
      <Message>
        <h1>You have not saved any Pokemons. </h1>
        <h3>Explore new and exciting Pokemons!</h3>

        <ExploreButton onClick={() => navigate("/pokemonslist")}>
          Explore Pokemons
        </ExploreButton>
      </Message>
    );
  }

  return (
    <>
      <Message>
        <h1>Your Favorite Pokemons</h1>

        <p style={{ color: "red" }}>
          By clicking on bookmark you can remove that pokemon from your
          favourites
        </p>
      </Message>

      <Favorites>
        {favouritesArray.map((pokemon, index) => (
          <PokemonContainer key={index}>
            <PokemonCard {...pokemon} />
            <FaBookmark
              className="icon"
              onClick={() => {
                removeFromFavourites(pokemon.name);
              }}
            />
          </PokemonContainer>
        ))}
      </Favorites>
    </>
  );
}

const Message = styled.div`
  text-align: center;
  margin: 2rem;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #3c3c3c;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #555;
  }
`;

const ExploreButton = styled.button`
  background-color: #ffc423;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #edd362;
  }
`;

const Favorites = styled.div`
  display: grid;
  margin-block: 2rem;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 2rem;

  @media only screen and (max-width: 1170px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (max-width: 915px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 615px) {
    grid-template-columns: 1fr;
  }
`;
const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .icon {
    position: absolute;
    top: 0;
    left: 65%;
    font-size: 3rem;
    cursor: pointer;
    color: #ff0000;
  }
`;
export default FavouritePokemons;
