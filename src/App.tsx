//import { useState } from "react";
//import.meta.env.VITE_TOKEN_API;
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeView } from "./views/HomeView";
import { MovieInformationView } from "./views/MovieInformationView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/movie-information" element={<MovieInformationView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
