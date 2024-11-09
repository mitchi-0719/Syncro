type TimeInputProps = {
  disabled: boolean;
};

export const TimeInput = ({ disabled }: TimeInputProps) => {
  return <input type="time" disabled={disabled} />;
};
