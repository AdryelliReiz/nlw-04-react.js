import styles from '../styles/components/Profile.module.css'


export function Profile() {
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/adryellireiz.png" alt="Adryelli Reis" />
            <div>
                <strong>Adryelli Reis</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1    
                </p>
            </div>
        </div>
    )
}