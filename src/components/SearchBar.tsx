import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar: React.FC<{ setSearchQuery: any }> = ({ setSearchQuery }) => {
  const [textFieldValue, setTextFieldValue] = useState("");

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        width: 300,
      }}
    >
      <InputBase
        placeholder="Search for a GIF"
        sx={{ flex: 1, ml: 1 }}
        value={textFieldValue}
        onChange={(event) => {
          setTextFieldValue(event.target.value);
        }}
      />
      <IconButton
        type="button"
        aria-label="search"
        onClick={() => {
          setSearchQuery(textFieldValue);
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
