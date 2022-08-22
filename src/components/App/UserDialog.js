import React from "react";
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";

function UserDialog({ open, handleModalOpen }) {
  return (
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
        <Button variant="secondary" onClick={handleModalOpen}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleModalOpen}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDialog;
