import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "../components/ThemeToggle";

export default function Login({ mode, setMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [isLogin, setIsLogin] = useState(true);
  const [resetMode, setResetMode] = useState(false);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ---------- AUTH STATE ---------- */
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  /* ---------- LOGIN / SIGNUP ---------- */
  const handleAuth = async () => {
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      if (!cleanEmail || !cleanPassword) {
        throw new Error("Bitte E-Mail und Passwort eingeben.");
      }

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });
        if (error) throw error;

        navigate("/"); // ✅ HIER
      } else {
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPassword,
        });
        if (error) throw error;

        setInfo(
          "Account erstellt. Bitte bestätige deine E-Mail, bevor du dich einloggst."
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- PASSWORD RESET ---------- */
  const handlePasswordReset = async () => {
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail) throw new Error("Bitte E-Mail eingeben.");

      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail);

      if (error) throw error;

      setInfo(
        "Wir haben dir eine E-Mail zum Zurücksetzen des Passworts geschickt."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- LOGOUT (nur zum Testen) ---------- */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  /* ---------- LOGGED IN ---------- */
  if (user) {
    return (
      <Paper
        sx={{ p: 4, maxWidth: 400, margin: "50px auto", textAlign: "center" }}
      >
        <Box display="flex" justifyContent="flex-end">
          <ThemeToggle mode={mode} setMode={setMode} />
        </Box>

        <Typography variant="h6" gutterBottom>
          Willkommen, {user.email}
        </Typography>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Paper>
    );
  }

  /* ---------- LOGIN UI ---------- */
  return (
    <Box
      sx={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.paper",
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 900,
          borderRadius: 4,
          overflow: "hidden", // 🔥 extrem wichtig
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* LEFT IMAGE */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "50%",
            backgroundImage: "url('/login.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* 👇 HIER kommt dein Paper rein (unverändert) */}
        <Paper
          elevation={0}
          sx={{
            width: { xs: "100%", md: "50%" },
            p: { xs: 3, sm: 4 },
            background: "background.paper",
            backdropFilter: "blur(16px)",
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <ThemeToggle mode={mode} setMode={setMode} />
          </Box>

          <Stack spacing={{ xs: 2.5, sm: 3 }}>
            {/* Header */}
            <Box textAlign="center">
              <img
                src={logo}
                alt="Logo"
                style={{ width: "100px", height: "auto", marginBottom: "16px" }}
              />
              <Typography fontWeight={800} color="text.primary" fontSize="1.5rem">
                Willkommen!
              </Typography>
            </Box>

            {/* Email */}
            <TextField
              placeholder="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <EmailIcon sx={{ m: 1.5, color: "#8b7cf6" }} />,
              }}
              sx={inputSx}
            />

            {/* Password (nicht im Reset) */}
            {!resetMode && (
              <TextField
                placeholder="Passwort"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <LockIcon sx={{ m: 1.5, color: "#8b7cf6" }} />
                  ),
                }}
                sx={inputSx}
              />
            )}

            {/* Info / Error */}
            {info && (
              <Typography color="#8b7cf6" variant="body2">
                {info}
              </Typography>
            )}
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            {/* Main Button */}
            <Button
              fullWidth
              size="large"
              sx={buttonSx}
              onClick={resetMode ? handlePasswordReset : handleAuth}
              disabled={loading}
            >
              {resetMode
                ? "Passwort zurücksetzen"
                : isLogin
                ? "Login"
                : "Registrieren"}
            </Button>

            {/* Links */}
            {isLogin && !resetMode && (
              <Typography
                variant="body2"
                textAlign="center"
                color="text.primary"
                sx={{ cursor: "pointer" }}
                onClick={() => setResetMode(true)}
              >
                Passwort vergessen?
              </Typography>
            )}

            {resetMode && (
              <Typography
                variant="body2"
                textAlign="center"
                color="text.primary"
                sx={{ cursor: "pointer" }}
                onClick={() => setResetMode(false)}
              >
                Zurück zum Login
              </Typography>
            )}

            {!resetMode && (
              <Typography
                variant="body2"
                textAlign="center"
                color="text.primary"
                sx={{ cursor: "pointer" }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Noch keinen Account? Registrieren"
                  : "Bereits einen Account? Login"}
              </Typography>
            )}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

/* ---------- STYLES ---------- */

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: "background.paper",
    paddingLeft: "6px",
  },
  "& input": {
    padding: "14px",
    fontSize: "1rem",
    color: "text.primary",
  },
  "& input::placeholder": {
    color: "rgba(255,255,255,0.5)",
  },
};

const buttonSx = {
  borderRadius: 999,
  py: 1.5,
  fontSize: "1rem",
  fontWeight: 700,
  letterSpacing: 0.4,
  color: "#ffffff",
  background: "linear-gradient(135deg, #8b7cf6, #a78bfa)",
  boxShadow: "0 10px 40px rgba(139,124,246,0.45)",
  transition: "all 0.25s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #7c6df0, #9f7aea)",
    boxShadow: "0 14px 50px rgba(139,124,246,0.65)",
    transform: "translateY(-1px)",
  },
};
