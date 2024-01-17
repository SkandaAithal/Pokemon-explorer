import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import PokemonCard from "./PokemonCard";

function Search() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const [pokemonData, setPokemonData] = useState({});

  // ! Get the value from input box
  const handleSearch = ({ target: { value } }) => {
    setSearch(value.toLowerCase().trim());
  };

  // ^ Search value is sent through api and we get the response
  const searchSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setisError(false);

    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search}`
      );

      setPokemonData({
        name: data.name,
        image: data.sprites.other.home.front_default,
      });
    } catch (err) {
      setisError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        <div className="container">
          <h1 className="title">Welcome to Pokemon App </h1>

          <h3>You can search for different Pokemons here!</h3>

          <form className="search-box" onSubmit={searchSubmit}>
            <input
              type="text"
              placeholder="Search Your Pokemon"
              onChange={handleSearch}
            />
            <input type="submit" value="Search Pokemon" />
          </form>

          {isLoading && <Loader />}
          {isError && (
            <h3 style={{ color: "red" }}>{`Could not find Pokemon`}</h3>
          )}
        </div>
      </Wrapper>
      {isError ? null : isLoading ? null : pokemonData.image ? (
        <Box>
          <PokemonCard {...pokemonData} />
        </Box>
      ) : null}
    </>
  );
}

export default Search;

const Wrapper = styled.div`
  margin-block: 3rem;
  padding-inline: 1rem;
  .container {
    display: grid;
    place-content: center;
    text-align: center;
    gap: 2rem;
    color: #ffa938;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    .title {
      font-size: 3.5rem;
    }
    .search-box {
      display: grid;
      place-content: center;
      gap: 1rem;

      input[type="text"] {
        padding: 0.75rem;
        width: 15rem;
        border: none;
        outline: none;
        box-shadow: 0 0 5px 1px#aaa9a9;
        border-radius: 5px;
      }
      input[type="submit"] {
        width: fit-content;
        margin: auto;
        padding: 0.75rem 1rem;
        color: #ffa938;
        background-color: #130071;
        border-radius: 3px;
        border: none;
      }
    }
  }
`;

const Box = styled.div`
  display: grid;
  place-content: center;
  margin: 3rem;
`;
