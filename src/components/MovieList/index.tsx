import { useState, memo, useMemo, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

type MovieType = {
  id: number;
  title: string;
  rating: number;
  url: string;
  large_cover_image: string;
  year: number;
  genres: string[];
  runtime: number;
  synopsis: string;
};

type MovieListProps = {
  initialMovies?: MovieType[];
};

function MovieList({ initialMovies = [] }: MovieListProps) {
  const { t } = useTranslation();
  const [isOpenStory, setIsOpenStory] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [movies, setMovies] = useState<MovieType[]>(initialMovies);

  useEffect(() => {
    if (initialMovies.length === 0) {
      fetch("https://yts.mx/api/v2/list_movies.json?sort_by=rating")
        .then((res) => res.json())
        .then((json) => {
          setMovies(json.data.movies);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [initialMovies]);
  // 줄거리 확장/축소 토글 함수
  const toggleSynopsis = useCallback((id: number) => {
    setIsOpenStory((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const render = useMemo(
    () =>
      movies.map((item) => {
        const movieRank =
          item.rating >= 8
            ? "text-blue-500"
            : item.rating >= 6
            ? "text-yellow-500"
            : "text-red-500";
        const hotIcon = item.rating >= 8 && "🔥";
        // 줄거리 텍스트 처리 로직
        const synopsisText =
          item.synopsis === "" ? t("movies:noSummary") : item.synopsis;
        const isSynopsisLong = synopsisText.length > 300;
        const displayedSynopsis =
          isSynopsisLong && !isOpenStory[item.id]
            ? synopsisText.slice(0, 300) + "..."
            : synopsisText;

        return (
          <div key={item.id}>
            <a
              className="block mb-[5px] text-3xl no-underline text-gray-500 p-[5px] rounded-md hover:bg-gray-500 hover:text-white"
              href={item.url}
            >
              {item.title} ({item.year}) <span>{hotIcon}</span>
            </a>{" "}
            <span className={movieRank}>
              {t("movies:itemRating")} :{" "}
              {item.rating === 0
                ? t("movies:noSummary")
                : `${item.rating} / 10`}{" "}
            </span>
            <div className="text-base">
              {t("movies:itemGenres")} :{" "}
              {item.genres.length <= 0
                ? t("movies:noSummary")
                : item.genres.join(",")}
            </div>
            <div className="text-base">
              <div className="text-base">
                {item.runtime === 0
                  ? t("movies:noSummary")
                  : `${t("movies:itemRuntime")}: ${parseInt(
                      String(item.runtime / 60)
                    )}${t("movies:itemRuntimeHour")} ${item.runtime % 60}${t(
                      "movies:itemRuntimeMinute"
                    )}`}
              </div>
            </div>
            <div className="text-base">
              {t("movies:itemSummary")}: {displayedSynopsis}
              {isSynopsisLong && (
                <span
                  className="text-green-500 hover:text-yellow-500 cursor-pointer"
                  onClick={() => toggleSynopsis(item.id)}
                >
                  {isOpenStory[item.id]
                    ? t("movies:collapse")
                    : t("movies:expand")}
                </span>
              )}
            </div>
            <img
              className="w-[100px] mb-[10px]"
              src={item.large_cover_image}
              alt={item.title}
            />
          </div>
        );
      }),
    [isOpenStory, movies, t, toggleSynopsis]
  );

  return <>{render}</>;
}

export default memo(MovieList);
