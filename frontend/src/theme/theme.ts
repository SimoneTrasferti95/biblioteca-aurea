import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

export function getAppTheme(mode: PaletteMode) {
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#F5F5F5" : "#111111",
      },
      secondary: {
        main: mode === "dark" ? "#BFC5CC" : "#8A9097",
      },
      background: {
        default: mode === "dark" ? "#0F1113" : "#FAFAFA",
        paper: mode === "dark" ? "#171A1D" : "#FFFFFF",
      },
      text: {
        primary: mode === "dark" ? "#F5F5F5" : "#111111",
        secondary: mode === "dark" ? "#B7BDC5" : "#6B7280",
      },
      divider: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    },
    typography: {
      fontFamily: `"Georgia", "Times New Roman", serif`,
      h1: {
        fontSize: "2.2rem",
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "1.9rem",
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: "1.4rem",
        fontWeight: 600,
      },
      h4: {
        fontSize: "1.15rem",
        fontWeight: 600,
      },
      body1: {
        lineHeight: 1.8,
      },
      body2: {
        lineHeight: 1.7,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === "dark" ? "#0F1113" : "#FAFAFA",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#171A1D" : "#FFFFFF",
            color: mode === "dark" ? "#F5F5F5" : "#111111",
            borderBottom:
              mode === "dark"
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
            boxShadow: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border:
              mode === "dark"
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
            boxShadow:
              mode === "dark"
                ? "0 10px 25px rgba(0,0,0,0.22)"
                : "0 10px 25px rgba(0,0,0,0.05)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
}