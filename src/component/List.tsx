import React from "react";

interface Pokemon {
  name: string;
  url: string;
}

interface ListProps {
  pokemon: Pokemon[];
}

const List: React.FC<ListProps> = ({ pokemon }) => {
  return (
    <div className="list-group">
      {pokemon.map((poke) => (
        <div
          key={poke.name}
          className="list-group-item d-flex justify-content-between align-items-center m-2"
        >
          <div>
            <h6>{poke.name}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
