import { ChangeEvent } from "react";
import "../styles/Navigation.scss";
import { Genre } from "../models/Movie";

// Define las propiedades que recibe el componente
interface NavOptionsProps {
  genreOptions: Genre[];
  yearOptions: number[];
  selectedGenre: string;
  selectedYear: string;
  sortBy: string;
  onGenreChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onYearChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onSortByChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onClear: (param: string) => void;
}

export function Navigation({
  genreOptions,
  yearOptions,
  selectedGenre,
  selectedYear,
  sortBy,
  onGenreChange,
  onYearChange,
  onSortByChange,
  onClear,
}: NavOptionsProps) {
  return (
    <>
      <div className="main-container">
        <div className="filter-genre">
          <select
            data-testid="filterByGenre"
            value={selectedGenre}
            onChange={onGenreChange}
          >
            <option disabled value="-">
              Selecciona un género
            </option>
            {genreOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <button
            data-testid="resetGenreFilter"
            onClick={() => onClear("genre")}
          >
            Reset
          </button>
        </div>

        <div className="filter-year">
          <select
            data-testid="filterByYear"
            value={selectedYear}
            onChange={onYearChange}
          >
            <option disabled value="-">
              Selecciona un año
            </option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button data-testid="resetYearFilter" onClick={() => onClear("year")}>
            Reset
          </button>
        </div>

        <div className="filter-sortby">
          <select data-testid="sortBy" value={sortBy} onChange={onSortByChange}>
            <option disabled value="-">
              Ordenar por
            </option>
            <option value="original_title.asc">
              Título Original Ascendente
            </option>
            <option value="original_title.desc">
              Título Original Descendente
            </option>

            <option value="popularity.asc">Popularidad Ascendente</option>
            <option value="popularity.desc">Popularidad Descendente</option>

            <option value="revenue.asc">Ganancia Ascendente</option>
            <option value="revenue.desc">Ganancia Descendente</option>

            <option value="primary_release_date.asc">
              Día de lanzamiento Ascendente
            </option>
            <option value="primary_release_date.desc">
              Día de lanzamiento Descendente
            </option>

            <option value="title.asc">Título Ascendente</option>
            <option value="title.desc">Título Descendente</option>

            <option value="vote_average.asc">
              Promedio de votos Ascendente
            </option>
            <option value="vote_average.desc">
              Promedio de votos Descendente
            </option>

            <option value="vote_count.asc">Conteo de votos Ascendente</option>
            <option value="vote_count.desc">Conteo de votos Descendente</option>
          </select>
          <button
            data-testid="resetSortByFilter"
            onClick={() => onClear("sortBy")}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
