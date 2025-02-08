import "./styles.css";
import { useState } from "react";

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
  movies: MovieType[];
};

export default function MovieList({ movies }: MovieListProps) {
  const [isOpenStory, setIsOpenStory] = useState<{ [key: number]: boolean }>(
    {}
  );

  // 줄거리 확장/축소 토글 함수
  const toggleSynopsis = (id: number) => {
    setIsOpenStory((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const render = movies.map((item) => {
    const movieRank =
      item.rating >= 8
        ? "movieRankGood"
        : item.rating >= 6
        ? "movieRankSoso"
        : "movieRankBad";
    const hotIcon = item.rating >= 8 && "🔥";
    // 줄거리 텍스트 처리 로직
    const synopsisText = item.synopsis === "" ? "정보없음" : item.synopsis;
    const isSynopsisLong = synopsisText.length > 300;
    const displayedSynopsis =
      isSynopsisLong && !isOpenStory[item.id]
        ? synopsisText.slice(0, 300) + "..."
        : synopsisText;

    return (
      <div key={item.id}>
        <span>{hotIcon}</span>{" "}
        <a className="movieTitle" href={item.url}>
          {item.title} ({item.year})
        </a>{" "}
        <span className={movieRank}>
          평점: {item.rating === 0 ? "평점없음" : `${item.rating} / 10`}{" "}
        </span>
        <div className="movieGenre">
          장르: {item.genres.length <= 0 ? "정보없음" : item.genres.join(",")}
        </div>
        <div className="movieRuntime">
          상영시간:{" "}
          {item.runtime === 0 ? "정보없음" : `${String(item.runtime)} min`}
        </div>
        <div className="movieSynopsys">
          줄거리: {displayedSynopsis}
          {isSynopsisLong && (
            <span
              className="movieStoryToggleBtn"
              onClick={() => toggleSynopsis(item.id)}
            >
              {isOpenStory[item.id] ? " (줄이기)" : " ... (눌러서 자세히 보기)"}
            </span>
          )}
        </div>
        <img
          className="movieImage"
          src={item.large_cover_image}
          alt={item.title}
        />
      </div>
    );
  });

  return <>{render}</>;
}
