import { useState, useEffect, ChangeEvent } from "react";
import { getMovies } from "../services/APIService";
import { Genre, Movie } from "../models/Movie";
import { MovieListComponent } from "../components/movie/MovieListComponent";
import { Loader } from "../components/Loader";
import Pagination from "../components/Pagination";
import { getMovieGenres } from "../services/MovieService";
import { Navigation } from "../components/Navigation";
import { formatGenresToMap } from "../utils/transformers";
import { useSearchParams } from "react-router-dom";

export function HomeView() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>(
    searchParams.get("genreId") || "-"
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    searchParams.get("year") || "-"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(
    (searchParams.get("page") as any) || 1
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);

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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMovies();
      setTimeout(() => {
        setLoading(false);
      }, 400);
    };

    setLoading(true);
    fetchData();
  }, [currentPage, selectedGenre, selectedYear]);

  const fetchMovies = async () => {
    const genreMap = formatGenresToMap(genres);

    try {
      const response = await getMovies({
        filters: {
          page: currentPage,
          genre: selectedGenre.toString(),
          year: selectedYear,
        },
      });
      setMovies(response.movies);

      setTotalPages(Math.min(response.metaData.pagination.totalPages, 20));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const genreList = await getMovieGenres();
      setGenres(genreList);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    if (page > 1) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    }
  };

  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const genreValue = event.target.value;
    setSelectedGenre(genreValue);

    searchParams.set("genreId", genreValue);
    setSearchParams(searchParams);
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const yearValue = event.target.value;
    setSelectedYear(yearValue);

    searchParams.set("year", yearValue);
    setSearchParams(searchParams);
  };

  //Separar en dos funciones
  const handleOnClear = (param: string) => {
    if (param === "year") {
      setSelectedYear("-");
    }

    if (param === "genre") {
      setSelectedGenre("-");
    }
  };
  //condicional rendering --- loading ?(condicional ternario)
  //Parecido a un if else
  return (
    <>
      <div className="background-container">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <Navigation
              genreOptions={genres}
              yearOptions={years}
              selectedGenre={selectedGenre}
              selectedYear={selectedYear}
              onGenreChange={handleGenreChange}
              onYearChange={handleYearChange}
              onClear={handleOnClear}
            />
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
