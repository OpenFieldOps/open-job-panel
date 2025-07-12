import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import "./style.css";
import type { EventInput } from "@fullcalendar/core/index.js";

type IndexedEvent<T> = EventInput & { extendedProps: { index: number } } & T;

export type IndexedEventSource<T> = IndexedEvent<T>[];

type CalendarProps<T> = {
  events: IndexedEventSource<T>;
  onEventUpdate: (eventIndex: number, newStart: Date, newEnd: Date) => void;
  renderEvent: (event: IndexedEvent<T>) => React.ReactNode;
  onEventClick: (event: IndexedEvent<T>) => void;
};

export default function Calendar<T>({
  events,
  onEventUpdate,
  renderEvent,
  onEventClick,
}: CalendarProps<T>) {
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
        eventClick={(event) =>
          onEventClick(event.event as T as IndexedEvent<T>)
        }
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
        eventContent={(event) =>
          renderEvent(event.event as T as IndexedEvent<T>)
        }
      />
    </>
  );
}
