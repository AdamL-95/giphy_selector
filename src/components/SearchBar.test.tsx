import { fireEvent, render, screen } from "@testing-library/react"
import { act, Simulate } from "react-dom/test-utils"
import SearchBar from "./SearchBar"
const routerPush = jest.fn()

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: routerPush,
    }
  },
}))

describe("SearchBar", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("should change route when pressing enter key", () => {
    render(<SearchBar />)
    const searchInput = screen.getByTestId("searchInput")
    fireEvent.change(searchInput, { target: { value: "keypress" } })
    fireEvent.keyDown(searchInput, { key: "Enter" })
    expect(routerPush).toHaveBeenCalledTimes(1)
    expect(routerPush).toHaveBeenCalledWith("/search?searchQuery=keypress")
  })
  it("should change route when pressing search button key", () => {
    render(<SearchBar />)
    const searchInput = screen.getByTestId("searchInput")
    fireEvent.change(searchInput, { target: { value: "click" } })
    fireEvent.click(screen.getByTestId("searchButton"))
    expect(routerPush).toHaveBeenCalledTimes(1)
    expect(routerPush).toHaveBeenCalledWith("/search?searchQuery=click")
  })
})
