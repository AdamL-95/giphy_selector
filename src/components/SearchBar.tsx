import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const SearchBar: React.FC<{ setSearchQuery: any }> = ({ setSearchQuery }) => {
  const [textFieldValue, setTextFieldValue] = useState("");

  return (
    <Box>
      <TextField
        variant="outlined"
        value={textFieldValue}
        onChange={(event) => {
          setTextFieldValue(event.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          setSearchQuery(textFieldValue);
        }}
      >
        search
      </Button>
    </Box>
  );
};

export default SearchBar;
