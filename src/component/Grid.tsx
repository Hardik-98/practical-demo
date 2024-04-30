import React from "react";

interface Pokemon {
  name: string;
  url: string;
}

interface GridProps {
  pokemon: Pokemon[];
}

const Grid: React.FC<GridProps> = ({ pokemon }) => {
  return (
    <div className="row">
      {pokemon?.map((poke) => (
        <div className="col-md-4" key={poke.name}>
          <div className="card">
            <div className="card-body">
              <h6>{poke.name}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
