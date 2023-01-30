import { useRouter } from "next/router"
import { MultiResponse, GIFObject } from "giphy-api"
import useSWRInfinite from "swr/infinite"
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material"
import GifGrid from "@/components/GifGrid"
import getSearchData from "@/lib/getSearchData"
import { GetServerSideProps } from "next"

const SearchResults: React.FC<{ initialData?: MultiResponse[] }> = ({
  initialData,
}) => {
  const router = useRouter()
  const searchQuery = router.query.searchQuery as string

  const {
    data: gifResponse,
    error,
    size,
    setSize,
  } = useSWRInfinite(
    (index) => `/api/search?searchQuery=${searchQuery}&offset=${index * 24}`,
    { initialSize: 1, fallbackData: initialData }
  )

  // useSWRInfinite returns a list of MultiResponse objects. This concats
  // all of the responses to one list to be displayed on the screen
  const gifData: GIFObject[] = gifResponse
    ? new Array<GIFObject>().concat(...gifResponse.map((gifs) => gifs.data))
    : []
  const isLoadingInitialData = !gifResponse && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && gifResponse && typeof gifResponse[size - 1] === "undefined")
  const isEmpty = gifResponse?.[gifResponse.length - 1]?.data?.length === 0
  // API limit is reached if receiving a 429 response code
  const apiLimitReached =
    gifResponse?.[gifResponse.length - 1].meta.status === 429

  if (gifResponse?.[0].meta.status !== 200) {
    return (
      <>
        <Typography variant="h5" sx={{ py: 2 }}>
          Sorry, something went wrong with that search
        </Typography>
        <Typography variant="body1">{`Potential problem: ${gifResponse?.[0].meta.msg}`}</Typography>
      </>
    )
  }

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
      {apiLimitReached && (
        <Alert variant="filled" severity="error" sx={{ mt: 2 }}>
          API limit reached
        </Alert>
      )}
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
