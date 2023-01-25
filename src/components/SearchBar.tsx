import { Box, Button, TextField } from "@mui/material";
import { useQuery } from "react-query";

const SearchBar: React.FC<{}> = () => {
  const fetchSearch = async () => {
    const response = await fetch("/api/search");
    const data = await response.json();
    console.log(data);
  };

  return (
    <Box>
      <TextField variant="outlined" />
      <Button variant="contained" onClick={fetchSearch}>
        search
      </Button>
    </Box>
  );
};

export default SearchBar;
