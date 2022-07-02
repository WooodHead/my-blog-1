import Link from 'next/link'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav>
        <ul>
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/"><a>About</a></Link></li>
        </ul>
      </nav>

      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
