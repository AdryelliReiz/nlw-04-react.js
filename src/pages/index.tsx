import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { ChallengeBox } from '../components/ChallengeBox';
import styles from '../styles/pages/Home.module.css';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { SideBar } from '../components/SideBar';
import { ThemeProvider} from 'styled-components';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ThemeContextLD } from '../contexts/ThemeContext';
import GlobalStyled from '../styles/global';
import { Footer } from '../components/Footer';
import { AuthenticateTokenContext } from '../contexts/AuthenticateTokenContext';
import { useRouter } from 'next/router';
import api from '../services/api';
import { UserDataContext } from '../contexts/UserDataContext';
import Cookies from 'js-cookie';


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

    if (cookieToken !== '' || !undefined) {
      setToken(cookieToken);
    }
  }, []);

  useEffect(() => {
    const cookieToken = Cookies.get('token');
    try {
      if (cookieToken == '') {
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
        level={parseInt(user.level)}
        currentExperience={parseInt(user.xp)}
        challengesCompleted={parseInt(user.completedChallenges)}
        >
        
        {isLoading
          ? (<p>Carregando...</p>)
            : (
              <>
                <SideBar/>

                <div className={styles.container}>
                  <Head>
                    <title>Início | Move.it</title>
                  </Head>

                  
                  <ExperienceBar/>

                  <CountdownProvider>
                    <section>
                      <div >
                        <Profile user={user} />
                        <CompletedChallenges/>
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