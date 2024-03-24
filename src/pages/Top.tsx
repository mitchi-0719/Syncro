import { Box, Typography } from "@mui/material";
import { EventCreator } from "../components/Top/EventCreator";
import { EventBoard } from "../components/common/EventBoard";
// import { useEffect, useState } from "react";

export const Top = () => {
  // const [cookieData, setCookieData] = useState<string[]>([]);

  // // dummy処理 最終的には消す
  // useEffect(() => {
  //   (async () => {
  //     fetch("dummy/dummyCookieData.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setCookieData(data["dummyCookies"]);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   })();
  // }, []);

  return (
    <Box>
      <Typography>イベントを作成する</Typography>
      <EventCreator />
      <Typography>過去に開いたイベント</Typography>
      <EventBoard />
    </Box>
  );
};
