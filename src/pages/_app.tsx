import Layout from "@/components/Layout"
import theme from "@/styles/theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Montserrat } from "@next/font/google"
import type { AppProps } from "next/app"
import { SWRConfig } from "swr"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SWRConfig>
    </>
  )
}
