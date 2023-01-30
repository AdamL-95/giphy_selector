import { MultiResponse } from "giphy-api"

const getSearchData = async (
  searchQuery: string | string[],
  offset: string | string[]
): Promise<MultiResponse> => {
  const api_key = "5FoJPpL8icr9B00Dig8eRZmlE0rjPfHf"
  const result = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchQuery}&rating=g&limit=24&offset=${offset}`
  )
  const data = await result.json()
  return data
}

export default getSearchData
