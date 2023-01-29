import { createTheme } from "@mui/material/styles"
import { red } from "@mui/material/colors"

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#19857b",
    },
    secondary: {
      main: "#3ed3c5",
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
