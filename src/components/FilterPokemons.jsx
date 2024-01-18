import React, { useEffect, useReducer } from "react";
import filterReducerFunction from "../Helpers/filterReducerfunction";
import axios from "axios";
import AbilitiesSelectOption from "./AbilitiesSelectOption";
import TypesSelectOptions from "./TypesSelectOptions";
import styled from "styled-components";
import HabitatSelectOptions from "./HabitatSelectOptions";
import ColorSelectOptions from "./ColorSelectOptions";
import Loader from "./Loader";
import PokemonCard from "./PokemonCard";
import ScrollToTopButton from "./ScrollToTopButton";

function FilterPokemons({ setIsFilter }) {
  const typeUrl = "https://pokeapi.co/api/v2/type";
  const habitatUrl = "https://pokeapi.co/api/v2/pokemon-habitat/";
  const colorUrl = "https://pokeapi.co/api/v2/pokemon-color";

  const initialState = {
    isLoading: false,
    typeArray: [],
    habitatArray: [],
    colorArray: [],
    filteredDataArrayABility: [],
    filteredDataArrayType: [],
    filteredDataArrayHabitat: [],
    filteredDataArrayColor: [],
    color: "",
    ability: "",
    habitat: "",
    type: "",
  };

  //   ! usereducer hook
  const [state, dispatchFilter] = useReducer(
    filterReducerFunction,
    initialState
  );

  // ! function to initially get data of all the filter options from api.
  const getAllFilterData = async () => {
    try {
      dispatchFilter({ type: "LOADING" });

      // ! call multiple api and only when all the promises are fulfilled then we get response as an array.
      const [api1, api2, api3] = await Promise.all([
        axios.get(typeUrl).then((response) => response.data),
        axios.get(habitatUrl).then((response) => response.data),
        axios.get(colorUrl).then((response) => response.data),
      ]);

      // store the api response in respective states
      dispatchFilter({
        type: "ALL_FILTER_DATA",
        payload: { type: api1, habitat: api2, color: api3 },
      });
    } catch (error) {
    } finally {
      dispatchFilter({ type: "END_LOADING" });
    }
  };

  // ^ Here each array filter option will have its own array.so for that option a particular array will be stored in the state. To show all the pokemon data in the frontend we merge all the array into a single array.
  const completeFilteredArray = [
    ...state.filteredDataArrayABility,
    ...state.filteredDataArrayType,
    ...state.filteredDataArrayHabitat,
    ...state.filteredDataArrayColor,
  ];
  // ^ We need only unique pokemon data and no duplicates in the array. but after merging we get an array with duplicated pokemon data. to remove this we filter the array using reduce method and in this we first check if the same object id is present in the array of objects using some array method which return boolean value. if true the we push to the new array else we wont add it to the array. We filter the array of objects this way because the each object has different reference even though its content is same.
  const uniqueFilteredArray = completeFilteredArray.reduce(
    (accumulator, currentObject) => {
      const isDuplicate = accumulator.some(
        (obj) => obj.id === currentObject.id
      );

      // If no object with the same 'id' is found, add the currentObject to the accumulator array
      if (!isDuplicate) {
        accumulator.push(currentObject);
      }
      return accumulator;
    },
    []
  );

  const clearFilter = () => {
    if (state.isLoading) return;
    dispatchFilter({ type: "CLEAR_FILTER" });
  };
  useEffect(() => {
    getAllFilterData();
  }, []);

  return (
    <div>
      <FilterOptions>
        <AbilitiesSelectOption
          dispatchFilter={dispatchFilter}
          isLoading={state.isLoading}
          ability={state.ability}
        />

        <TypesSelectOptions
          dispatchFilter={dispatchFilter}
          isLoading={state.isLoading}
          typeArray={state.typeArray}
          type={state.type}
        />

        <HabitatSelectOptions
          dispatchFilter={dispatchFilter}
          isLoading={state.isLoading}
          habitatArray={state.habitatArray}
          habitat={state.habitat}
        />
        <ColorSelectOptions
          dispatchFilter={dispatchFilter}
          isLoading={state.isLoading}
          colorArray={state.colorArray}
          color={state.color}
        />
      </FilterOptions>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <ClearFilterButton onClick={clearFilter}>
          Clear Filter
        </ClearFilterButton>
        <GoToList
          onClick={() => {
            setIsFilter(false);
          }}
        >
          Go Back
        </GoToList>
      </div>

      {state.isLoading ? (
        <Loader />
      ) : (
        <FilteredCard>
          {uniqueFilteredArray.map((item, index) => {
            return (
              <PokemonCard
                key={index}
                name={item.name}
                image={item.sprites.other.home.front_default}
              />
            );
          })}
          <ScrollToTopButton />
        </FilteredCard>
      )}
    </div>
  );
}

export default FilterPokemons;

const FilterOptions = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
`;

const FilteredCard = styled.div`
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

const ClearFilterButton = styled.button`
  padding: 1rem;
  font-size: 1.25rem;
  width: 9rem;
  border: none;
  border-radius: 4px;
  background-color: #fb8600;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  &:active {
    background-color: #ffac64;
    scale: 0.95;
  }
`;

const GoToList = styled.button`
  padding: 1rem;
  font-size: 1.25rem;
  width: 9rem;
  border: none;
  border-radius: 4px;
  background-color: #fb0000;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  &:active {
    background-color: #ff902f;
    scale: 0.95;
  }
`;
