import { Genre } from "../models/Movie";
import { formatGenresToMap } from "../utils/transformers";
import { ApiKey } from "./constants";
//import { formatMovie, formatGenresToMap } from "../utils/transformers";
//import { Movie } from "../models/Movie ";

export function getMovieGenres(): Promise<Genre[]> {
  const genreEndPoint = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ApiKey}`,
    },
  };

  return fetch(genreEndPoint, options)
    .then((response) => response.json())
    .then((response) => {
      formatGenresToMap(response.genres);
      return response.genres;
    });
}
