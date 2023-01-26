import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const api_key = "5FoJPpL8icr9B00Dig8eRZmlE0rjPfHf"
  const searchQuery = req.query.searchQuery
  const result = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchQuery}&limit=25`
  )
  const data = await result.json()
  res.status(200).json(data)
}
