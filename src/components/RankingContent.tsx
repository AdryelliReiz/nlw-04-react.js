import styles from '../styles/components/RankingContent.module.css';
import { HeaderRanking } from './HeaderRanking';
import { Profile } from './Profile';

export function RankingContent() {
    return(
        <div className={styles.container} >
            <HeaderRanking/>
            <div className={styles.ranking} >
                
                <div className={styles.user} >
                    <div className={styles.position} >
                        <h1>1</h1>
                    </div>
                    
                    <div className={styles.profile} >
                        
                       <img src="https://github.com/adryellireiz.png" />
                       <div>
                            <strong>Adryelli Reis</strong>
                            <p>
                                <img src="icons/level.svg" alt="Level" />
                                    Level 6
                            </p>
                        </div>
                    </div>
                    <div className={styles.details} >
                        <p><strong>31</strong> completados</p>
                        <p><strong>3360</strong> xp</p>
                    </div>
                    
                </div>
                <div className={styles.user} >
                    <div className={styles.position} >
                        <h1>2</h1>
                    </div>
                    
                    <div className={styles.profile} >
                        
                       <img src="https://github.com/adryellireiz.png" />
                       <div>
                            <strong>Adryelli Reis</strong>
                            <p>
                                <img src="icons/level.svg" alt="Level" />
                                    Level 4
                            </p>
                        </div>
                    </div>
                    <div className={styles.details} >
                        <p><strong>28</strong> completados</p>
                        <p><strong>3090</strong> xp</p>
                    </div>
                    
                </div>
                <div className={styles.user} >
                    <div className={styles.position} >
                        <h1>3</h1>
                    </div>
                    
                    <div className={styles.profile} >
                        
                       <img src="https://github.com/adryellireiz.png" />
                       <div>
                            <strong>Adryelli Reis</strong>
                            <p>
                                <img src="icons/level.svg" alt="Level" />
                                    Level 3
                            </p>
                        </div>
                    </div>
                    <div className={styles.details} >
                        <p><strong>22</strong> completados</p>
                        <p><strong>2510</strong> xp</p>
                    </div>
                    
                </div>
                <div className={styles.user} >
                    <div className={styles.position} >
                        <h1>4</h1>
                    </div>
                    
                    <div className={styles.profile} >
                        
                       <img src="https://github.com/adryellireiz.png" />
                       <div>
                            <strong>Adryelli Reis</strong>
                            <p>
                                <img src="icons/level.svg" alt="Level" />
                                    Level 3
                            </p>
                        </div>
                    </div>
                    <div className={styles.details} >
                        <p><strong>19</strong> completados</p>
                        <p><strong>1860</strong> xp</p>
                    </div>
                    
                </div>

                
            </div>
        </div>
    )
}