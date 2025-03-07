import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import MovieList from "./components/MovieList";
import NewsList from "./components/NewsList";
import Counter from "./components/Counter";
import TodoLists from "./components/TodoLists";
import Home from "./components/Home";
import "./i18n";
import { useTranslation } from "react-i18next";

function App() {
  const [movies] = useState([]);
  const [news] = useState([]);
  const [count] = useState(0);
  const [todos] = useState([]);
  const { i18n } = useTranslation();

  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  // console.log(news);

  return (
    <div className="App m-5">
      {/* Navbar */}
      <div>
        <span>
          <Link
            className="navbarItem text-black text-2xl font-bold rounded-md p-1 mr-4 hover:bg-gray-300"
            to="/"
          >
            {" "}
            {/* margin-right: 15px, font-size: 25px, font-weight: bold, padding: 5px */}
            Home
          </Link>
        </span>
        <span>
          <Link
            className="navbarItem text-black text-2xl font-bold rounded-md p-1 mr-4 hover:bg-gray-300"
            to="/movies"
          >
            {" "}
            Movies
          </Link>
        </span>
        <span>
          <Link
            className="navbarItem text-black text-2xl font-bold rounded-md p-1 mr-4 hover:bg-gray-300"
            to="/news"
          >
            {" "}
            News
          </Link>
        </span>
        <span>
          <Link
            className="navbarItem text-black text-2xl font-bold rounded-md p-1 mr-4 hover:bg-gray-300"
            to="/counter"
          >
            {" "}
            Counter
          </Link>
        </span>
        <span>
          <Link
            className="navbarItem text-black text-2xl font-bold rounded-md p-1 mr-4 hover:bg-gray-300"
            to="/todo"
          >
            {" "}
            Todo
          </Link>
        </span>
        <span>
          <button
            className="float-right mr-[3px] bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => onChangeLanguage("ko")}
          >
            한국어
          </button>
          <button
            className="float-right mr-[3px] bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => onChangeLanguage("en")}
          >
            English
          </button>
          <button
            className="float-right mr-[3px] bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => onChangeLanguage("ja")}
          >
            日本語
          </button>
        </span>
      </div>
      {/* Language buttons */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList initialMovies={movies} />} />
        <Route path="/news" element={<NewsList initialNews={news} />} />
        <Route path="/counter" element={<Counter initialCount={count} />} />
        <Route path="/todo" element={<TodoLists initialTodos={todos} />} />
      </Routes>
    </div>
  );
}

export default App;
