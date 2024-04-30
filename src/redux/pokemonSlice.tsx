import { createSlice } from "@reduxjs/toolkit";

const initState = {
  pokemonList: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initState,
  reducers: {
    getAllPokemon: (state, { payload }) => {
      state.pokemonList = payload;
    },
  },
});

export const { getAllPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
