import Header from "@/components/Header"
import { fireEvent, render, screen } from "@testing-library/react"

const routerPush = jest.fn()

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: routerPush,
    }
  },
}))

describe("Header", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("should render link", () => {
    render(<Header />)
    const homeLink = screen.getByText("Giphy Selector")
    fireEvent.click(homeLink)
    expect(routerPush).toHaveBeenCalledTimes(1)
    expect(routerPush).toHaveBeenCalledWith("/")
  })
})
