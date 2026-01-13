export const lists = [
  { id: "list-1", title: "Privat", color: "#8b7cf6" },
  { id: "list-2", title: "Arbeit", color: "#7dd3fc" },
];


export const items = [
  {
    id: "1",
    list_id: "list-1",
    type: "task",
    title: "Einkaufen",
    date: "2026-01-12",
    completed: false,
  },
  {
    id: "2",
    list_id: "list-2",
    type: "event",
    title: "Meeting",
    date: "2026-01-12",
    start_time: "14:00",
    end_time: "15:00",
  },
  {
    id: "3",
    list_id: "list-1",
    type: "event",
    title: "Mama treffen",
    date: "2026-01-15",
    start_time: "12:00",
    end_time: "14:00",
  },
];
