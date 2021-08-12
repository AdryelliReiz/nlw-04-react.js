import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import {useCallback, useContext, useEffect, useState } from 'react';
import { AuthenticateTokenContext } from '../contexts/AuthenticateTokenContext';
import api from '../services/api';
import styles from '../styles/components/RankingContent.module.css';
import { HeaderRanking } from './HeaderRanking';

interface UserRanking {
    id: number;
    username: string;
    email: string
    password: string;
    completedChallenges: string;
    level: string;
    xp: number;
}

export function RankingContent() {
    const router = useRouter();
    const { token, setToken } = useContext(AuthenticateTokenContext);
    const [isLoading, setIsLoading] = useState(true);
    const [usersRanking, setUsersRanking] = useState<UserRanking[]>([]);

    const getUsersRankingData = useCallback(async () => {
        const cookieToken = Cookies.get('token');
        const data = await api.get("/users/ranking", {
        headers: {
            'Authorization': `token ${cookieToken}`
        }
        });
            
        setUsersRanking(data.data);
        
        setIsLoading(false);

    }, []);

  useEffect(() => {
    const cookieToken = Cookies.get('token');
    try {
      if (cookieToken == '') {
        router.push('/login')
      }
    
        getUsersRankingData();
    }
    catch (error) {
      console.log(error)
    }
  }, []);
    return(
        <div className={styles.container} >
            <HeaderRanking />
            
            {isLoading
                ? (
                    <p>Carregando...</p>
                ) : (
                    <div className={styles.ranking} >
                        {usersRanking.map((user, index) => (
                        <div className={styles.user} >
                            <div className={styles.position} >
                                    <h1>{index + 1}</h1>
                            </div>
                            
                            <div className={styles.profile} >
                                
                            <img src="https://github.com/adryellireiz.png" />
                            <div>
                                    <strong>{user.username}</strong>
                                    <p>
                                        <img src="icons/level.svg" alt="Level" />
                                            Level {user.level}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.details} >
                                <p><strong>{user.completedChallenges}</strong> completados</p>
                                <p><strong>{user.xp}</strong> xp</p>
                            </div>
                            
                        </div>
                        ))}
                    </div>
                )
            }
            
        </div>
    )
}