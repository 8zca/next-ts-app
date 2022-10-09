import 'react-app-polyfill/ie11'
import 'core-js/features/array/find'
import 'core-js/features/array/find-index'
import 'core-js/features/array/includes'
import 'core-js/features/object/values'

import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { createStore } from '@/state/store'
import theme from '@/styles/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// css
import 'sanitize.css'
import '@/styles/styles.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60
    }
  }
})

const store = createStore()

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
