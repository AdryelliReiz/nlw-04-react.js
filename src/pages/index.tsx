import { useCallback, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ReactLoading from 'react-loading';
import api from '../services/api';
import Cookies from 'js-cookie';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { ChallengeBox } from '../components/ChallengeBox';
import { SideBar } from '../components/SideBar';
import { Footer } from '../components/Footer';

import styles from '../styles/pages/Home.module.css';
import { ThemeProvider } from 'styled-components';
import GlobalStyled from '../styles/global';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { UserDataContext } from '../contexts/UserDataContext';
import { AuthenticateTokenContext } from '../contexts/AuthenticateTokenContext';
import { ThemeContextLD } from '../contexts/ThemeContext';


export default function Home() {
  const { token, setToken } = useContext(AuthenticateTokenContext);
  const router = useRouter();
  const { user, setUser } = useContext(UserDataContext);
  
  const [isLoading, setIsLoading] = useState(true);

  const { theme } = useContext(ThemeContextLD);

  const getUserData = useCallback(async () => {
    const cookieToken = Cookies.get('token');
    const data = await api.get("/user", {
      headers: {
        'Authorization': `token ${cookieToken}`
      }
    });

    const userData = {
      username: data.data.username,
      completedChallenges: data.data.completedChallenges,
      level: data.data.level,
      xp: data.data.xp
    }
    
    setUser(userData);
    setIsLoading(false);

  }, []);

  useEffect(() => {
    const cookieToken = Cookies.get('token');

    if (cookieToken !== '') {
      setToken(cookieToken);
    }
  }, []);

  useEffect(() => {
    const cookieToken = Cookies.get('token');
    try {
      if (!cookieToken || cookieToken === '') {
        router.push('/login')
      }
    
      getUserData();
    }
    catch (error) {
      console.log(error)
    }
  }, []);

  return (
    <ThemeProvider theme={theme} >
      <GlobalStyled/>

      <ChallengesProvider 
        level={user.level}
        currentExperience={user.xp}
        challengesCompleted={user.completedChallenges}
        >
        
        {isLoading
          ? (
            <div className={styles.loading} >
              <ReactLoading type={'bars'} color={"blue"} width={200} />
            </div>
           
          )
            : (
              <>
                <SideBar/>

                <div className={styles.container}>
                  <Head>
                    <title>Início | Move.it</title>
                  </Head>

                  
                  <ExperienceBar user={user} />

                  <CountdownProvider>
                    <section>
                      <div >
                        <Profile user={user} />
                        <CompletedChallenges user={user} />
                        <Countdown/>
                      </div>
                      <div>
                        <ChallengeBox/>
                      </div>
                    </section>
                  </CountdownProvider>
                  <Footer/>
                </div>  
              </>
          )
        }
      </ChallengesProvider>

    </ThemeProvider>
    
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {}
  }
}