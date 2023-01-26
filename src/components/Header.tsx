import { Box } from "@mui/system"
import SearchBar from "./SearchBar"

const Header: React.FC<{ setSearchQuery: any }> = ({ setSearchQuery }) => {
  //todo: reformat how to set searchQuery
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h1>Giphy Selector</h1>
        <SearchBar setSearchQuery={setSearchQuery} />
      </Box>
    </Box>
  )
}
export default Header
