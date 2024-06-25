import {
  Movie,
  MovieResponse,
  MovieDetailsResponse,
  MovieDetails,
} from "../models/Movie";
import { ApiKey } from "./constants";
import { formatMovie, formatMovieDetails } from "../utils/transformers";

export const image500SrcUrl = "https://image.tmdb.org/t/p/w500";
export const imageOriginalSrcUrl = "https://image.tmdb.org/t/p/original";

interface GetMoviesParams {
  filters: {
    page: number;
  };
}

interface Pagination {
  currentPage: number;
  totalPages: number;
}

interface GetMoviesResponse {
  metaData: {
    pagination: Pagination;
  };
  movies: Movie[];
}

export function getMovies(params: GetMoviesParams): Promise<GetMoviesResponse> {
  const { page } = params.filters;

  const movieListEndpoint = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ApiKey}`,
    },
  };

  return fetch(movieListEndpoint, options)
    .then((response) => response.json())
    .then((response) => {
      const responseMovieList = response.results;
      const formattedMovies: Movie[] = responseMovieList.map(
        (movie: MovieResponse) => formatMovie(movie)
      );
      const pagination: Pagination = {
        currentPage: response.page,
        totalPages: response.total_pages,
      };
      return {
        metaData: { pagination },
        movies: formattedMovies,
      };
    });
}

export function getMovieDetail(movieID: string): Promise<MovieDetails> {
  const movieDetailEndpoint = `https://api.themoviedb.org/3/movie/${movieID}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ApiKey}`,
    },
  };

  return fetch(movieDetailEndpoint, options)
    .then((response) => response.json())
    .then((response: MovieDetailsResponse) => {
      const formattedMoviesDetails = formatMovieDetails(response);
      return formattedMoviesDetails;
    });
}
