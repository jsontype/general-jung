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
        ? "text-blue-500"
        : item.rating >= 6
        ? "text-yellow-500"
        : "text-red-500";
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
        <a
          className="block mb-[5px] text-3xl no-underline text-gray-500 p-[5px] rounded-md hover:bg-gray-500 hover:text-white"
          href={item.url}
        >
          {item.title} ({item.year}) <span>{hotIcon}</span>
        </a>{" "}
        <span className={movieRank}>
          평점: {item.rating === 0 ? "평점없음" : `${item.rating} / 10`}{" "}
        </span>
        <div className="text-base">
          장르: {item.genres.length <= 0 ? "정보없음" : item.genres.join(",")}
        </div>
        <div className="text-base">
          상영시간:{" "}
          {item.runtime === 0 ? "정보없음" : `${String(item.runtime)} min`}
        </div>
        <div className="text-base">
          줄거리: {displayedSynopsis}
          {isSynopsisLong && (
            <span
              className="text-green-500 hover:text-yellow-500 cursor-pointer"
              onClick={() => toggleSynopsis(item.id)}
            >
              {isOpenStory[item.id] ? " (줄이기)" : " ... (눌러서 자세히 보기)"}
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
  });

  return <>{render}</>;
}
