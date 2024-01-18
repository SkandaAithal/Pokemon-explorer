import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

function ColorSelectOptions({
  dispatchFilter,
  isLoading,
  colorArray = [],
  color,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  // ! we iterate every pokemons url and call that pokemons api and get its data and store it in the state.

  const getPokemonDataArray = async (res) => {
    res.map(async (item) => {
      const { data } = await axios.get(item.url);
      const response = await axios.get(data.varieties[0].pokemon.url);

      dispatchFilter({ type: "FILTER_DATA_COLOR", payload: response.data });
    });
  };
  // ! on the list item click we fire an api call which returns an array of objects which contains api url of each pokemon

  const handleItemClick = async (item) => {
    if (isLoading) return;
    try {
      dispatchFilter({ type: "LOADING" });
      dispatchFilter({ type: "COLOR", payload: item });

      // ! to clear the previous array and add new array based on the filter.
      dispatchFilter({ type: "CLEAR_DATA_COLOR" });
      setIsOpen(false);

      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-color/${item}`
      );

      getPokemonDataArray(data.pokemon_species);
    } catch (error) {
    } finally {
      dispatchFilter({ type: "END_LOADING" });
    }
  };

  return (
    <div>
      <div>
        <Button onClick={handleButtonClick}>Select a Pokemon Color</Button>
        {isOpen && (
          <List>
            {colorArray.map((color, index) => (
              <ListItem key={index} onClick={() => handleItemClick(color.name)}>
                {color.name}
              </ListItem>
            ))}
          </List>
        )}

        {color && <SelectedOption>You selected: {color}</SelectedOption>}
      </div>
    </div>
  );
}

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

export default ColorSelectOptions;
