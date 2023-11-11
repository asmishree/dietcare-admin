import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode:any) => ({
  ...(mode === "dark"
    ? {
        bg: {
          400: "#858585",
          500: "#141517",
        },
        link:{
          500:"white"
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1A1B1E",
          500: "#141517",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        secondary: {
          500:"#016bff",
          400:"#339bf060",
        },
      }
    : {
        bg: {
          400: "#525252",
          500: "#F8F9FA",
        },
        link:{
          500:"black"
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "white",
          500: "#141517",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },

        secondary: {
          500:"#016bff",
          400:"#339bf060"
        },
      
      }),
});

// mui theme settings
export const themeSettings = (mode:any) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            secondary: {
              main: colors.primary[500],
            },
            primary: {
              main: colors.secondary[500],
            },
            background: {
              default: colors.bg[500],
            },
          }
        : {
            // palette values for light mode
            secondary: {
              main: colors.primary[100],
            },
            primary: {
              main: colors.secondary[500],
            },
            background: {
              default: colors.bg[500], // default background color.
            },
          }),
    },
    typography: { fontFamily: 'Roboto, sans-serif', fontWeightRegular: 400, }
  };
};


// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const storedMode = localStorage.getItem("colorMode");
  const [mode, setMode] = useState(storedMode || "light");

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
