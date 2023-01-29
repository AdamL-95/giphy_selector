import { useRouter } from "next/router"
import { MultiResponse, GIFObject } from "giphy-api"
import useSWRInfinite from "swr/infinite"
import { Box, Button, CircularProgress } from "@mui/material"
import GifGrid from "@/components/GifGrid"

const SearchResults: React.FC = () => {
  const router = useRouter()
  const { searchQuery } = router.query

  const { data, error, size, setSize } = useSWRInfinite<MultiResponse>(
    (index) => `/api/search?searchQuery=${searchQuery}&offset=${index * 24}`
  )

  const gifData: GIFObject[] = data
    ? new Array<GIFObject>().concat(...data.map((gifs) => gifs.data))
    : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = data?.[data.length - 1]?.data?.length === 0

  if (gifData.length === 0) {
    return <p>No results</p>
  }

  return (
    <>
      <h2>Showing results for {searchQuery}</h2>
      <GifGrid gifData={gifData} />
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
