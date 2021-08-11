import Head from "next/head";
import { useContext } from "react";
import { ThemeProvider } from "styled-components"
import { HeaderRanking } from "../../components/HeaderRanking";
import { RankingContent} from "../../components/RankingContent";
import { SideBar } from "../../components/SideBar";
import { ThemeContextLD } from "../../contexts/ThemeContext";
import GlobalStyled from '../../styles/global';

export default function Ranking() {
    const {theme} = useContext(ThemeContextLD);
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