import { fireEvent, render, screen } from "@testing-library/react"
import SearchResults from "."
import mockSearchData from "./mockSearchData"
import "@testing-library/jest-dom"

const swr = require("swr")

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: "searchQeury",
    }
  },
}))

describe("SearchPage", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: () => {},
    },
  })

  it("should render all data images from api call", () => {
    const swrSpy = jest
      .spyOn(swr, "default")
      .mockImplementation(() => mockSearchData)
    render(<SearchResults />)
    expect(
      screen.getByTestId("https://giphy.com/gifs/test-gw3IWyGkC0rsazTi")
    ).toBeInTheDocument()
    expect(swrSpy).toHaveBeenCalledTimes(1)
  })
  it("should copy GIF url to clipboard when GIF is clicked and show alert", () => {
    jest.spyOn(swr, "default").mockImplementation(() => mockSearchData)
    const clipboardSpy = jest.spyOn(navigator.clipboard, "writeText")
    render(<SearchResults />)
    const gifItem = screen.getByTestId(
      "https://giphy.com/gifs/test-gw3IWyGkC0rsazTi"
    )
    fireEvent.click(gifItem)
    expect(clipboardSpy).toHaveBeenCalledTimes(1)
    expect(clipboardSpy).toHaveBeenCalledWith("http://gph.is/SkI3MM")
    expect(screen.queryByText("Link copied to clipboard")).toBeInTheDocument()
  })
})
