import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import MovieList from "./components/MovieList";
import NewsList from "./components/NewsList";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://yts.mx/api/v2/list_movies.json?sort_by=rating")
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.data.movies);
      });
  }, []);

  // console.log(movies);

  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://api.hnpwa.com/v0/ask.json")
      .then((res) => res.json())
      .then((json) => {
        setNews(json);
      });
  }, []);

  console.log(news);

  return (
    <div className="App">
      {/* Navbar */}
      <div>
        <span>
          <Link className="navbarItem" to="/">
            Home
          </Link>
        </span>
        <span>
          <Link className="navbarItem" to="/movies">
            Movies
          </Link>
        </span>
        <span>
          <Link className="navbarItem" to="/news">
            News
          </Link>
        </span>
      </div>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList movies={movies} />} />
        <Route path="/news" element={<NewsList news={news} />} />
      </Routes>
    </div>
  );
}

export default App;
