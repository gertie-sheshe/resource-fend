import React from "react";
import Book from "../Book";
import { List } from "@mui/material";

function BookList({ error, isLoading, data }) {
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form>
      <List sx={{ listStyleType: "none" }}>
        {data?.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </List>
      {data?.length === 0 && <p>No books found</p>}
    </form>
  );
}

export default BookList;
