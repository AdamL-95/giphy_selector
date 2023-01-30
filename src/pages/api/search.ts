import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api_key = "5FoJPpL8icr9B00Dig8eRZmlE0rjPfHf"
  const { searchQuery, offset } = req.query
  const result = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchQuery}&rating=g&limit=24&offset=${offset}`
  )
  const data = await result.json()

  res.status(data.meta.status).json(data)
}
