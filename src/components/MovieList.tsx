type Movie = {
  id: number
  title: string
  rating: number
  url: string
  large_cover_image: string
}

type MovieListProps = {
  movies: Movie[]
}

export default function MovieList({ movies }: MovieListProps) {
  const render = movies.map(item => {
    const movieRank = item.rating >= 9 ? 'movieRankGood' : item.rating >= 7 ? 'movieRankSoso' : 'movieRankBad' 
    const hotIcon = item.rating >= 9 && '🔥'
    
    return (
      <div key={item.id}>
        <a className='movieTitle' href={item.url}>{item.title}</a>
        <div><span>{hotIcon}</span> 평점 : <span className={movieRank}>{item.rating}</span> / 10</div>
        <img src={item.large_cover_image} alt={item.title} /> 
      </div>
    )
  })

  return (
    <>
      {render}
    </>
  )
}


