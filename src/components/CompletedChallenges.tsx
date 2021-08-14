import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

interface UserData {
  username: string,
  completedChallenges: number,
  level: number,
  xp: number
}
interface ICompletedChallengesProps {
    user: UserData
}

export function CompletedChallenges({user}: ICompletedChallengesProps) {
    //const { challengesCompleted } = useContext(ChallengesContext);

    return(
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{user.completedChallenges}</span>
        </div>
    )
}