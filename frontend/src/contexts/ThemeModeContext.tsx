import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { PaletteMode } from "@mui/material";

type ThemeModeContextType = {
  mode: PaletteMode;
  toggleMode: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(
  undefined
);

type ThemeModeProviderProps = {
  children: ReactNode;
};

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const saved = localStorage.getItem("theme-mode");
    return saved === "dark" ? "dark" : "light";
  });

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme-mode", next);
      return next;
    });
  };

  const value = useMemo(
    () => ({
      mode,
      toggleMode,
    }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error("useThemeMode deve essere usato dentro ThemeModeProvider");
  }

  return context;
}