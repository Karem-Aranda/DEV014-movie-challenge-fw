import { Movie, MovieResponse } from "../models/Movie";

export function formatMovie(movie: MovieResponse): Movie {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    releseaDate: movie.release_date,
  };
}
