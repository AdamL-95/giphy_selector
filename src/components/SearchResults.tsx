import Image from "next/image"
import { useEffect, useState } from "react"

const SearchResults: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (searchQuery) {
      fetch(`/api/search?searchQuery=${searchQuery}`)
        .then((res) => res.json())
        .then((resJSON) => {
          console.log(resJSON.data)
          setData(resJSON.data)
          setLoading(false)
        })
      //   const response = await fetch(`/api/search?searchQuery=${searchQuery}`);
      //   const data = await response.json();
    }
  }, [searchQuery])

  return (
    <div>
      {data.map((gifObject) => {
        return (
          <Image
            src={gifObject.images.fixed_width.url}
            alt="searchResult"
            key={gifObject.url}
            width={100}
            height={100}
          />
        )
      })}
    </div>
  )
}

export default SearchResults
