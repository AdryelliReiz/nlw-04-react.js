import styles from '../../styles/pages/Login.module.css';
import GlobalStyled from '../../styles/global';
import { ThemeProvider } from 'styled-components';
import { useContext } from 'react';
import { ThemeContextLD } from '../../contexts/ThemeContext';
import Head from 'next/head';


export default function Login() {
    const {theme} = useContext(ThemeContextLD);

    return(
        <ThemeProvider theme={theme}>
            <GlobalStyled/>
            <div className={styles.main} >

                <Head>
                    <title>Login | Movei.t</title>
                </Head>

                <img className={styles.background} src="icons/Simbolo.png" alt="Logo-Background"/>

                <div className={styles.container} >
                    <div className={styles.welcome} >
                        <img src="icons/logo-full.png" alt="Logo Move.it" />

                        <h1>Bem-vindo</h1>
                        <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=45713ba705ca0bf0d401">
                            <div className={styles.githubLogin} >
                                <img src="icons/Github.svg" alt="Github" />
                                <p>Faça login com seu Github</p>
                            </div>
                        </a>
                        

                        <div className={styles.inputLogin} >
                            <input type="text" placeholder="Digite seu username" />
                            <button><img src="icons/seta.svg" /></button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </ThemeProvider>
        
    )   
}