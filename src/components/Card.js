import Link from "next/link";
import React from "react";

const Card = ({ img, name, types, onClick }) => {
  return (
    <Link
      href={`/${name}`}
      className="bg-white shadow-2xl cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-center py-4">
        <img className="w-[200px]" src={img} alt="pokemon" />
      </div>

      <div className="p-8">
        <h2 className="text-2xl capitalize">{name}</h2>
        <div className="flex items-center gap-4 mt-8">
          <h2 className="text-lg">Type:</h2>
          {types.map((t) => (
            <span key={t.type.name} className="type">
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Card;
