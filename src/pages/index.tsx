import { Box, Typography } from "@mui/material"
import Head from "next/head"
import { GIFObject } from "giphy-api"
import GifGrid from "@/components/GifGrid"
import getRandomData from "@/lib/getRandomData"
import { GetServerSideProps } from "next"

const Home: React.FC<{ data: GIFObject[] }> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Giphy Selector</title>
        <meta name="description" content="Search for GIFs using Giphy" />
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

        <Typography variant="h4">How to use this site</Typography>
        <Box sx={{ pt: 4 }}>
          <Typography variant="h6">step 1: </Typography>
          <Typography variant="body1">
            use the search bar in the header to get a list of GIFs
          </Typography>
        </Box>
        <Box sx={{ pt: 4 }}>
          <Typography variant="h6">step 2: </Typography>
          <Typography variant="body1">
            {
              "Once you've found you're perfect gif, click on it to copy it to your clipboard"
            }
          </Typography>
        </Box>
        <Box sx={{ pt: 4 }}>
          <Typography variant="h6">step 3: </Typography>
          <Typography variant="body1">
            Copy the GIF to any messaging app{" "}
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ py: 5 }}>
          {"Need inspriation? Here's a few random GIFs to get you started"}
        </Typography>
        <GifGrid gifData={data} columns={[1, 2, 3]} />
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let homeGifs = []
  for (let i = 0; i < 3; i++) {
    const randomGif = await getRandomData()
    homeGifs.push(randomGif.data)
  }

  return { props: { data: homeGifs } }
}

export default Home
