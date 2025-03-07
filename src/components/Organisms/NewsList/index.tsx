import { memo, useMemo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination"; // Import TablePagination

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { t } = useTranslation();

  useEffect(() => {
    fetch("https://api.hnpwa.com/v0/news.json")
      .then((res) => res.json())
      .then((json) => {
        setNews(json);
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const render = useMemo(
    () =>
      news.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => {
        const formattedDate = formatUnixTime(item.time);
        return (
          <TableRow key={item.id}>
            <TableCell>
              <a
                className="block text-xl rounded-md p-1 hover:bg-gray-300"
                href={item.url}
                target="_blank"
              >
                {item.title}
              </a>
            </TableCell>
            <TableCell>
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
            </TableCell>
          </TableRow>
        );
      }),
    [news, page, rowsPerPage, t]
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("news:itemTitle")}</TableCell>
              <TableCell>{t("news:itemDetails")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{render}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { value: -1, label: "All" }]}
        component="div"
        count={news.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
export default memo(NewsList);
