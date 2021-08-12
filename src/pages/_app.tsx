import { AuthenticateTokenProvider } from '../contexts/AuthenticateTokenContext';
import { ThemeContextProvider } from '../contexts/ThemeContext';

function MyApp({ Component, pageProps }) {


  return (
    <ThemeContextProvider>
      <AuthenticateTokenProvider>
        <Component {...pageProps} />
      </AuthenticateTokenProvider>
    </ThemeContextProvider>
      
    )
}

export default MyApp
