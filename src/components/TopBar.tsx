import { AppBar, Toolbar } from "@mui/material"

const TopBar: React.FC = () => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <h6>Giphy Selector</h6>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
