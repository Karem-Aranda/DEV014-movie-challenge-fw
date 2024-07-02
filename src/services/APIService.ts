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
    genre: string;
    year: string;
    sortBy: string;
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
  const { page, genre, year, sortBy } = params.filters;

  let movieListEndpoint = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US`;

  if (page) {
    movieListEndpoint += `&page=${page}`;
  }

  if (genre !== "-") {
    movieListEndpoint += `&with_genres=${genre}`;
  }

  if (year !== "-") {
    movieListEndpoint += `&primary_release_year=${year}`;
  }

  if (sortBy !== "-") {
    movieListEndpoint += `&sort_by=${sortBy}`;
  }

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
      if (response.results) {
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
      } else {
        return {
          metaData: {
            pagination: {
              currentPage: 1,
              totalPages: 1,
            },
          },
          movies: [],
        };
      }
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
