import { ContentCopy } from "@mui/icons-material";
import { Box, Button, SxProps, TextField, Theme } from "@mui/material";
import { FC, useState } from "react";
import { TypographyWithDivider } from "./TypographyWithDivider";

type Props = {
  url: string;
  sx?: SxProps<Theme>;
};

export const UrlCopyButton: FC<Props> = ({ url, sx }) => {
  const [copied, setCopied] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  return (
    <Box marginY={4} sx={{ width: "100%", ...sx }}>
      <TypographyWithDivider TypographyProps={{ variant: "h5" }}>
        URLをコピー
      </TypographyWithDivider>
      <Box display="flex" alignItems="center" justifyContent="center">
        <TextField
          value={url}
          size="small"
          onChange={() => {}}
          sx={{
            width: "60%",
            height: "40px",
            "& .MuiInputBase-root": {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }}
        />
        <Button
          onClick={handleClick}
          variant="outlined"
          endIcon={<ContentCopy />}
          sx={{
            height: "40px",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          {copied ? "コピーしました" : "URLをコピー"}
        </Button>
      </Box>
    </Box>
  );
};
