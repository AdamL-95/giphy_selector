import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material"
import { useRouter } from "next/router"
import SearchBar from "./SearchBar"

const Header: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar style={{ padding: 0 }}>
            <Typography
              variant="body1"
              onClick={() => {
                router.push("/")
              }}
              sx={{ cursor: "pointer", marginRight: "1rem", flexGrow: 1 }}
            >
              Giphy Selector
            </Typography>
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
