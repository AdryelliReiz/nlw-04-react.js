import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

interface UserData {
  username: string,
  completedChallenges: number,
  level: number,
  xp: number
}
interface IProfileProps {
    user: UserData
}

export function Profile({ user }: IProfileProps) {
    const { level } = useContext(ChallengesContext);

    return(
        <div className={styles.profileContainer}>
            <img src="icons/profile.svg" alt={user.username} />
            <div>
                <strong>{user.username}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                        Level {level}
                </p>
            </div>
        </div>
    )
}