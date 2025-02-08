import { useState, useEffect } from 'react'
import MovieList from './components/MovieList'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch('https://yts.mx/api/v2/list_movies.json?sort_by=rating')
      .then(res => res.json())
      .then(json => { setMovies(json.data.movies) })
  }, [])

  console.log(movies)

  return (
    <div className="App">
      <h1>무비 리스트</h1>
      <MovieList movies={movies} />
    </div>
  )
}

export default App
