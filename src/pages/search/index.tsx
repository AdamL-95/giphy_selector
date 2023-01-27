import CopiedAlert from "@/components/CopiedAlert"
import { default as Grid } from "@mui/material/Unstable_Grid2"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface gifData {
  url: any
  bitly_url: string
  images: { fixed_height: { mp4: string | undefined } }
}

const SearchResults: React.FC = () => {
  const [data, setData] = useState<gifData[]>([])
  const [isLoading, setLoading] = useState(false) // todo: properly render loading ticker
  const router = useRouter()
  const { searchQuery } = router.query
  const [alertOpen, setAlertOpen] = useState(false)

  const handleAlertClose = () => {
    setAlertOpen(false)
  }

  useEffect(() => {
    setLoading(true)
    if (searchQuery) {
      fetch(`/api/search?searchQuery=${searchQuery}`)
        .then((res) => res.json())
        .then((resJSON) => {
          setData(resJSON.data)
          setLoading(false)
        })
    } else {
      setData([])
    }
  }, [searchQuery])

  return (
    <>
      <h2>Showing results for {searchQuery}</h2>
      <CopiedAlert open={alertOpen} handleClose={handleAlertClose} />
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
