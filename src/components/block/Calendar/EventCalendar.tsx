import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import "./style.css";
import type { EventInput } from "@fullcalendar/core/index.js";

export type IndexedEventSource = EventInput &
  { extendedProps: { index: number } }[];

type CalendarProps = {
  events: IndexedEventSource;
  onEventUpdate: (eventIndex: number, newStart: Date, newEnd: Date) => void;
};

export default function Calendar({ events, onEventUpdate }: CalendarProps) {
  return (
    <>
      <FullCalendar
        allDaySlot={false}
        events={events}
        forceEventDuration
        plugins={[timeGridPlugin, interactionPlugin]}
        editable
        eventStartEditable
        eventDurationEditable
        eventChange={(event) => {
          const eventProps = event.event.extendedProps;
          onEventUpdate(eventProps.index, event.event.start!, event.event.end!);
        }}
        eventResizableFromStart={true}
        eventBackgroundColor="rgb(21, 21, 21)"
        initialView={"timeGridWeekDay"}
        views={{
          timeGridWeekDay: {
            type: "timeGrid",
            duration: { days: 7 },
            scrollTime: "08:00:00",
          },
        }}
      />
    </>
  );
}
