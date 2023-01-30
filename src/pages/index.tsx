import { Box, Typography } from "@mui/material"
import Head from "next/head"
import { GIFObject } from "giphy-api"
import GifGrid from "@/components/GifGrid"

const Home: React.FC<{ data: GIFObject[] }> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{ textAlign: "center", my: 5 }}
        >
          Find your perfect GIF
        </Typography>

        <Typography variant="h4">How to use this site:</Typography>
        <Box>
          <Typography variant="h6">step 1: </Typography>
          <Typography variant="body1">
            use the search bar in the header to get a list of GIFs
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">step 2: </Typography>
          <Typography variant="body1">
            {
              "Once you've found you're perfect gif, click on it to copy it to your clipboard"
            }
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">step 3: </Typography>
          <Typography variant="body1">
            Copy the GIF to any messaging app{" "}
          </Typography>
        </Box>

        <h3>Happy GIFing!</h3>
      </Box>
      <GifGrid gifData={data} columns={[1, 2, 3]} />
    </>
  )
}

export const getStaticProps = async () => {
  let homeGifs = []
  const api_key = "5FoJPpL8icr9B00Dig8eRZmlE0rjPfHf"
  for (let i = 0; i < 3; i++) {
    const result = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${api_key}&rating=g`
    )
    const data = await result.json()
    homeGifs.push(data.data)
  }

  return { props: { data: homeGifs } }
}

export default Home
