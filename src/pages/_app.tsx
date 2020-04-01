import 'react-app-polyfill/ie11'
import 'core-js/features/array/find'
import 'core-js/features/array/find-index'
import 'core-js/features/array/includes'
import 'core-js/features/object/values'

import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
