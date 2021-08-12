import { FormEvent, useContext, useState } from 'react';
import styles from '../../styles/pages/Login.module.css';
import GlobalStyled from '../../styles/global';
import { ThemeProvider } from 'styled-components';
import { ThemeContextLD } from '../../contexts/ThemeContext';
import { AuthenticateTokenContext } from '../../contexts/AuthenticateTokenContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import api from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const router = useRouter();
    const { theme } = useContext(ThemeContextLD);
    const { token, setToken } = useContext(AuthenticateTokenContext);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    
    async function handleSubmitLogin(event: FormEvent) {
        event.preventDefault();

        if (!emailInput || !passwordInput) {
            toast.error("Campos invalidos", {
                icon: "",
                duration: 5000,
                position: "bottom-right",
                style: {
                    fontSize: '18px',
                    background: '#fefefe',
                    border: '3px solid #e83f5b',
                    borderRadius: '10px'
                }
            });
            return;
        }

        try {
            const tokenAPI = await api.post("/user/authenticate", {
                email: emailInput,
                password: passwordInput
            });

            setToken(tokenAPI.data);
            
            router.push("/");
        } catch (error) {
            toast.error("Erro ao fazer login!", {
                icon: "",
                duration: 5000,
                position: "bottom-right",
                style: {
                    fontSize: '18px',
                    background: '#fefefe',
                    border: '3px solid #e83f5b',
                    borderRadius: '10px'
                }
            });
            return;
        }
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
                            onSubmit={(event) => handleSubmitLogin(event)}
                        >
                            <input
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                placeholder="Email"
                                type="email"
                            />
                            <input
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="Senha"
                                type="password"
                                maxLength={8}
                            />

                            <button>Login</button>
                        </form>
                    </div>
                    
                </div>
                <Toaster />
            </div>
        </ThemeProvider>
        
    )   
}