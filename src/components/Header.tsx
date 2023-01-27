import { Box } from "@mui/system"
import SearchBar from "./SearchBar"
import TopBar from "./TopBar"

const Header: React.FC = () => {
  return (
    <>
      <TopBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>The perfect GIF starts here</h1>
          <SearchBar />
        </Box>
      </Box>
    </>
  )
}
export default Header
