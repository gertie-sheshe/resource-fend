import React, { useState, useEffect, useRef } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useMutation, useQueryClient } from "react-query";
import { updateBook } from "../../utils/api";
import BookDialog from "./BookDialog";

function Book({ book }) {
  const [isChecked, setIsChecked] = useState(book.returned);
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const isInitialMount = useRef(true);
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation(
    (options) => {
      const { data, id } = options;
      updateBook(data, id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userBooks", book.userId);
        setIsDisabled(!isDisabled);
      },
    }
  );

  const handleModalOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const updatedTodo = { ...book, returned: isChecked };
      updateTodoMutation.mutate({ data: updatedTodo, id: book.id });
    }
  }, [isChecked]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setIsDisabled(!isDisabled);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton
          onClick={handleModalOpen}
          edge="end"
          aria-label="delete book"
        >
          <Delete />
        </IconButton>
      }
    >
      <ListItemButton sx={{ paddingLeft: 0 }} onClick={handleOnChange}>
        <ListItemIcon>
          <Checkbox
            sx={{ "&.Mui-checked": { color: "palette.primary.main" } }}
            checked={isChecked}
          />
        </ListItemIcon>
        <ListItemText id={book.id} primary={book.title} />
      </ListItemButton>
      <BookDialog open={open} handleModalOpen={handleModalOpen} book={book} />
    </ListItem>
  );
}

export default Book;
