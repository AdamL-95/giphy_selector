import CopiedAlert from "@/components/CopiedAlert"
import { default as Grid } from "@mui/material/Unstable_Grid2"
import { useRouter } from "next/router"
import { useState } from "react"
import { MultiResponse, GIFObject } from "giphy-api"
import useSWRInfinite from "swr/infinite"
import { Box, Button, CircularProgress } from "@mui/material"

const SearchResults: React.FC = () => {
  const router = useRouter()
  const { searchQuery } = router.query
  const [alertOpen, setAlertOpen] = useState(false)

  const handleAlertClose = () => {
    setAlertOpen(false)
  }

  const { data, error, size, setSize } = useSWRInfinite<MultiResponse>(
    (index) => `/api/search?searchQuery=${searchQuery}&offset=${index * 24}`
  )

  const GifData: GIFObject[] = data
    ? new Array<GIFObject>().concat(...data.map((gifs) => gifs.data))
    : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = data?.[data.length - 1]?.data?.length === 0

  if (GifData.length === 0) {
    return <p>No results</p>
  }

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
              key={`${gifObject.url}`}
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
                data-testid={`${gifObject.url}`}
              />
            </Grid>
          )
        })}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 3,
        }}
      >
        {isLoadingMore ? (
          <CircularProgress
            sx={{ justifyContent: "center", display: "flex" }}
          />
        ) : (
          <>
            {isEmpty ? (
              <p>no more results</p>
            ) : (
              <Button
                onClick={() => {
                  setSize(size + 1)
                }}
                variant="contained"
              >
                Load more
              </Button>
            )}
          </>
        )}
      </Box>
    </>
  )
}

export default SearchResults
