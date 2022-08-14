import React from "react";
import { useQuery } from "react-query";
import { getUsers } from "../../utils/api";

function Users({ handleSelectChange }) {
  const { data, isLoading, isError } = useQuery("users", getUsers);

  if (isError) {
    return <p>Error: {isError}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <label htmlFor="users">Choose User: </label>
      <select onChange={handleSelectChange} name="users" id="users">
        <option defaultValue>Select User</option>
        {data?.map((user) => {
          return (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Users;
