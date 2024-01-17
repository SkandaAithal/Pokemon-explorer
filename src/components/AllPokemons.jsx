import axios from "axios";
import React, { useEffect, useReducer } from "react";
import reducerFunction from "../Helpers/reducerfunction";
import PokemonCard from "./PokemonCard";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import ScrollToTopButton from "./ScrollToTopButton";
function AllPokemons({ setIsFilter }) {
  // ! initial state of the usereducer hook
  const initialState = {
    isLoading: false,
    offset: 0,
    results: [],
    count: 0,
  };
  const abortController = new AbortController();
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  const getPokemonDataArray = async (res) => {
    // call the api iteratively to get the data of each pokemon and store it in the array of state using dispatch
    res.map(async (item) => {
      const { data } = await axios.get(item.url);

      dispatch({
        type: "GET_POKEMONS",
        payload: data,
      });
    });
  };

  // ! function to make an api call and we get 10 results at a time.
  const pokemons = async (signal) => {
    try {
      dispatch({ type: "LOADING" });

      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${state.offset}&limit=10`,
        {
          signal: signal,
        }
      );

      // the result is having new Apis which should be called iteratively.
      getPokemonDataArray(data.results);

      dispatch({ type: "TOTAL_COUNT", payload: data.count });
    } catch (error) {
    } finally {
      dispatch({ type: "END_LOADING" });
    }
  };

  // ! function to call api when the scrollbar hits bottom  and the new pokemon array is added to old array and then its rendered on the screen
  const loadMorePokemons = () => {
    if (!state.isLoading) {
      pokemons(abortController.signal);
    }
  };

  // ! initial api call after the component mounts
  useEffect(() => {
    pokemons(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <InfiniteScroll
      dataLength={state.results.length}
      next={loadMorePokemons}
      hasMore={state.results.length < state.count}
      loader={<Loader />}
      endMessage={
        <p
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            margin: "2rem",
            color: "#3d3d3d",
          }}
        >
          <b>That's all for now! Thanks for exploring.</b>
        </p>
      }
    >
      <Filter>
        <h1>Do You want to Filter Pokemons?</h1>
        <FilterButton
          onClick={() => {
            setIsFilter(true);
          }}
        >
          Filter Pokemons
        </FilterButton>
      </Filter>

      <PokemonList>
        {state.results.map((pokemon, index) => {
          return (
            <div key={index}>
              <PokemonCard
                {...pokemon}
                image={pokemon.sprites.other.home.front_default}
              />
            </div>
          );
        })}
        <ScrollToTopButton />
      </PokemonList>
    </InfiniteScroll>
  );
}

export default AllPokemons;
const Filter = styled.div`
  display: flex;
  gap: 1rem;
  padding: 2rem;
  flex-wrap: wrap;

  h1 {
    font-size: 2rem;
    color: #00006b;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
`;
const FilterButton = styled.button`
  padding: 0.85rem 2rem;
  background-color: blueviolet;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  transition: all 0.3s;
  font-size: 1rem;

  &:hover,
  &:active {
    transform: scale(0.95);
    background-color: darkviolet;
  }
`;

const PokemonList = styled.div`
  display: grid;
  margin-block: 2rem;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding-inline: 2rem;

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
