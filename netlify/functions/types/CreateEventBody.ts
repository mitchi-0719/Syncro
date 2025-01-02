export type EventDate = {
  eventDate: string;
  startTime: string;
  endTime: string;
  memo?: string;
};

export type CreateEventBodyType = {
  title: string;
  description: string;
  defaultStartTime: string;
  defaultEndTime: string;
  dates: Array<EventDate>;
};
