//para acceder a las propiedades de los objetos es con .ejemplo

import {
  Genre,
  Movie,
  MovieDetails,
  MovieDetailsResponse,
  MovieResponse,
} from "../models/Movie";

export function formatMovie(movie: MovieResponse): Movie {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    //la fecha ya convertida a un objeto tipo fecha
    releseaDate: new Date(movie.release_date).getFullYear(),
  };
}

export function formatMovieDetails(movie: MovieDetailsResponse): MovieDetails {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    //la fecha ya convertida a un objeto tipo fecha
    releseaDate: new Date(movie.release_date).getFullYear(),
    genres: movie.genres,
    description: movie.overview,
    backgroundWallpaper: movie.backdrop_path,
  };
}

// el map es para regresar algo (almacena las cosas y las regresa)
//guardalo en un estado
export function formatGenresToMap(movieGenres: Genre[]) {
  // Comenzar a iterar en el array
  // Dentro de cada iteracion, tienes que ver si el elemento ya existe en el map/objeto
  // Si ya existe, no haces nada
  // Si no existe, lo defines
  const genres: any = {};

  movieGenres.forEach((genre) => {
    if (!genres[`${genre.id}`]) {
      genres[genre.id] = genre.name;
    }
  });
}

//guardarlo en un select - nav
export function formatGenresToOptions(movieGenres: Genre[]) {
  return movieGenres.map((genre) => {
    return { id: genre.id, value: genre.id, text: genre.name };
  });
}

/*[a, b, c, d, e, f];

personas[nombre];
genres = {
  1: "terror",
  2: "amor",
  3: "sci-fi",
};
*/
