import { getMovies } from "../services/APIService";

export function HomeView() {
  getMovies().then((res) => console.log(res));
  return (
    <>
      <div className="background-container">
        <h1>HomeView</h1>
      </div>
    </>
  );
}
