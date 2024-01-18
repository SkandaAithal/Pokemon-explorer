import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

function TypesSelectOptions({
  dispatchFilter,
  isLoading,
  typeArray = [],
  type,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  // ! we iterate every pokemons url and call that pokemons api and get its data and store it in the state.

  const getPokemonDataArray = async (res) => {
    res.map(async (item) => {
      const { data } = await axios.get(item.pokemon.url);
      dispatchFilter({ type: "FILTER_DATA_TYPE", payload: data });
    });
  };

  // ! on the list item click we fire an api call which returns an array of objects which contains api url of each pokemon

  const handleItemClick = async (item) => {
    if (isLoading) return;

    try {
      dispatchFilter({ type: "LOADING" });
      // ! to clear the previous array and add new array based on the filter.

      dispatchFilter({ type: "CLEAR_DATA_TYPE" });
      dispatchFilter({ type: "TYPE", payload: item });
      setIsOpen(false);

      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/type/${item}`
      );

      getPokemonDataArray(data.pokemon);
    } catch (error) {
    } finally {
      dispatchFilter({ type: "END_LOADING" });
    }
  };

  return (
    <div>
      <div>
        <Button style={{ margin: "auto" }} onClick={handleButtonClick}>
          Select a Pokemon Type
        </Button>
        {isOpen && (
          <List>
            {typeArray.map((type, index) => (
              <ListItem key={index} onClick={() => handleItemClick(type.name)}>
                {type.name}
              </ListItem>
            ))}
          </List>
        )}

        {type && <SelectedOption>You selected: {type}</SelectedOption>}
      </div>
    </div>
  );
}

export default TypesSelectOptions;

const Button = styled.button`
  padding: 1rem;
  font-size: 16px;
  width: 100%;
  border: none;
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
