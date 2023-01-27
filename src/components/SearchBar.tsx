import { IconButton, InputBase, Paper } from "@mui/material"
import { useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import { useRouter } from "next/router"

const SearchBar: React.FC = () => {
  const [textFieldValue, setTextFieldValue] = useState("")
  const router = useRouter()
  const handleSubmitSearch = () => {
    router.push(`/search?searchQuery=${textFieldValue}`)
  }

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        width: [300, 400, 500, 600],
        flexGrow: 1,
      }}
    >
      <InputBase
        placeholder="Search for a GIF"
        sx={{ flex: 1, ml: 1 }}
        value={textFieldValue}
        onChange={(event) => {
          setTextFieldValue(event.target.value)
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSubmitSearch()
          }
        }}
      />
      <IconButton
        type="button"
        aria-label="search"
        onClick={handleSubmitSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
