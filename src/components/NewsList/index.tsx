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
    const formattedDate = formatUnixTime(item.time);
    return (
      <ul key={item.id}>
        <div className="mb-3">
          <a className="block text-xl rounded-md p-1 hover:bg-gray-300" href={item.url} target="_blank">
            {item.title}
          </a>{" "}
          <div className="text-base p-2">
            <div>
              <span>기사평가 : </span>
              <span className={`${item.points >= 90 ? "text-blue-600" : item.points >= 70 ? "text-orange-300" : "text-red-500"}`}>
                {item.points} / 100
              </span>
              <span> {formattedDate}</span>
            </div>
            <div>
              <span>작성자 ID : </span>
              <span className="text-base"> {item.user}</span>
            </div>
          </div>
        </div>
      </ul>
    );
  });

  return <>{render}</>;
}
