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
import { useContext } from 'react';
import { ThemeContextLD } from '../contexts/ThemeContext';
import GlobalStyled from '../styles/global';
import { Footer } from '../components/Footer';
import { useSession } from 'next-auth/client';
import axios from 'axios';


interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props : HomeProps) {
  const [session, loading] = useSession();

  

  const {theme} = useContext(ThemeContextLD);

  return (
    <ThemeProvider theme={theme} >
      <GlobalStyled/>
      <ChallengesProvider 
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
        >
        
        <SideBar/>

        <div className={styles.container}>
          <Head>
            <title>Início | Move.it</title>
          </Head>

          
          <ExperienceBar/>

          <CountdownProvider>
            <section>
              <div >
                <Profile />
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
      </ChallengesProvider>
    </ThemeProvider>
    
  )
}


export const getServerSideProps: GetServerSideProps = async(ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}