import React, { useState } from "react";
import FilterPokemons from "./FilterPokemons";
import AllPokemons from "./AllPokemons";

function PokemonList() {
  const [isFilter, setIsFilter] = useState(false);
  return (
    <>
      {isFilter ? (
        <FilterPokemons setIsFilter={setIsFilter} />
      ) : (
        <AllPokemons setIsFilter={setIsFilter} />
      )}
    </>
  );
}

export default PokemonList;
