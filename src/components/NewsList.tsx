type Article = {
  id: number;
  title: string;
  url: string;
};

type NewsListProps = {
  news: Article[];
};

export default function NewsList({ news }: NewsListProps) {
  const render = news.map((item) => {
    return (
      <li key={item.id}>
        <a className="newsTitle" href={item.url}>
          {item.title}
        </a>
      </li>
    );
  });

  return <>{render}</>;
}
