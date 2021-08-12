import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { UserDataContext } from '../contexts/UserDataContext';
import styles from '../styles/components/Profile.module.css'

interface UserData {
  username: string,
  completedChallenges: string,
  level: string,
  xp: string
}
interface IProfileProps {
    user: UserData
}

export function Profile({user}: IProfileProps) {
    const { level } = useContext(ChallengesContext);
    //const { user } = useContext(UserDataContext);

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/adryellireiz.png" alt={user.username} />
            <div>
                <strong>{user.username}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                        Level {user.level}
                </p>
            </div>
        </div>
    )
}