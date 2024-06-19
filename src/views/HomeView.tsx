import { useState, useEffect } from "react";
import { getMovies } from "../services/APIService";
import { Movie } from "../models/Movie";
import { MovieListComponent } from "../components/movie/MovieListComponent";

export function HomeView() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies().then((res) => {
      console.log(res);
      setMovies(res);
    });
  }, []);

  return (
    <>
      <div className="background-container">
        <h1>HomeView</h1>
        <div>
          <MovieListComponent movies={movies} />
        </div>
      </div>
    </>
  );
}

// VirtualDOM
// useEffect -- se ejecuta al iniciar un componente stateless
// useState - se utiliza para guardar estados
// rest operators --- ??
// spread operators  ----- ?
// Destructuring

// TypeScript
// - Genericos --- ???
