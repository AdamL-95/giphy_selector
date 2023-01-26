import { default as Grid } from "@mui/material/Unstable_Grid2/Grid2"
import Image from "next/image"
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
        })
      //   const response = await fetch(`/api/search?searchQuery=${searchQuery}`);
      //   const data = await response.json();
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
              loop
              muted
              playsInline
              src={gifObject.images.original.mp4}
              style={{ height: 150 }}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default SearchResults
