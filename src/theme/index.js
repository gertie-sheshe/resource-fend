import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

const FONT_FAMILY = " 'Merriweather', 'serif'";

const palette = {
  primary: {
    main: "#000",
    secondary: "#fff",
  },
};

const theme = createTheme({
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

// const { typography, palette, overrides } = theme;
// const { pxToRem } = typography;

// deepmerge(theme.typography, {
//   h1: {
//     fontSize: "3rem",
//     fontWeight: 700,
//     lineHeight: 1.167,
//     letterSpacing: "-0.01562em",
//     fontFamily: FONT_FAMILY,
//   },
// });

// deepmerge(overrides, {});

console.log("THEME", theme);

export default theme;
