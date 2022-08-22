import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUserBooks } from "../../utils/api";
import { Typography, Grid, Button } from "@mui/material";
import { styled } from "@mui/system";
import Users from "../Users";
import BooksList from "../BooksList";
import BookForm from "../BookForm";
import Section from "../../layout/Section";
import UserDialog from "./UserDialog";
import "./App.css";

const AppContainer = styled(Grid)({
  flexDirection: "column",
  paddingTop: "10px",
});

const ContentContainer = styled("div")(
  ({ theme: { breakpoints, typography } }) => ({
    width: "100%",
    [breakpoints.up("md")]: {
      width: "60%",
    },
    [breakpoints.up("lg")]: {
      width: "40%",
    },
  })
);

function App() {
  const [userId, setUserId] = useState(null); // move to context?
  const [open, setOpen] = useState(false);

  const books = useQuery(["userBooks", userId], () => getUserBooks(userId), {
    enabled: userId !== null,
  });

  const handleSelectChange = (e) => {
    e.preventDefault();
    setUserId(Number(e.target.value));
  };

  const handleModalOpen = () => {
    setOpen(!open);
  };

  return (
    <Section>
      <main>
        <AppContainer container>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            <Button variant="contained" onClick={handleModalOpen}>
              Add User
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ padding: "20px 0" }} variant="h1">
              Library App
            </Typography>
            <ContentContainer>
              <Users handleSelectChange={handleSelectChange} />
              <BooksList {...books} />
              <BookForm userId={userId} />
              <UserDialog open={open} handleModalOpen={handleModalOpen} />
            </ContentContainer>
          </Grid>
        </AppContainer>
      </main>
    </Section>
  );
}

export default App;
