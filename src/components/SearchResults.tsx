import { default as Grid } from "@mui/material/Unstable_Grid2"
import { useEffect, useState } from "react"

const SearchResults: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (searchQuery) {
      fetch(`/api/search?searchQuery=${searchQuery}`)
        .then((res) => res.json())
        .then((resJSON) => {
          setData(resJSON.data)
          setLoading(false)
          console.log(resJSON.data)
        })
    }
  }, [searchQuery])

  return (
    <Grid container spacing={2}>
      {data.map((gifObject) => {
        return (
          <Grid
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={`grid_${gifObject.url}`}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <video
              autoPlay
              onClick={() => {
                navigator.clipboard.writeText(gifObject.bitly_url)
              }}
              loop
              muted
              playsInline
              src={gifObject.images.fixed_height.mp4}
              style={{ maxWidth: 270, cursor: "pointer" }}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default SearchResults
