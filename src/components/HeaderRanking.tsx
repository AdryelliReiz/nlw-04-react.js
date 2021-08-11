import styles from '../styles/components/HeaderRanking.module.css';

export function HeaderRanking() {
    return(
        <div className={styles.header} >
            <h1>Leaderboard</h1>
            <div className={styles.details} >
                <div className={styles.subdetails} >
                    <p>POSIÇÃO</p>
                    <p>USUÁRIO</p>
                </div>
                <div className={styles.subdetails} >
                    <p>DESAFIOS</p>
                    <p>EXPERIÊNCIA</p>
                </div>
                
            </div>
        </div>
    )
}