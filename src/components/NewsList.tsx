type NewsType = {
  id: number;
  title: string;
  url: string;
};

type NewsListProps = {
  news: NewsType[];
};

export default function NewsList({ news }: NewsListProps) {
  const render = news.map((item) => {
    return (
      <li key={item.id}>
        <a className="newsTitle" href={item.url} target="_blank">
          {item.title}
        </a>
      </li>
    );
  });

  return <>{render}</>;
}
