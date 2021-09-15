import type { AppProps/*, AppContext */  } from 'next/app'
import { MusicProvider } from './Context/MusicProvider'

function MyApp({ Component, pageProps}: AppProps) {
  return (
    <>
      <MusicProvider>
        <Component {...pageProps} />
      </MusicProvider>
    </>
  )
}

export default MyApp
