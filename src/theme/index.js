import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

const FONT_FAMILY = " 'Merriweather', 'serif'";

const theme = createTheme({
  typography: {
    fontFamily: FONT_FAMILY,
  },
});

const customTheme = deepmerge(theme, {
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
      fontFamily: FONT_FAMILY,
    },
  },
});

export default customTheme;
