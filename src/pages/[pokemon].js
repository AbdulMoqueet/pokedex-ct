import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Pokedex from "pokedex-promise-v2";
import Image from "next/image";

const Pokemon = () => {
  const router = useRouter();
  const pokedex = new Pokedex();

  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    if (router.isReady) {
      const name = router.query.pokemon;

      pokedex
        .getPokemonByName(name.toString())
        .then((res) => {
          setPokemon(res);
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }, [router.isReady]);

  return (
    <div className="">
      <div className="container min-h-screen grid place-items-center">
        <div className="w-[500px] mx-auto bg-white p-10">
          <Image
            className="mx-auto"
            src={pokemon.sprites?.front_default}
            width={200}
            height={200}
            alt={pokemon.name}
          />
          <h1 className="text-center capitalize text-3xl pt-2 pb-4">
            {pokemon.name}
          </h1>

          <div className="flex flex-col gap-6 mt-8">
            <div className="flex items-center gap-4">
              <h2 className="text-lg">Type:</h2>
              {pokemon.types?.map((t) => (
                <span key={t.type.name} className="type">
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <h2 className="text-lg">Abilities:</h2>
              {pokemon.abilities?.map((a) => (
                <span key={a.ability.name} className="ability">
                  {a.ability.name}
                </span>
              ))}
            </div>

            <div>Weight: {pokemon.weight} pounds</div>
            <div>Height: {pokemon.height} feet</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
