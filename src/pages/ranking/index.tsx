import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components"
import { HeaderRanking } from "../../components/HeaderRanking";
import { RankingContent} from "../../components/RankingContent";
import { SideBar } from "../../components/SideBar";
import { ThemeContextLD } from "../../contexts/ThemeContext";
import GlobalStyled from '../../styles/global';

export default function Ranking() {
    const { theme } = useContext(ThemeContextLD);
    const router = useRouter();
    
    useEffect(() => {
        const cookieToken = Cookies.get('token');
        try {
            if (!cookieToken || cookieToken === '') {
                router.push('/login')
            }
        }
        catch (error) {
            console.log(error)
        }
    }, []);
    
    return(
        <ThemeProvider theme={theme}>
            <GlobalStyled/>

            <SideBar/>
            <Head>
                <title>Ranking | Move.it</title>
            </Head>
            
            <RankingContent/>
            
        </ThemeProvider>
        
    )
}