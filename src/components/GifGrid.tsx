import { Grid, Popover, Typography } from "@mui/material"
import { GIFObject } from "giphy-api"
import { useState } from "react"

const GifGrid: React.FC<{ gifData: GIFObject[]; columns?: number[] }> = ({
  gifData,
  columns = [1, 2, 3, 4],
}) => {
  const [anchorElement, setAnchorElement] = useState<HTMLVideoElement | null>(
    null
  )

  const handleClick = (
    event: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    setAnchorElement(event.currentTarget)
    setTimeout(() => {
      handleClose()
    }, 1000)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  const open = Boolean(anchorElement)
  const id = open ? "simple-popover" : undefined

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorElement}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>Copied to clipboard</Typography>
      </Popover>{" "}
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
                onClick={(event) => {
                  navigator.clipboard.writeText(gifObject.bitly_url)
                  handleClick(event)
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
