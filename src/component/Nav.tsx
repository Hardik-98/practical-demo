import React from "react";

interface PokemonType {
  name: string;
  url: string;
}

interface NavBarProps {
  pokemonTypes: PokemonType[];
  handleTypeChange: (type: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ pokemonTypes, handleTypeChange }) => {
  return (
    <div className="col-md-2 sidebar">
      <h4>Pokemon</h4>

      <ul className="nav flex-column">
        <li
          key="all"
          onClick={() => handleTypeChange("all")}
          className="nav-item"
        >
          <a className="nav-link" href="#">
            All
          </a>
        </li>
        {pokemonTypes.map((type) => (
          <li
            key={type.name}
            onClick={() => handleTypeChange(type.name)}
            className="nav-item"
          >
            <a className="nav-link" href="#">
              {type.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
