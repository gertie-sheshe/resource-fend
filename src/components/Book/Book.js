import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateBook } from "../../utils/api";

function Book({ book }) {
  const [isChecked, setIsChecked] = useState(book.returned);
  const [isDisabled, setIsDisabled] = useState(false);
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

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const updatedTodo = { ...book, completed: isChecked };
      updateTodoMutation.mutate({ data: updatedTodo, id: book.id });
    }
  }, [isChecked]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setIsDisabled(!isDisabled);
  };

  return (
    <li key={book.id}>
      <input
        disabled={isDisabled}
        onChange={handleOnChange}
        id={book.id}
        type="checkbox"
        checked={isChecked}
      />
      <label htmlFor={book.id}>{book.title}</label>
    </li>
  );
}

export default Book;
