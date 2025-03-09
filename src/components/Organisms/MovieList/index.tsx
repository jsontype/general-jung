import { useState, memo, useMemo, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/system/Box'
import { FocusTrap } from '@mui/base/FocusTrap'

type MovieType = {
  id: number
  title: string
  rating: number
  url: string
  large_cover_image: string
  year: number
  genres: string[]
  runtime: number
  synopsis: string
}

type MovieListProps = {
  initialMovies?: MovieType[]
}

function MovieList({ initialMovies = [] }: MovieListProps) {
  const { t } = useTranslation()
  const [isOpenStory, setIsOpenStory] = useState<{ [key: number]: boolean }>({})
  const [movies, setMovies] = useState<MovieType[]>(initialMovies)
  const [, setFocusedMovieId] = useState<number | null>(null)

  useEffect(() => {
    if (initialMovies.length === 0) {
      fetch('https://yts.mx/api/v2/list_movies.json?sort_by=rating')
        .then(res => res.json())
        .then(json => {
          setMovies(json.data.movies)
        })
        .catch(error => console.error('Error fetching movies:', error))
    }
  }, [])

  const toggleSynopsis = useCallback((id: number) => {
    setIsOpenStory(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
    if (!isOpenStory[id]) {
      setFocusedMovieId(id)
    } else {
      setFocusedMovieId(null)
    }
  }, [isOpenStory, setIsOpenStory, setFocusedMovieId]);
  

  const render = useMemo(
    () =>
      movies.map(item => {
        const movieRank =
          item.rating >= 8 ? 'text-blue-500' : item.rating >= 6 ? 'text-yellow-500' : 'text-red-500'
        const hotIcon = item.rating >= 8 && '🔥'
        const synopsisText = item.synopsis === '' ? t('movies:noSummary') : item.synopsis
        const isSynopsisLong = synopsisText.length > 300
        const displayedSynopsis =
          isSynopsisLong && !isOpenStory[item.id]
            ? synopsisText.slice(0, 300) + '...'
            : synopsisText

        return (
          <div
            className="flex flex-col md:flex-row items-start md:items-top border-2 border-solid border-black rounded p-4"
            key={item.id}
          >
            <div className="md:w-3/4">
              <a
                className="block text-3xl no-underline text-black-500 p-[5px] rounded-md hover:bg-gray-500 hover:text-white mb-2"
                href={item.url}
              >
                {item.title} ({item.year}) <span>{hotIcon}</span>
              </a>
              <span className={movieRank}>
                {t('movies:itemRating')} :{' '}
                {item.rating === 0 ? t('movies:noSummary') : `${item.rating} / 10`}
              </span>
              <div className="text-base mt-2">
                {t('movies:itemGenres')} :{' '}
                {item.genres.length <= 0 ? t('movies:noSummary') : item.genres.join(',')}
              </div>
              <div className="text-base mt-2">
                {item.runtime === 0
                  ? t('movies:noSummary')
                  : `${t('movies:itemRuntime')}: ${parseInt(
                      String(item.runtime / 60),
                    )}${t('movies:itemRuntimeHour')} ${item.runtime % 60}${t(
                      'movies:itemRuntimeMinute',
                    )}`}
              </div>
              <div className="text-base mt-4">
                {t('movies:itemSummary')}: {displayedSynopsis}
                {isSynopsisLong && (
                  <span
                    className="text-green-500 hover:text-yellow-500 cursor-pointer"
                    onClick={() => toggleSynopsis(item.id)}
                  >
                    {isOpenStory[item.id] ? t('movies:collapse') : t('movies:expand')}
                  </span>
                )}
              </div>
            </div>
            <img
              className="flex-[999_1_auto] h-full w-full md:w-[200px] h-[200px] object-cover ml-4"
              src={item.large_cover_image}
              alt={item.title}
            />
            {isOpenStory[item.id] && (
              <Box
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FocusTrap open>
                  <Box
                    tabIndex={-1}
                    sx={{
                      backgroundColor: 'white',
                      p: 2,
                      maxWidth: '80%',
                      maxHeight: '80%',
                      overflowY: 'auto',
                    }}
                  >
                    <button type="button" onClick={() => toggleSynopsis(item.id)}>
                      Close
                    </button>
                    <p>{synopsisText}</p>
                  </Box>
                </FocusTrap>
              </Box>
            )}
          </div>
        )
      }),
    [isOpenStory, movies, t, toggleSynopsis],
  )

  return <>{render}</>
}

export default memo(MovieList)
