import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUserBooks } from "../../utils/api";
import Users from "../Users";
import BooksList from "../BooksList";
import BookForm from "../BookForm";
import "./App.css";

function App() {
  const [userId, setUserId] = useState(null); // move to context?

  const books = useQuery(["userBooks", userId], () => getUserBooks(userId), {
    enabled: userId !== null,
  });

  const handleSelectChange = (e) => {
    e.preventDefault();
    setUserId(Number(e.target.value));
  };

  return (
    <div className="App">
      <h1>Library App</h1>
      <main>
        <Users handleSelectChange={handleSelectChange} />
        <BooksList {...books} />
        <BookForm userId={userId} />
      </main>
    </div>
  );
}

export default App;
