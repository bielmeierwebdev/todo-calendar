import { useMemo, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";
import Login from "./components/Login";
import AppPage from "./pages/AppPage";
import { getUser } from "./auth/mockAuth";
import "./styles/calendar.css";


function App() {
  const [mode, setMode] = useState("dark");
  const [user, setUser] = useState(null);

  const theme = useMemo(() => getTheme(mode), [mode]);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {user ? (
        <AppPage mode={mode} setMode={setMode} user={user} />
      ) : (
        <Login mode={mode} setMode={setMode} onLogin={setUser} />
      )}
    </ThemeProvider>
  );
}

export default App;
