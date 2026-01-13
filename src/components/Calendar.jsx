import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import deLocale from "@fullcalendar/core/locales/de";

import { lists } from "../mock/data";
import { pastel } from "../utils/colors";

export default function Calendar({ items }) {
  const events = items
    .filter((i) => i.type === "event")
    .map((i) => {
      const list = lists.find((l) => l.id === i.list_id);
      const baseColor = list?.color || "#8b7cf6";

      console.log(i.title, list?.title);

      return {
        id: i.id,
        title: i.title,
        start: `${i.date}T${i.start_time}`,
        end: `${i.date}T${i.end_time}`,

        backgroundColor: pastel(baseColor, 0.45),
        borderColor: pastel(baseColor, 0.8),
        textColor: "#fff",
      };
    });

  return (
    <FullCalendar
      locale={deLocale}
      firstDay={1}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      height="100%"
      nowIndicator
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      buttonText={{
        today: "Heute",
        month: "Monat",
        week: "Woche",
        day: "Tag",
      }}
      events={events}
    />
  );
}
