import MuiButton from "@mui/material/Button";
import ReactCountryFlag from "react-country-flag";

type ButtonPros = {
  onChangeLanguage: any;
  onChangeLngArgs: string;
};

export default function Button({
  onChangeLanguage,
  onChangeLngArgs,
}: ButtonPros) {
  return (
    <MuiButton
      sx={{
        backgroundColor: "lightblue", // 배경색을 파란색으로 설정
        "&:hover": {
          backgroundColor: "lightgray", // 호버 시 배경색을 연파란색으로 설정
        },
        color: "white", // 텍스트 색상을 흰색으로 설정
      }}
      className="float-right mr-[3px] font-semibold py-1 px-2 border border-gray-400 rounded shadow"
      onClick={() => onChangeLanguage(onChangeLngArgs)}
    >
      {onChangeLngArgs === "en" && (
        <ReactCountryFlag
          countryCode="US"
          svg
          style={{ width: "1em", height: "1em" }}
          className="text-white" // 아이콘 색상을 흰색으로 설정
        />
      )}
      {onChangeLngArgs === "ko" && (
        <ReactCountryFlag
          countryCode="KR"
          svg
          style={{ width: "1em", height: "1em" }}
          className="text-white" // 아이콘 색상을 흰색으로 설정
        />
      )}
      {onChangeLngArgs === "ja" && (
        <ReactCountryFlag
          countryCode="JP"
          svg
          style={{ width: "1em", height: "1em" }}
          className="text-white" // 아이콘 색상을 흰색으로 설정
        />
      )}
      {onChangeLngArgs}
    </MuiButton>
  );
}
