import { AppBar, Box, Toolbar } from "@mui/material"
import { useRouter } from "next/router"
import SearchBar from "./SearchBar"

const Header: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <h4
            onClick={() => {
              router.push("/")
            }}
            style={{ cursor: "pointer", marginRight: "1rem", flexGrow: 1 }}
          >
            Giphy Selector
          </h4>
          <Box
            sx={{
              justifyContent: "center",
              alignContent: "center",
              flexGrow: 1,
            }}
          >
            <SearchBar />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}
export default Header
