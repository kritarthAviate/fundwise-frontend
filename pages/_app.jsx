import AppLayout from '@/src/components/AppLayout'
import { BaseProvider } from '@/src/context/BaseContext'
import '@/styles/globals.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Head from 'next/head'

import { createTheme, ThemeProvider } from '@mui/material'

// Create a custom theme

const theme = createTheme({
  palette: {
    primary: {
      main: '#BEB9B9', // Replace with your desired primary color
    },
    secondary: {
      main: '#beb9b963',
      light: '#beb9b963',
      dark: '#beb9b963', // Replace with your desired secondary color
    },
    // Add more color configurations as needed
  },
})

export default function App({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BaseProvider>
          <Head>
            <title>Fund Wise</title>
          </Head>
          <AppLayout Component={Component} pageProps={pageProps} />
        </BaseProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
