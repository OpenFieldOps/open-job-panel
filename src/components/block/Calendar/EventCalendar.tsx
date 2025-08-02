import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./style.scss";
import type { DatesSetArg, EventInput } from "@fullcalendar/core/index.js";
import { useColorModeValue } from "@/components/ui/color-mode";

type IndexedEvent<T> = Omit<EventInput, "id"> & {
  id: number;
  extendedProps: { index: number };
} & T;

type IndexedEventSource<T> = IndexedEvent<T>[];

type CalendarProps<T> = {
  events: IndexedEventSource<T>;
  onEventUpdate: (eventIndex: number, newStart: Date, newEnd: Date) => void;
  renderEvent: (event: IndexedEvent<T>) => React.ReactNode;
  onEventClick: (event: IndexedEvent<T>) => void;
  isReadOnly?: boolean;
  onDateSet?: (arg: DatesSetArg) => void;
  isOneDay?: boolean;
};

export default function Calendar<T>({
  events,
  onEventUpdate,
  renderEvent,
  onEventClick,
  isReadOnly = false,
  onDateSet,
  isOneDay = false,
}: CalendarProps<T>) {
  const color = useColorModeValue("rgb(35, 35, 35)", "rgb(24, 24, 24)");

  return (
    <FullCalendar
      allDaySlot={false}
      editable={!isReadOnly}
      datesSet={onDateSet}
      eventBackgroundColor={color}
      eventChange={(event) => {
        const eventProps = event.event.extendedProps;
        if (event.event.start && event.event.end) {
          onEventUpdate(eventProps.index, event.event.start, event.event.end);
        }
      }}
      headerToolbar={{
        right: "prev,next",
      }}
      eventClick={(event) => onEventClick(event.event as T as IndexedEvent<T>)}
      eventContent={(event) => renderEvent(event.event as T as IndexedEvent<T>)}
      eventDurationEditable={!isReadOnly}
      eventResizableFromStart={!isReadOnly}
      eventStartEditable={!isReadOnly}
      events={events as Omit<IndexedEvent<T>, "id">[]}
      forceEventDuration
      initialView={"timeGridWeekDay"}
      plugins={[timeGridPlugin, interactionPlugin]}
      views={{
        timeGridWeekDay: {
          type: "timeGrid",
          duration: { days: isOneDay ? 1 : 7 },
          scrollTime: "08:00:00",
          slotMinTime: "06:00:00",
          slotMaxTime: "22:00:00",
          snapDuration: "00:30:00",
          eventMaxStack: 2,
        },
      }}
    />
  );
}
