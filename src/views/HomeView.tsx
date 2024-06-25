import { useState, useEffect } from "react";
import { getMovies } from "../services/APIService";
import { Movie } from "../models/Movie";
import { MovieListComponent } from "../components/movie/MovieListComponent";
import { Loader } from "../components/Loader";
import Pagination from "../components/Pagination";
import { getMovieGenres } from "../services/MovieService";

export function HomeView() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMovies();
      await fetchGenres();
      setTimeout(() => {
        setLoading(false);
      }, 400);
    };

    setLoading(true);
    fetchData();
  }, [currentPage]);

  const fetchMovies = async () => {
    try {
      const response = await getMovies({ filters: { page: currentPage } });
      setMovies(response.movies);

      setTotalPages(Math.min(response.metaData.pagination.totalPages, 20));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const genreList = await getMovieGenres();
      console.log(genreList);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="background-container">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <h1>HomeView</h1>
            <MovieListComponent movies={movies} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onSelectPage={handlePageChange}
            />
          </div>
        )}
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
