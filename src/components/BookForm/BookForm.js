import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createBook } from "../../utils/api";

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
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <label style={{ marginRight: "10px" }} htmlFor="book">
          Add Book:
        </label>
        <input
          disabled={!userId}
          id="book"
          type="text"
          value={book}
          onChange={handleOnChange}
        />
        <button disabled={!userId} style={{ marginLeft: "5px" }} type="submit">
          Add
        </button>
      </form>
      {addBookMutation.error && <p>Error: {addBookMutation.error}</p>}
      {addBookMutation.isLoading && <p>Adding Todo...</p>}
    </div>
  );
}

export default BookForm;
