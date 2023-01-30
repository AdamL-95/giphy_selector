import { Grid } from "@mui/material"
import { GIFObject } from "giphy-api"
import { useState } from "react"
import CopiedAlert from "./CopiedAlert"

const GifGrid: React.FC<{ gifData: GIFObject[]; columns?: number[] }> = ({
  gifData,
  columns = [1, 2, 3, 4],
}) => {
  const [alertOpen, setAlertOpen] = useState(false)

  const handleAlertClose = () => {
    setAlertOpen(false)
  }

  return (
    <>
      <CopiedAlert open={alertOpen} handleClose={handleAlertClose} />
      <Grid container spacing={2} rowGap={2} columns={columns}>
        {gifData.map((gifObject) => {
          return (
            <Grid
              xs={1}
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
    </>
  )
}

export default GifGrid
