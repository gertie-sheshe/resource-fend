import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUserBooks } from "../../utils/api";
import {
  Typography,
  Grid,
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
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
    <AppContainer container>
      <Button onClick={handleModalOpen}>Add User</Button>
      <Typography sx={{ padding: "20px 0" }} variant="h1">
        Library App
      </Typography>
      <main>
        <Users handleSelectChange={handleSelectChange} />
        <BooksList {...books} />
        <BookForm userId={userId} />
        <Dialog open={open} onClose={handleModalOpen}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a user, please enter their name here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Add User"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalOpen}>Cancel</Button>
            <Button onClick={handleModalOpen}>Add</Button>
          </DialogActions>
        </Dialog>
      </main>
    </AppContainer>
  );
}

export default App;
