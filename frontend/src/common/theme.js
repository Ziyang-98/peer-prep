import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ["-apple-system", "BlinkMacSystemFont", "sans-serif"].join(","),
  },

  palette: {
    primary: {
      main: "#ecf09c",
      light: "#88f2e3",
      dark: "#08c9ae",
      contrastText: "#fff",
    },
    secondary: {
      main: "#e1132e",
      light: "#f7989b",
      dark: "#c60019",
      contrastText: "#000",
    },
    warning: {
      main: "#e1132e",
      light: "#e86868",
    },

    //   accent: {
    //     main: "#FFE8FF",
    //   },
  },
});
