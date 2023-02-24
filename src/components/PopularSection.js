import React, { useEffect, useState } from "react";
import Pokedex from "pokedex-promise-v2";
import Card from "./Card";
const pokedex = new Pokedex();

const PopularSection = () => {
  const [popularPokemons, setPopularPokemons] = useState([]);

  useEffect(() => {
    pokedex
      .getPokemonByName(["pikachu", "bulbasaur", "charizard"])
      .then((res) => setPopularPokemons(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="py-8 pb-16 px-4">
      <div className="container">
        <h1 className="py-4 text-2xl">Popular Pokemons</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-[400px] mx-auto">
          {popularPokemons.map((p) => (
            <Card
              key={p.name}
              img={p.sprites.front_default}
              name={p.name}
              types={p.types}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularSection;
