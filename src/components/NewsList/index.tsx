import "./styles.css";

type NewsType = {
  id: number;
  title: string;
  url: string;
  points: number;
  time: number;
  user: string;
};

type NewsListProps = {
  news: NewsType[];
};

function formatUnixTime(unixTime: number): string {
  const date = new Date(unixTime * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
  const day = date.getDate();
  return `(${year}-${month}-${day})`;
}

export default function NewsList({ news }: NewsListProps) {
  const render = news.map((item) => {
    const newsPoint =
      item.points >= 90
        ? "newsPointGood"
        : item.points >= 70
        ? "newsPointSoso"
        : "newsPointBad";

    const formattedDate = formatUnixTime(item.time);
    return (
      <ul key={item.id}>
        <div>
          <a className="newsTitle" href={item.url} target="_blank">
            {item.title}
          </a>{" "}
          기사평가 : <span className={newsPoint}>{item.points} / 100</span>
          <span> {formattedDate}</span>
        </div>{" "}
        <div>
          작성자 ID : <span className="userName"> {item.user}</span>
        </div>
      </ul>
    );
  });

  return <>{render}</>;
}
