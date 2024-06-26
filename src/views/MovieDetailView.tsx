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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const { id } = useParams();
  console.log(movie);

  useEffect(() => {
    if (id) {
      getMovieDetail(id).then((res) => {
        setMovie(res);
      });
    }
  }, []);

  const renderGenres = () => {
    if (movie.genres) {
      return movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>);
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
            <h1>{movie.title}</h1>
            <div>
              <p>{movie.description}</p>
              <ul>{renderGenres()}</ul>
              <p>{movie.releseaDate}</p>
              <img
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
