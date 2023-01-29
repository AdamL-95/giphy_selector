import CopiedAlert from "@/components/CopiedAlert"
import { default as Grid } from "@mui/material/Unstable_Grid2"
import { useRouter } from "next/router"
import { useState } from "react"
import { MultiResponse, GIFObject } from "giphy-api"
import useSWRInfinite from "swr/infinite"
import { Button } from "@mui/material"

const SearchResults: React.FC = () => {
  const router = useRouter()
  const { searchQuery } = router.query
  const [alertOpen, setAlertOpen] = useState(false)

  const handleAlertClose = () => {
    setAlertOpen(false)
  }

  const {
    data: newData,
    error,
    size,
    setSize,
  } = useSWRInfinite<MultiResponse>(
    (index) => `/api/search?searchQuery=${searchQuery}&offset=${index * 24}`
  )

  const GifData: GIFObject[] = newData
    ? new Array<GIFObject>().concat(...newData.map((gifs) => gifs.data))
    : []
  const isLoadingInitialData = !newData && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && newData && typeof newData[size - 1] === "undefined")
  const isEmpty = newData?.[0]?.data?.length === 0

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
      <Button
        onClick={() => {
          setSize(size + 1)
        }}
      >
        Load more
      </Button>
    </>
  )
}

export default SearchResults
