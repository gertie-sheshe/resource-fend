import React from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

function BookDialog({ open, handleModalOpen, book }) {
  return (
    <Dialog open={open} onClose={handleModalOpen}>
      <DialogTitle>Delete Book</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Are you sure you want to delete ${book.title}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="secondary" onClick={handleModalOpen}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleModalOpen}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookDialog;
