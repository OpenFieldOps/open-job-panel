import type { PropsWithChildren } from "react";

type Event = {
  startDate: Date;
  endDate: Date;
};

type EventCalendarProps<T extends Event> = PropsWithChildren & {
  events: T[];
  onEventUpdate: (newEvent: T, eventIndex: number) => void;
};

export function EventCalendar<T extends Event>(_props: EventCalendarProps<T>) {
  return <></>;
}
