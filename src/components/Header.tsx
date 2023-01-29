import { AppBar, Box, Container, Toolbar } from "@mui/material"
import { useRouter } from "next/router"
import SearchBar from "./SearchBar"

const Header: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar style={{ padding: 0 }}>
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
              }}
            >
              <SearchBar />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
export default Header
