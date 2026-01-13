import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  Checkbox,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import dayjs from "../lib/dayjs";

// components
import ThemeToggle from "../components/ThemeToggle";
import MiniCalendar from "../components/MiniCalendar";
import Calendar from "../components/Calendar";
import OpenTaskModal from "../components/OpenTaskModal";

import { lists, items as mockItems } from "../mock/data";
import AddIcon from "@mui/icons-material/Add";

export default function AppPage({ mode, setMode }) {
  const [activeView, setActiveView] = useState("tasks"); // "tasks" | "calendar"
  const [taskView, setTaskView] = useState("list"); // "list" | "next7"
  const [activeListId, setActiveListId] = useState(lists[0].id);
  const [items, setItems] = useState(mockItems);

  // Modal: Task hinzufügen/bearbeiten
  const [openTask, setOpenTask] = useState(false);

  const today = dayjs();

  const listItems = items.filter(
    (i) => i.list_id === activeListId && i.type === "task"
  );

  console.log(listItems);
  console.log(dayjs(listItems[0].date));
  const next7Days = listItems.filter(
    (i) =>
      i.date &&
      dayjs(i.date).isSameOrAfter(today, "day") &&
      dayjs(i.date).isBefore(today.add(7, "day"))
  );

  const someday = listItems.filter((i) => !i.date);

  function handleOpenTask() {
    setOpenTask(true);
  }

  function closeTask(){
    setOpenTask(false);
  }

  return (
    <Box display="flex" height="100vh">
      {/* SIDEBAR */}
      <Box
        sx={{
          width: 280,
          display: "flex",
          flexDirection: "column",
          borderRight: 1,
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        {/* VIEWS */}
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Ansichten
          </Typography>

          <List>
            <ListItemButton
              selected={activeView === "calendar"}
              onClick={() => setActiveView("calendar")}
            >
              📅 Kalender
            </ListItemButton>
            <ListItemButton
              selected={activeView === "tasks"}
              onClick={() => setActiveView("tasks")}
            >
              📋 Aufgaben
            </ListItemButton>
          </List>
        </Box>

        <Divider />

        {/* LISTEN */}
        <Box sx={{ p: 2, flexGrow: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Listen
          </Typography>

          <List>
            {lists.map((list) => (
              <ListItemButton
                key={list.id}
                selected={list.id === activeListId}
                onClick={() => setActiveListId(list.id)}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: list.color,
                    mr: 1.5,
                  }}
                />
                <Typography>{list.title}</Typography>
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* MINI CALENDAR */}
        <Box sx={{ p: 2 }}>
          <MiniCalendar />
        </Box>
      </Box>

      {/* MAIN */}
      <Box flex={1} display="flex" flexDirection="column">
        {/* HEADER */}
        <Box
          sx={{
            height: 64,
            px: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography fontWeight={700}>Meine ToDo App</Typography>
          <ThemeToggle mode={mode} setMode={setMode} />
        </Box>

        {/* CONTENT */}
        <Box sx={{ flex: 1, p: 3, overflow: "auto" }}>
          {/* KALENDER VIEW */}
          {activeView === "calendar" && (
            <Box
              sx={{
                height: "100%",
                p: 2,
                borderRadius: 4,
                background:
                  "linear-gradient(180deg, rgba(139,124,246,0.08), rgba(139,124,246,0.02))",
                boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
              }}
            >
              <Calendar items={items} />
            </Box>
          )}

          {/* TASKS VIEW */}
          {activeView === "tasks" && (
            <>
              {/* TASK VIEW SWITCH */}
              <Box mb={2} display="flex" gap={1}>
                <Button
                  size="small"
                  variant={taskView === "list" ? "contained" : "outlined"}
                  onClick={() => setTaskView("list")}
                >
                  Liste
                </Button>
                <Button
                  size="small"
                  variant={taskView === "next7" ? "contained" : "outlined"}
                  onClick={() => setTaskView("next7")}
                >
                  Nächste 7 Tage
                </Button>
                <IconButton>
                  <AddIcon onClick={handleOpenTask} />
                </IconButton>
              </Box>

              {/* KLASSISCHE LISTE */}
              {taskView === "list" &&
                listItems.map((item) => (
                  <TaskRow key={item.id} item={item} setItems={setItems} />
                ))}

              {/* NÄCHSTE 7 TAGE + IRGENDWANN */}
              {taskView === "next7" && (
                <>
                  <Typography fontWeight={600} mb={1}>
                    Nächste 7 Tage
                  </Typography>
                  {next7Days.map((item) => (
                    <TaskRow key={item.id} item={item} setItems={setItems} />
                  ))}

                  <Divider sx={{ my: 2 }} />

                  <Typography fontWeight={600} mb={1}>
                    Irgendwann
                  </Typography>
                  {someday.map((item) => (
                    <TaskRow key={item.id} item={item} setItems={setItems} />
                  ))}
                </>
              )}
            </>
          )}
        </Box>
      </Box>
      <OpenTaskModal open={openTask} onClose={closeTask} />
    </Box>
  );
}

/* ---------- TASK ROW ---------- */

function TaskRow({ item, setItems }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1.5,
        p: 1.5,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Checkbox
        checked={item.completed}
        onChange={() =>
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id ? { ...i, completed: !i.completed } : i
            )
          )
        }
      />
      <Typography fontWeight={600}>{item.title}</Typography>
    </Box>
  );
}
