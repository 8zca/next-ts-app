import 'react-app-polyfill/ie11'
import 'core-js/features/array/find'
import 'core-js/features/array/find-index'
import 'core-js/features/array/includes'
import 'core-js/features/object/values'

import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { createStore } from '@/state/store'

const store = createStore()

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
