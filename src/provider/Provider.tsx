import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
};
