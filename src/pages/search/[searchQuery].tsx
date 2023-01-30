import { useRouter } from "next/router"
import { MultiResponse, GIFObject } from "giphy-api"
import useSWRInfinite from "swr/infinite"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import GifGrid from "@/components/GifGrid"
import getSearchData from "@/lib/getSearchData"
import { GetServerSideProps } from "next"

const SearchResults: React.FC<{ initialData?: MultiResponse[] }> = ({
  initialData,
}) => {
  const router = useRouter()
  const searchQuery = router.query.searchQuery as string

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `/api/search?searchQuery=${searchQuery}&offset=${index * 24}`,
    { initialSize: 1, fallbackData: initialData }
  )

  // useSWRInfinite returns a list of MultiResponse objects. This concats
  // all of the responses to one list to be displayed on the screen
  const gifData: GIFObject[] = data
    ? new Array<GIFObject>().concat(...data.map((gifs) => gifs.data))
    : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = data?.[data.length - 1]?.data?.length === 0

  // Using server side props for the initial data stops this from
  // rendering on initial load of a search
  if (gifData.length === 0) {
    return (
      <Typography variant="h5" sx={{ py: 2 }}>
        {`No Results found for "${searchQuery}"`}
      </Typography>
    )
  }

  return (
    <>
      <Typography
        variant="h5"
        sx={{ py: 2 }}
      >{`Showing results for "${searchQuery}"`}</Typography>
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
              <Typography variant="body1">no more results </Typography>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchQuery = context.query.searchQuery as string
  const SearchRes = await getSearchData(searchQuery, "0")
  return { props: { initialData: [SearchRes] } }
}

export default SearchResults
