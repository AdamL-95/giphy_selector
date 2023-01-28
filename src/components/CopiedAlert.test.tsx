import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { act } from "react-dom/test-utils"
import CopiedAlert from "./CopiedAlert"

const mockHandleClose = jest.fn()

describe("CopiedAlert", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it("should open alert when passed as a prompt", () => {
    render(<CopiedAlert open={true} handleClose={mockHandleClose} />)
    expect(screen.queryByText("Link copied to clipboard")).toBeInTheDocument()
  })
  it("should automatically close after timeout", () => {
    render(<CopiedAlert open={true} handleClose={mockHandleClose} />)
    expect(screen.queryByText("Link copied to clipboard")).toBeInTheDocument()
    act(() => {
      jest.runAllTimers()
    })
    expect(mockHandleClose).toHaveBeenCalledTimes(1) //close handler is run
  })
  it("should not open alert when not given open prompt", () => {
    render(<CopiedAlert open={false} handleClose={mockHandleClose} />)
    expect(
      screen.queryByText("Link copied to clipboard")
    ).not.toBeInTheDocument()
  })
})
