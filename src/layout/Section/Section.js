import React from "react";
import { styled } from "@mui/system";

const SectionContainer = styled("div")(
  ({ theme: { breakpoints, typography } }) => ({
    padding: typography.pxToRem(20),
    [breakpoints.up("sm")]: {
      padding: typography.pxToRem(40),
    },
    [breakpoints.up("md")]: {
      padding: typography.pxToRem(60),
    },
    [breakpoints.up("lg")]: {
      padding: typography.pxToRem(80),
    },
    [breakpoints.up("xl")]: {
      padding: typography.pxToRem(100),
    },
  })
);

function Section({ children }) {
  return <SectionContainer>{children}</SectionContainer>;
}

export default Section;
