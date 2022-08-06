import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";


const SearchBar = ({handleChange, value}) => (
  <>
    <TextField
      id="search-bar"
      className="text"
      onChange={handleChange}
      value={value}
      label="Search..."
      variant="outlined"
      placeholder="Search..."
      size="small"
      autoFocus={true}
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </>
);

export default SearchBar

