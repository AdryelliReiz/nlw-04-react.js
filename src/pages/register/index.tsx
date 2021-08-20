import styles from '../../styles/pages/Register.module.css';
import GlobalStyled from '../../styles/global';
import { ThemeProvider } from 'styled-components';
import { FormEvent, useContext, useState } from 'react';
import { ThemeContextLD } from '../../contexts/ThemeContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import api from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';


export default function Register() {
    const router = useRouter();
    const { theme } = useContext(ThemeContextLD);

    const [usernameInput, setUsernameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    
    async function handleSubmitRegister(event: FormEvent) {
        event.preventDefault();

        if (!usernameInput || !emailInput || !passwordInput) {
            toast.error("Campos invalidos", {
                icon: "❌",
                duration: 5000,
                position: "bottom-right",
                style: {
                    fontSize: '18px',
                    background: '#fefefe',
                    border: '3px solid #e83f5b',
                    borderRadius: '10px'
                }
            });
            return
        }

        try {
            await api.post("/user", {
                username: usernameInput,
                email: emailInput,
                password: passwordInput
            });

            router.push("/login")
        } catch (err) {
            toast.error("Erro ao cadastrar!", {
                icon: "❌",
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

    return (
      <ThemeProvider theme= { theme } >
        <GlobalStyled/>
            <div className={styles.main} >

                <Head>
                    <title>Register | Movei.t</title>
                </Head>

                <img className={styles.background} src="icons/Simbolo.png" alt="Logo-Background"/>

                <div className={styles.container} >
                    <div className={styles.welcome} >
                        <img src="icons/logo-full.png" alt="Logo Move.it" />

                        <h1>Cadastre-se</h1>

                        <form
                            className={styles.formRegister}
                            onSubmit={(event) => handleSubmitRegister(event)}
                        >
                            <input
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                placeholder="Username"
                            />
                            <input
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                type="email"
                                placeholder="Email"
                            />
                            <input
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                type="password"
                                placeholder="Senha"
                                maxLength={8}
                            />

                            <button>Cadastrar</button>
                        </form>
                        <p>Possui uma conta? <strong><Link href="/login" >Fazer Login</Link></strong></p>
                    </div>
                    
                </div>
                <Toaster />
            </div>
      </ThemeProvider>
    )  
}