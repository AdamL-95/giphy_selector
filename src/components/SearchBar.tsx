import { Box, Button, TextField } from "@mui/material";

const SearchBar: React.FC<{}> = () => {
  return (
    <Box>
      <TextField variant="outlined" />
      <Button variant="contained">search</Button>
    </Box>
  );
};

export default SearchBar;
