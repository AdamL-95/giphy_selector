const getRandomData = async () => {
  const api_key = "5FoJPpL8icr9B00Dig8eRZmlE0rjPfHf"
  const result = await fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${api_key}&rating=g`
  )
  const data = await result.json()
  return data
}

export default getRandomData
