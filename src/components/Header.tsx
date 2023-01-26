import { Box } from "@mui/system"
import SearchBar from "./SearchBar"

const Header: React.FC = () => {
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
        <SearchBar />
      </Box>
    </Box>
  )
}
export default Header
