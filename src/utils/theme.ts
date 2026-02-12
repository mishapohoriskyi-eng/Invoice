import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { colors } from "../system/constants";
import { withStyles } from "@mui/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: colors.black,
    },
    secondary: {
      main: colors.black,
    },
    background: {
      default: colors.white,
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: ["Inter !important", "Roboto"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: "fit-content",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0px 4px 20px rgba(20, 32, 100, 0.08)",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  "@global": {
    "& body": {
      background: colors.blue4,
    },
    "*": {
      fontFamily: "Inter",
      scrollbarWidth: "thin",
      scrollbarColor: `${theme.palette.primary.main} ${colors.white}`,
      margin: "0",
      padding: "0",
      boxSizing: "border-box",
      "&::-webkit-scrollbar": {
        width: 10,
      },
      "&::-webkit-scrollbar-track": {
        background: colors.blue4,
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 20,
        border: `3px solid ${colors.blue4}`,
      },
      "& svg": {
        maxWidth: "100%",
      },
    },
  },
})(() => null);

export { theme, GlobalCss };
