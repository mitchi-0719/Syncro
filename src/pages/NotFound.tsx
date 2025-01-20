import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"60vh"}
      gap={2}
    >
      <Typography variant="h4">イベントが存在しません。</Typography>
      <Box>
        <Typography variant="body1">
          指定したURLのイベントが存在しません。
        </Typography>
        <Typography variant="body1">再度URLを確認してください。</Typography>
        <Typography variant="body1">
          イベントが削除されている可能性もあります。イベント作成者に確認をしてください。
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={() => navigate("/")}
      >
        トップページに戻る
      </Typography>
    </Box>
  );
};
