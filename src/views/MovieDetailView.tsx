import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetail,
  image500SrcUrl,
  imageOriginalSrcUrl,
} from "../services/APIService";
import { MovieDetails } from "../models/Movie";
import "../styles/MovieDetail.scss";
import { Loader } from "../components/Loader";

export function MovieDetailView() {
  const [movie, setMovie] = useState<MovieDetails>({
    id: 0,
    title: "",
    poster: "",
    releseaDate: 0,
    genres: [],
    description: "",
    backgroundWallpaper: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);

      const response = await getMovieDetail(id || "");

      setMovie(response);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const renderGenres = () => {
    if (movie.genres) {
      return movie.genres.map((genre) => (
        <li key={genre.id} data-testid={"movie-genre-" + genre.id}>
          {genre.text}
        </li>
      ));
    }
  };

  return (
    <div className="movie-detail">
      {loading ? (
        <Loader />
      ) : (
        <>
          <img
            className="movie-detail-wallpaper-image"
            src={imageOriginalSrcUrl + movie.backgroundWallpaper}
          />
          <div className="movie-detail-information">
            <h1 data-testid="movie-title">{movie.title}</h1>
            <div>
              <p data-testid="movie-description">{movie.description}</p>
              <ul>{renderGenres()}</ul>
              <p data-testid="movie-release-date">{movie.releseaDate}</p>
              <img
                data-testid="movie-poster"
                className="movie-detail-poster"
                src={image500SrcUrl + movie.poster}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
