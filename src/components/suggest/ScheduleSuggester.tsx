import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { TypographyWithDivider } from "../common/TypographyWithDivider";
import { ContentCopy } from "@mui/icons-material";
import { scheduleSuggester } from "../../feature/suggest/scheduleSuggester";
import { DateType, ScheduleType, UserType } from "../../types/EventDataType";

type Props = {
  dates: DateType[];
  schedules: ScheduleType[];
  users: UserType[];
};

export const ScheduleSuggester: FC<Props> = ({ dates, schedules, users }) => {
  const [suggestValue, setSuggestValue] = useState<string[]>([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [copied, setCopied] = useState(false);
  const handleClick = useCallback(() => {
    const newValue = scheduleSuggester(dates, schedules, users);
    const suggests = newValue.map((suggest) => {
      const time = suggest.time;
      const date = suggest.date;
      const st1 = suggest.participantStatus[1].length;
      const st2 = suggest.participantStatus[2].length;
      const st3 = suggest.participantStatus[3].length;
      return `${date} ${time} [◯: ${st1}人, △: ${st2}人, ×: ${st3}人]`;
    });
    setSuggestValue(suggests);
  }, [dates, schedules, users]);
  const handleCopy = () => {
    navigator.clipboard.writeText(suggestValue.join("\n"));
    setCopied(true);
  };

  useEffect(() => {
    handleClick();
  }, [handleClick]);

  return (
    <Box>
      <TypographyWithDivider TypographyProps={{ variant: "h5" }}>
        候補日時
      </TypographyWithDivider>
      <Box display="flex" justifyContent="center">
        <Box
          width="30%"
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
        >
          <Box marginBottom={1}>
            表示件数：
            <Select
              value={displayCount}
              onChange={(e) => setDisplayCount(Number(e.target.value))}
              size="small"
              sx={{ backgroundColor: "white", marginX: 1 }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            件
          </Box>

          <TextField
            value={suggestValue.slice(0, displayCount).join("\n")}
            fullWidth
            multiline
            maxRows="10"
            onChange={() => {}}
            sx={{
              "& .MuiInputBase-root": {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
          />
          <Button
            onClick={handleCopy}
            fullWidth
            variant="outlined"
            endIcon={<ContentCopy />}
            sx={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            {copied ? "コピーしました" : "候補日をコピー"}
          </Button>
          <Button
            onClick={handleClick}
            fullWidth
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            候補日を計算
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
