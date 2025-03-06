import { memo, useMemo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type NewsType = {
  id: number;
  title: string;
  url: string;
  points?: number;
  time: number;
  user?: string;
};

type NewsListProps = {
  initialNews?: NewsType[];
};

function formatUnixTime(unixTime: number): string {
  const date = new Date(unixTime * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `(${year}-${month}-${day})`;
}

function NewsList({ initialNews = [] }: NewsListProps) {
  const [news, setNews] = useState<NewsType[]>(initialNews);
  const { t } = useTranslation();

  useEffect(() => {
    fetch("https://api.hnpwa.com/v0/news.json")
      .then((res) => res.json())
      .then((json) => {
        setNews(json);
      });
  }, []);
  const render = useMemo(
    () =>
      news.map((item) => {
        const formattedDate = formatUnixTime(item.time);
        return (
          <ul key={item.id}>
            <div className="mb-3">
              <a
                className="block text-xl rounded-md p-1 hover:bg-gray-300"
                href={item.url}
                target="_blank"
              >
                {item.title}
              </a>{" "}
              <div className="text-base p-2">
                <div>
                  <span>{t("news:itemRating")} : </span>
                  {item.points === undefined || item.points === 0 ? (
                    <span>{t("news:noInformation")}</span>
                  ) : (
                    <span
                      className={`${
                        item.points >= 90
                          ? "text-blue-600"
                          : item.points >= 70
                          ? "text-orange-300"
                          : "text-red-500"
                      }`}
                    >
                      {item.points} / 100
                    </span>
                  )}
                  <span>
                    {" "}
                    {t("news:itemCreateDate")} : {formattedDate}
                  </span>
                </div>

                <div>
                  <span> {t("news:itemUser")}: </span>
                  {item.user ? (
                    <span className="text-base">{item.user}</span>
                  ) : (
                    <span>{t("news:noInformation")}</span>
                  )}{" "}
                </div>
              </div>
            </div>
          </ul>
        );
      }),
    [news, t]
  );

  return <>{render}</>;
}
export default memo(NewsList);
