import axios from "axios";
import React, { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";

function AbilitiesSelectOption({ dispatchFilter, isLoading, ability }) {
  const initialState = {
    isAbilityLoading: false,
    abilityOffset: 0,
    abilityArray: [],
    abilityCount: 0,
  };
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef(null);

  const reducerFunctionAbility = (state, action) => {
    switch (action.type) {
      case "ABILITY_LOADING":
        return {
          ...state,
          isAbilityLoading: true,
        };
      case "ALL_ABILITIES":
        return {
          ...state,
          abilityCount: action.payload.count,
          abilityArray: [...state.abilityArray, ...action.payload.results],
          abilityOffset: state.abilityOffset + 10,
        };

      case "END_ABILITY_LOADING":
        return {
          ...state,
          isAbilityLoading: false,
        };
    }
  };

  const [state, dispatchAbility] = useReducer(
    reducerFunctionAbility,
    initialState
  );

  const abilityUrl = `https://pokeapi.co/api/v2/ability?offset=${state.abilityOffset}&limit=10`;

  //! function to get pokemon ability data. each api call will return an array of 10 elements
  const getAllAbilities = async () => {
    try {
      dispatchAbility({ type: "ABILITY_LOADING" });
      const { data } = await axios.get(abilityUrl);
      dispatchAbility({ type: "ALL_ABILITIES", payload: data });
    } catch (error) {
    } finally {
      dispatchAbility({ type: "END_ABILITY_LOADING" });
    }
  };

  // ! Button click handler
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  // ! we iterate every pokemons url and call that pokemons api and get its data and store it in the state.
  const getPokemonDataArray = async (res) => {
    res.map(async (item) => {
      const { data } = await axios.get(item.pokemon.url);
      dispatchFilter({ type: "FILTER_DATA_ABILITY", payload: data });
    });
  };

  // ! on the list item click we fire an api call which returns an array of objects which contains api url of each pokemon
  const handleItemClick = async (item) => {
    try {
      if (isLoading) return;
      else {
        dispatchFilter({ type: "LOADING" });
        // ! to clear the previous array and add new array based on the filter.
        dispatchFilter({ type: "ABILITY", payload: item });
        dispatchFilter({ type: "CLEAR_DATA_ABILITY" });

        setIsOpen(false);

        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/ability/${item}`
        );

        getPokemonDataArray(data.pokemon);
      }
    } catch (error) {
    } finally {
      dispatchFilter({ type: "END_LOADING" });
    }
  };

  // ! function to execute when the scroll bar is changed.
  const ScrollItems = () => {
    // ^ this is a function to execute when the scroll bar hits the bottom of the List Component. The function only executes when the array length is less than the count i.e number of items and if its not Loading. then we fire this function which gets new data and that is added to the array.
    if (
      listRef.current.scrollHeight - listRef.current.scrollTop <=
        listRef.current.clientHeight + 20 &&
      state.abilityArray.length < state.abilityCount &&
      !state.isAbilityLoading
    ) {
      getAllAbilities();
    }
  };

  useEffect(() => {
    getAllAbilities();
  }, []);
  return (
    <div>
      <Button onClick={handleButtonClick}>Select a Pokemon Ability</Button>
      {isOpen && (
        <List ref={listRef} onScroll={ScrollItems}>
          {state.abilityArray.map((item, index) => (
            <ListItem key={index} onClick={() => handleItemClick(item.name)}>
              {item.name}
            </ListItem>
          ))}
        </List>
      )}
      {ability && <SelectedOption>You selected: {ability}</SelectedOption>}
    </div>
  );
}

const Button = styled.button`
  padding: 1rem;
  font-size: 16px;
  border: none;
  width: 100%;
  border-radius: 4px;
  background-color: #6f39a2;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  &:active {
    background-color: #8656b3;
    scale: 0.95;
  }
`;

const List = styled.ul`
  font-size: 16px;
  background-color: #ead6fe;
  border-radius: 4px;
  max-height: 200px;

  overflow-y: scroll;
`;

const ListItem = styled.li`
  cursor: pointer;
  list-style: none;
  padding: 0.1rem 0.5rem;

  &:hover {
    background-color: #d9b1ff;
  }
`;
const SelectedOption = styled.p`
  margin-top: 10px;
  font-size: 1.35rem;
  color: #053d3d;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;

export default AbilitiesSelectOption;
