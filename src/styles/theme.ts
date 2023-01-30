import { createTheme } from "@mui/material/styles"
import { red } from "@mui/material/colors"
import { Roboto_Flex } from "@next/font/google"
const montserrat = Roboto_Flex({ subsets: ["latin"] })

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
  typography: { fontFamily: `${montserrat.style.fontFamily}` },
})

export default theme
