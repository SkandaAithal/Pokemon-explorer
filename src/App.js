import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Search from "./components/Search";
import SinglePokemon from "./components/SinglePokemon";
import Navbar from "./components/Navbar";
import FavouritePokemons from "./components/FavouritePokemons";
import PokemonList from "./components/PokemonList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/pokemonslist" element={<PokemonList />} />
          <Route path="/favourites" element={<FavouritePokemons />} />
          <Route path="/singlepokemon/:name" element={<SinglePokemon />} />
          <Route path="*" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
