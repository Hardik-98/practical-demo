import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./component/Nav";
import GridComponent from "./component/Grid";
import ListComponent from "./component/List";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllPokemonMutation,
  useGetPokemonTypeMutation,
} from "./service/index";
import { getAllPokemon } from "./redux/pokemonSlice";
import { Grid, List } from "react-feather";
import Pagination from "./common/Pagination";

interface PokemonType {
  name: string;
  url: string;
}

function App() {
  const dispatch = useDispatch();
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [dataList, setDataList] = useState([]);
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [reqAllPokemon, resAllPokemon] = useGetAllPokemonMutation();
  const [reqTypePokemon, resTypePokemon] = useGetPokemonTypeMutation();
  const pokemonList = useSelector((state: any) => state.pokemonState.pokemonList);
  
  useEffect(() => {
    reqTypePokemon("");
  }, []);

  useEffect(() => {
    if (selectedType !== "all") {
      if (
        resTypePokemon?.isSuccess &&
        resTypePokemon?.data?.pokemon &&
        Array.isArray(resTypePokemon?.data?.pokemon) &&
        resTypePokemon?.data?.pokemon?.length > 0
      ) {
        const results = resTypePokemon?.data?.pokemon?.map(
          (el: any) => el?.pokemon
        );
        dispatch(getAllPokemon(results));
        setTotalItems(results?.length);
      }
    } else {
      if (resTypePokemon?.isSuccess && resTypePokemon?.data?.results) {
        setPokemonTypes(resTypePokemon?.data?.results);
      }
    }
  }, [resTypePokemon?.isSuccess, selectedType]);

  useEffect(() => {
    if (!searchQuery && selectedType === 'all') {
      reqAllPokemon({ offset: currentPage, limit: itemsPerPage });
    }
  }, [currentPage,searchQuery,selectedType]);

  useEffect(() => {
    if (resAllPokemon?.isSuccess && resAllPokemon?.data?.results) {
      dispatch(getAllPokemon(resAllPokemon?.data?.results));
      setTotalItems(resAllPokemon?.data?.count);
    }
  }, [resAllPokemon?.isSuccess, dispatch]);

  const handleTypeChange = useCallback((type: string) => {
    if (type === "all") {
      setSelectedType("all");
      reqAllPokemon({ offset: 0, limit: 20 });
      setSearchQuery("");
    } else {
      setSelectedType(type);
      reqTypePokemon(type);
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery) {
      const filteredPokemonList = pokemonList?.filter((pokemon: PokemonType) =>
        pokemon?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
      setDataList(filteredPokemonList);
      setTotalItems(filteredPokemonList?.length);
    } else {
      setDataList(pokemonList);
    }
  }, [searchQuery, pokemonList]);

  return (
    <div className="container-fluid">
      <div className="row">
        <NavBar
          pokemonTypes={pokemonTypes}
          handleTypeChange={handleTypeChange}
        />
        <div className="col-md-10 content">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <input
                type="text"
                placeholder="Search Pokemon..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-control"
              />
            </div>
            <div className="btn-group" role="group" aria-label="View Toggle">
              <button
                className={`btn ${
                  viewMode === "grid" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid size={20} /> Grid
              </button>
              <button
                className={`btn ${
                  viewMode === "list" ? "btn-primary" : "btn-secondary"
                } ms-2`}
                onClick={() => setViewMode("list")}
              >
                <List size={20} /> List
              </button>
            </div>
          </div>
          {dataList && Array.isArray(dataList) && dataList?.length > 0 ? (
            <div
              id="contentArea"
              className={viewMode === "grid" ? "grid-view" : "list-view"}
            >
              {viewMode === "grid" ? (
                <GridComponent pokemon={dataList} />
              ) : (
                <ListComponent pokemon={dataList} />
              )}
            </div>
          ) : (
            <span className="empty">No Data To Display</span>
          )}
          <div className="d-flex justify-content-end mt-3">
            {selectedType === 'all' && dataList && Array.isArray(dataList) && dataList?.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalCount={totalItems}
                pageSize={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                TBLData={dataList}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
