import React from "react";
import { useQuery } from "react-query";
import { FormControl, InputLabel, MenuItem, Select, Grid } from "@mui/material";
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
    <Grid>
      <FormControl fullWidth>
        <InputLabel id="friend-select">Friends</InputLabel>
        <Select
          labelId="friend-select"
          defaultValue=""
          label="Friends"
          onChange={handleSelectChange}
        >
          {data.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default Users;
