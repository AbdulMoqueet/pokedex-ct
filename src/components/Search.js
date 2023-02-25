import { searchState } from "@/atoms/SearchAtom";
import React, { useEffect, useRef, useState } from "react";

import { IoMdClose } from "react-icons/io";
import { useRecoilState } from "recoil";

import Pokedex from "pokedex-promise-v2";
import Card from "./Card";
import { loadingState } from "@/atoms/LoadingAtom";

const Search = () => {
  const pokedex = new Pokedex();

  const [isPopupOpen, setIsPopupOpen] = useRecoilState(searchState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const searchInput = useRef(null);

  const [allPokemonList, setAllPokemonList] = useState([]);
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  let pokemonLists = [];

  const togglePopup = () => {
    document.body.style.overflowY = "visible";
    setIsPopupOpen(false);
  };

  useEffect(() => {
    pokedex
      .getPokemonsList()
      .then((res) => {
        if (pokemonLists.length === 0)
          res.results.forEach((p) => pokemonLists.push(p.name));
        console.log(pokemonLists);
        setAllPokemonList(pokemonLists);
      })
      .catch((err) => console.log(err));

    searchInput.current.focus();
  }, []);

  const searchPokemon = (target) => {
    if (target.trim().length === 0) {
      setSearchedPokemons([]);
      return;
    }

    setIsLoading(true);

    const matchedPokemon = allPokemonList.filter((p) =>
      p.toLowerCase().includes(target)
    );

    if (matchedPokemon.length > 0) {
      console.log("logging: ", matchedPokemon);
      pokedex
        .getPokemonByName(matchedPokemon)
        .then((res) => {
          setSearchedPokemons(res);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  let timeOutId = null;

  const onChange = (e) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
      timeOutId = null;
      return;
    }

    const target = e.target.value.toLowerCase();
    console.log(target);

    timeOutId = setTimeout(() => {
      searchPokemon(target);
    }, 1000);
  };

  return (
    <div className="bg-[#ececec] w-screen h-screen fixed top-0 left-0 z-10 p-4 overflow-auto">
      <div className="container">
        <div className="flex justify-between items-center py-8 border-b-[2px] border-red-500">
          <h2 className="text-red-500 text-4xl">Pokedex</h2>
          <input
            className="bg-white py-2 px-4 md:w-[400px] w-[250px] rounded-full outline-none border-none"
            type="text"
            onChange={(e) => onChange(e)}
            ref={searchInput}
            placeholder="Search your fav pokemon"
          />
          <IoMdClose
            className="text-red-500 text-[36px] cursor-pointer"
            onClick={togglePopup}
          />
        </div>

        <h2 className="py-8 text-2xl">Search Results:</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {searchedPokemons.map((p) => (
            <Card
              key={p.name}
              img={p.sprites.front_default}
              name={p.name}
              types={p.types}
              onClick={togglePopup}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
