import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import App from "./App";
import { getAppTheme } from "./theme/theme";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeModeProvider, useThemeMode } from "./contexts/ThemeModeContext";
import "./i18n";

function AppWithProviders() {
  const { mode } = useThemeMode();

  return (
    <ThemeProvider theme={getAppTheme(mode)}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <AppWithProviders />
    </ThemeModeProvider>
  </React.StrictMode>
);