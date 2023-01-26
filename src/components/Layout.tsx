import React from "react"
import Header from "./Header"
import { Inter } from "@next/font/google"
import { Container } from "@mui/material"

const inter = Inter({ subsets: ["latin"] })

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Container maxWidth="lg" className={inter.className}>
      <Header />
      {children}
    </Container>
  )
}

export default Layout
