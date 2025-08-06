import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./style.css";
import { HStack, Text, VStack } from "@chakra-ui/react";
import type {
  CalendarApi,
  DatesSetArg,
  EventInput,
} from "@fullcalendar/core/index.js";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { OutlineIconButton } from "@/components/buttons/Button";
import { useColorModeValue } from "@/components/ui/color-mode";
import { formatSingleDate, formatWeekRange } from "@/utils/time";

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
  leftToolbar?: React.ReactNode;
  rightToolbar?: React.ReactNode;
  displayDate?: boolean;
};

export default function Calendar<T>({
  events,
  onEventUpdate,
  renderEvent,
  onEventClick,
  isReadOnly = false,
  onDateSet,
  isOneDay = false,
  leftToolbar,
  rightToolbar,
  displayDate = false,
}: CalendarProps<T>) {
  const color = useColorModeValue("rgb(35, 35, 35)", "rgb(24, 24, 24)");
  const calendarRef = useRef<FullCalendar>(null);

  const [calendarApi, setCalendarApi] = useState<CalendarApi | null>(null);

  useEffect(() => {
    if (calendarRef.current) {
      setCalendarApi(calendarRef.current.getApi());
    }
  }, []);

  return (
    <VStack h={"full"} w={"full"}>
      {calendarApi ? (
        <HStack w={"full"} justifyContent={"space-between"}>
          <HStack>
            {leftToolbar}
            {displayDate && (
              <Text fontSize="lg" fontWeight="bold">
                {!isOneDay
                  ? formatWeekRange(calendarApi.getDate())
                  : formatSingleDate(calendarApi.getDate())}
              </Text>
            )}
          </HStack>
          <HStack>
            {rightToolbar}
            <OutlineIconButton onClick={() => calendarApi.prev()}>
              <ArrowLeft />
            </OutlineIconButton>
            <OutlineIconButton onClick={() => calendarApi.next()}>
              <ArrowRight />
            </OutlineIconButton>
          </HStack>
        </HStack>
      ) : null}
      <FullCalendar
        ref={calendarRef}
        allDaySlot={false}
        editable={!isReadOnly}
        datesSet={onDateSet}
        eventBackgroundColor={color}
        eventChange={(event) => {
          onEventUpdate(
            event.event.extendedProps.index,
            event.event.start as Date,
            event.event.end as Date
          );
        }}
        headerToolbar={{
          right: "",
          left: "",
        }}
        eventClick={(event) =>
          onEventClick(event.event as T as IndexedEvent<T>)
        }
        eventContent={(event) =>
          renderEvent(event.event as T as IndexedEvent<T>)
        }
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
            eventMaxStack: 1,
          },
        }}
      />
    </VStack>
  );
}
