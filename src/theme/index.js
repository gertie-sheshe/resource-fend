import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

const FONT_FAMILY = " 'Merriweather', 'serif'";

const breakpoints = {
  values: {
    xs: 0,
    sm: 768,
    md: 1152,
    lg: 1440,
    xl: 1920,
  },
};

const palette = {
  primary: {
    main: "#000",
    secondary: "#fff",
  },
};

const theme = createTheme({
  breakpoints,
  palette,
  contentWidths: {
    values: {
      sm: 728,
      md: 1024,
      lg: 1144,
      xl: 1144,
    },
    unit: "px",
  },
  typography: {
    fontFamily: FONT_FAMILY,
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
      fontFamily: FONT_FAMILY,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "none",
        },
        containedPrimary: {
          color: palette.primary.secondary,
          backgroundColor: palette.primary.main,
          border: "solid 1px transparent",
          "&:hover": {
            backgroundColor: palette.primary.secondary,
            color: palette.primary.main,
            boxShadow: "none",
            border: `solid 1px ${palette.primary.main}`,
          },
        },
        secondary: {
          backgroundColor: palette.primary.secondary,
          color: palette.primary.main,
          boxShadow: "none",
          border: `solid 1px ${palette.primary.main}`,
        },
      },
    },
  },
});

const customTheme = deepmerge(theme, {
  typography: {
    h1: {
      fontSize: "1.5rem",
      [theme.breakpoints.up("sm")]: {
        fontSize: "3em",
      },
    },
  },
});

export default customTheme;
