import { ChangeEvent } from "react";
import "../styles/Navigation.scss";
import { Genre } from "../models/Movie";

//Define las propiedades que recibe el componente
interface NavOptionsProps {
  genreOptions: Genre[];
  yearOptions: number[];
  selectedGenre: string;
  selectedYear: string;
  onGenreChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onYearChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onClear: (param: string) => void;
}

export function Navigation({
  genreOptions,
  yearOptions,
  selectedGenre,
  selectedYear,
  onGenreChange,
  onYearChange,
  onClear,
}: NavOptionsProps) {
  return (
    <>
      <div>
        <select
          id="filterByGenre"
          value={selectedGenre}
          onChange={onGenreChange}
        >
          <option disabled value="-">
            Selecciona un genero
          </option>
          {genreOptions.map((option) => (
            <option key={option.id} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <button onClick={() => onClear("genre")}>Reset</button>
      </div>

      <div>
        <select id="filterByYear" value={selectedYear} onChange={onYearChange}>
          <option disabled value="-">
            Selecciona un año
          </option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button onClick={() => onClear("year")}>Reset</button>
      </div>
    </>
  );
}
