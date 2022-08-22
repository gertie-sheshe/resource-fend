import React from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { deleteBook } from "../../utils/api";

function BookDialog({ open, handleModalOpen, book }) {
  const queryClient = useQueryClient();

  const deleteBookMutation = useMutation(
    (options) => {
      const { id } = options;
      return deleteBook(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userBooks", book.userId);
        handleModalOpen();
      },
    }
  );

  const handleDelete = (e) => {
    e.preventDefault();
    deleteBookMutation.mutate({ id: book.id });
  };
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
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookDialog;
