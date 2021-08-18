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
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function Login() {
    const router = useRouter();
    const { theme } = useContext(ThemeContextLD);
    const { setToken } = useContext(AuthenticateTokenContext);
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
            const token = await api.post("/user/authenticate", {
                email: emailInput,
                password: passwordInput
            });

            if (token.status == 401) {
                throw new Error('Token does not exists!');
            }

            Cookies.set('token', token.data, { expires: 1 });
            setToken(token.data);
            
            router.push("/");
        } catch (error) {
            toast.error("Email / senha incorreto!", {
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
                        <p>Não possui uma conta? <strong><Link href="/register" >Registrar</Link></strong></p>
                    </div>
                    
                </div>
                <Toaster />
            </div>
        </ThemeProvider>
        
    )   
}