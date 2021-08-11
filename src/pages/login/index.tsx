import styles from '../../styles/pages/Login.module.css';
import GlobalStyled from '../../styles/global';
import { ThemeProvider } from 'styled-components';
import { FormEvent, useContext } from 'react';
import { ThemeContextLD } from '../../contexts/ThemeContext';
import Head from 'next/head';


export default function Login() {
    const { theme } = useContext(ThemeContextLD);
    
    async function handleSubmitLogin(event: FormEvent) {
        event.preventDefault();
    }

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

                        <form
                            className={styles.formLogin}
                            onSubmit={() => handleSubmitLogin}
                        >
                            <input
                                placeholder="Email"
                            />
                            <input
                                placeholder="Senha"
                            />

                            <button>Login</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </ThemeProvider>
        
    )   
}