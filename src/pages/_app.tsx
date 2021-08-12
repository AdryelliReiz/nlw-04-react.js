import { AuthenticateTokenProvider } from '../contexts/AuthenticateTokenContext';
import { ThemeContextProvider } from '../contexts/ThemeContext';
import { UserDataContextProvider } from '../contexts/UserDataContext';

function MyApp({ Component, pageProps }) {


  return (
    <ThemeContextProvider>
      <AuthenticateTokenProvider>
        <UserDataContextProvider>
          <Component {...pageProps} />
        </UserDataContextProvider>
      </AuthenticateTokenProvider>
    </ThemeContextProvider>
      
    )
}

export default MyApp
