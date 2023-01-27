import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  TextField,
} from "@mui/material"
import { useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import { useRouter } from "next/router"

const SearchBar: React.FC = () => {
  const [textFieldValue, setTextFieldValue] = useState("")
  const router = useRouter()

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        width: 300,
      }}
    >
      <InputBase
        placeholder="Search for a GIF"
        sx={{ flex: 1, ml: 1 }}
        value={textFieldValue}
        onChange={(event) => {
          setTextFieldValue(event.target.value)
        }}
      />
      <IconButton
        type="button"
        aria-label="search"
        onClick={() => {
          router.push(`/search?searchQuery=${textFieldValue}`)
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
