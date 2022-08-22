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
import { useMutation, useQueryClient } from "react-query";
import { createUser } from "../../utils/api";

function UserDialog({ open, handleModalOpen }) {
  const queryClient = useQueryClient();
  const [name, setName] = React.useState("");

  const createUserMutation = useMutation(
    (options) => {
      const { data } = options;
      return createUser(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        handleModalOpen();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserMutation.mutate({ data: { name } });
  };

  const handleCancel = () => {
    setName("");
    handleModalOpen();
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <Dialog open={open} onClose={handleModalOpen}>
      <DialogTitle>New Friend?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add them, please enter their name below
        </DialogContentText>
        <form id="friend-form" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add Friend"
            type="text"
            fullWidth
            required
            variant="standard"
            value={name}
            onChange={handleOnChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" form="friend-form">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDialog;
