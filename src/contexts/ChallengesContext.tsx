import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import api from '../services/api';
import { LevelUpModal } from '../components/LevelUpModal';
import Cookies from 'js-cookie';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;

}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experience: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [experience, setExperience] = useState(rest.experience);

    const experienceToNextLevel = Math.pow((level + 1 ) * 4, 2);

    const cookieToken = Cookies.get('token');

    useEffect(()=>{
       Notification.requestPermission() 
    },[])

    async function levelUp() {

        const upLevel = level + 1;

        const levelUpdated = await api.put('/user/level', {
            level: upLevel
        }, {
            headers: {
                'Authorization': `token ${cookieToken}`
            }
        });

        setLevel(levelUpdated.data.level);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengesIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    async function completeChallenge() {
        if(!activeChallenge) {
            return;
        }

        const  { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        await api.put("/user/current-xp", {
            currentXP:finalExperience
        }, {
            headers: {
                'Authorization': `token ${cookieToken}`
            }
        });
        
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;

            await api.put("/user/current-xp", {
                currentXP: finalExperience
            }, {
                headers: {
                    'Authorization': `token ${cookieToken}`
                }
            });

            levelUp();
        }

        const updateExperience = experience + amount;
        const experienceUpdated = await api.put("/user/xp", {
            xp: updateExperience
        }, {
            headers: {
                'Authorization': `token ${cookieToken}`
            }
        });

        await api.put("/user/completed-challenges", {
            completedChallenges: challengesCompleted + 1
        }, {
            headers: {
                'Authorization': `token ${cookieToken}`
            }
        });
        setExperience(experienceUpdated.data.currentXP);
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return(
        <ChallengesContext.Provider 
        value={{
                level,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal
                
            }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )
}
