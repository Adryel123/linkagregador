import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../contexts/authContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp