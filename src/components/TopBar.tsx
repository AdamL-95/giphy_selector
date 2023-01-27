import { AppBar, Toolbar } from "@mui/material"
import { useRouter } from "next/router"

const TopBar: React.FC = () => {
  const router = useRouter()

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <h4
          onClick={() => {
            router.push("/")
          }}
          style={{ cursor: "pointer" }}
        >
          Giphy Selector
        </h4>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
