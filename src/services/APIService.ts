import { Movie, MovieResponse } from "../models/Movie";
import { formatMovie } from "../utils/transformers";

//dos tipos de formas de declarar funciones -  repasar - function stament
const ApiKey = import.meta.env.VITE_TOKEN_API;

export function getMovies(): Promise<Movie[]> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ApiKey}`,
    },
  };

  return fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    options
  )
    .then((response) => response.json())
    .then((json) => {
      const responseMovieList = json.results;
      const formattedMovies: Movie[] = responseMovieList.map(
        (movie: MovieResponse) => formatMovie(movie)
      );

      return formattedMovies;
    });
}
