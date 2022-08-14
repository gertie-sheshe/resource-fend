import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUserBooks } from "../../utils/api";
import { Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Users from "../Users";
import BooksList from "../BooksList";
import BookForm from "../BookForm";
import "./App.css";

const AppContainer = styled(Grid)({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  paddingTop: "50px",
});

function App() {
  const [userId, setUserId] = useState(null); // move to context?

  const books = useQuery(["userBooks", userId], () => getUserBooks(userId), {
    enabled: userId !== null,
  });

  const handleSelectChange = (e) => {
    e.preventDefault();
    setUserId(Number(e.target.value));
  };

  return (
    <AppContainer container>
      <Typography sx={{ padding: "20px 0" }} variant="h1">
        Library App
      </Typography>
      <main>
        <Users handleSelectChange={handleSelectChange} />
        <BooksList {...books} />
        <BookForm userId={userId} />
      </main>
    </AppContainer>
  );
}

export default App;
