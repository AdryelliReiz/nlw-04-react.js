import { SessionContextProvider } from '../contexts/SessionContent';
import { ThemeContextProvider } from '../contexts/ThemeContext';

function MyApp({ Component, pageProps }) {


  return (
    <SessionContextProvider>
      <ThemeContextProvider>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </SessionContextProvider>
      
    )
}

export default MyApp
