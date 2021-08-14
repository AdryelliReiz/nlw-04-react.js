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

export function Profile({user}: IProfileProps) {

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