import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box } from "@mui/material";
import dayjs from "../lib/dayjs";

export default function MiniCalendar() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 240,
        mx: "auto",
        p: 1.25,
        borderRadius: 3,

        // 🌫️ ruhiger, matter Pastell-Hintergrund
        background:
          "linear-gradient(180deg, rgba(139,124,246,0.18), rgba(139,124,246,0.08))",

        // 🧱 leichte Abgrenzung statt harter Kante
        boxShadow: `
          inset 0 0 0 1px rgba(139,124,246,0.25),
          0 8px 24px rgba(0,0,0,0.25)
        `,
        overflow: "hidden",
      }}
    >
      <DateCalendar
        value={dayjs()}
        readOnly
        sx={{
          width: "100%",
          m: 0,

          // Monatsname
          "& .MuiPickersCalendarHeader-label": {
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "text.primary",
          },

          // Tage
          "& .MuiPickersDay-root": {
            fontSize: "0.7rem",
            margin: "2px",
          },

          // Heute (dezent)
          "& .MuiPickersDay-today": {
            border: "1px solid rgba(139,124,246,0.6)",
          },

          // Ausgewählter Tag
          "& .Mui-selected": {
            backgroundColor: "#8b7cf6 !important",
            color: "#fff",
          },
        }}
      />
    </Box>
  );
}
