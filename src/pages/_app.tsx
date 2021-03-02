import { ThemeContextProvider } from '../contexts/ThemeContext';

function MyApp({ Component, pageProps }) {


  return (
    <ThemeContextProvider>
      <Component {...pageProps} />
    </ThemeContextProvider>
      
    )
}

export default MyApp
