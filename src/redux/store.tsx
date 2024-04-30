import { configureStore, combineReducers } from "@reduxjs/toolkit";

import pokemonSlice from "./pokemonSlice";
import { pokemonApi } from "../service";

const appReducer = combineReducers({
  pokemonState: pokemonSlice,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaltMiddleware) =>
    getDefaltMiddleware({ serializableCheck: false }).concat([
      pokemonApi.middleware,
    ]),
});
