import { Movie } from "../../models/Movie";
import { MovieCardComponent } from "./MovieCardComponent";
import "../../styles/MovieList.scss";

interface MovieListComponent {
  movies: Movie[];
}

export function MovieListComponent({ movies }: MovieListComponent) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieCardComponent key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
