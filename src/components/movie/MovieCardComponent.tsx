import { Movie } from "../../models/Movie";
import "../../styles/MovieCard.scss";

interface MovieCard {
  movie: Movie;
}

export function MovieCardComponent({ movie }: MovieCard) {
  return (
    <li className="movie">
      <img
        className="movie-poster"
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster}
      />
      <div className="movie-information">
        <div className="movie-title-container">
          <h2 className="movie-title">{movie.title}</h2>
        </div>
        <div className="movie-info-container">
          <p className="movie-release-year">{movie.releseaDate}</p>
        </div>
      </div>
    </li>
  );
}
