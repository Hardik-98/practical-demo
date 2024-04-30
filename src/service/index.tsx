import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "https://pokeapi.co/api/v2";

export const pokemonApi = createApi({
  tagTypes: ["pokemon"],
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
  }),
  endpoints: (builder) => ({
    getAllPokemon: builder.mutation({
      query: (payload) => ({
        url: `pokemon?offset=${payload?.offset}&limit=${payload?.limit}`,
        method: "GET",
      }),
      invalidatesTags: ["pokemon"],
    }),
    getPokemonType: builder.mutation({
      query: (type) => ({
        url: `/type/${type}`,
        method: "GET",
      }),
      invalidatesTags: ["pokemon"],
    }),
  }),
});
export const { useGetAllPokemonMutation, useGetPokemonTypeMutation } = pokemonApi;
