import { AppBar, Stack, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <AppBar
      component="footer"
      position="static"
      sx={{ backgroundColor: "gray", padding: 1 }}
    >
      <Stack sx={{ textAlign: "center" }}>
        <Typography variant="caption">
          作成者：佐久間道仁（学籍番号：5422017）
        </Typography>
        <Typography variant="caption">
          このサイトは日本大学文理学部情報科学科の選択必修科目 データベース
          の最終課題として作成されました
        </Typography>
      </Stack>
    </AppBar>
  );
};
