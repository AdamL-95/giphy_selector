import CopiedAlert from "@/components/CopiedAlert"
import { default as Grid } from "@mui/material/Unstable_Grid2"
import { useRouter } from "next/router"
import { useState } from "react"
import { MultiResponse } from "giphy-api"
import useSWR from "swr"

const SearchResults: React.FC = () => {
  const router = useRouter()
  const { searchQuery } = router.query
  const [alertOpen, setAlertOpen] = useState(false)

  const handleAlertClose = () => {
    setAlertOpen(false)
  }

  const { data: searchRes } = useSWR<MultiResponse>(
    `/api/search?searchQuery=${searchQuery}`
  )
  const GifData = searchRes?.data || []

  return (
    <>
      <h2>Showing results for {searchQuery}</h2>
      <CopiedAlert open={alertOpen} handleClose={handleAlertClose} />
      <Grid container spacing={2}>
        {GifData.map((gifObject) => {
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
                  setAlertOpen(true)
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
    </>
  )
}

export default SearchResults
