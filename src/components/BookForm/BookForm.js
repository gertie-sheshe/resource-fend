import React, { useState } from "react";
import {
  Grid,
  FormControl,
  OutlinedInput,
  InputLabel,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

import { useMutation, useQueryClient } from "react-query";
import { createBook } from "../../utils/api";

const Form = styled("form")({
  display: "flex",
});

function BookForm({ userId }) {
  const [book, setBook] = useState("");
  const queryClient = useQueryClient();

  const addBookMutation = useMutation(
    (options) => {
      const { data, id } = options;
      return createBook(data, id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userBooks");
        setBook("");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      title: book,
      completed: false,
    };

    addBookMutation.mutate({ data: newBook, id: userId });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setBook(e.target.value);
  };

  return (
    <Grid style={{ marginTop: "20px" }}>
      <Form onSubmit={handleSubmit}>
        <FormControl sx={{ width: "85%" }}>
          <InputLabel htmlFor="book-input">Add a book</InputLabel>
          <OutlinedInput
            disabled={!userId}
            id="book-input"
            type="text"
            value={book}
            required
            onChange={handleOnChange}
          />
        </FormControl>
        <Button
          variant="secondary"
          disabled={!userId}
          style={{ marginLeft: "5px", width: "15%" }}
          type="submit"
        >
          Add
        </Button>
      </Form>
      {addBookMutation.error && <p>Error: {addBookMutation.error}</p>}
      {addBookMutation.isLoading && <p>Adding Todo...</p>}
    </Grid>
  );
}

export default BookForm;
