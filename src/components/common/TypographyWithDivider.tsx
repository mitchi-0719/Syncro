import {
  Divider,
  DividerOwnProps,
  Typography,
  TypographyOwnProps,
} from "@mui/material";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
  TypographyProps?: TypographyOwnProps;
  DividerProps?: DividerOwnProps;
};

export const TypographyWithDivider: FC<Props> = ({
  children,
  TypographyProps,
  DividerProps,
}) => {
  return (
    <>
      <Typography {...TypographyProps}>{children}</Typography>
      <Divider sx={{ marginBottom: 1 }} {...DividerProps} />
    </>
  );
};
