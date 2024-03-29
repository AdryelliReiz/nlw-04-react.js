import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";
import api from "../services/api";
import styles from "../styles/components/RankingContent.module.css";
import { HeaderRanking } from "./HeaderRanking";

interface UserRanking {
  id: number;
  username: string;
  level: number;
  xp: number;
  completedChallenges: number;
}

export function RankingContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [usersRanking, setUsersRanking] = useState<UserRanking[]>([]);

  const getUsersRankingData = useCallback(async () => {
    const cookieToken = Cookies.get("token");
    const data = await api.get("/users/ranking", {
      headers: {
        Authorization: `token ${cookieToken}`,
      },
    });

    setUsersRanking(data.data);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    try {
      if (cookieToken == "") {
        router.push("/login");
      }

      getUsersRankingData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className={styles.container}>
      <HeaderRanking />

      {isLoading ? (
        <div className={styles.loading}>
          <ReactLoading type={'bars'} color={"blue"} width={200} />
        </div>
      ) : (
        <div className={styles.ranking}>
          {usersRanking.map((user, index) => (
            <div className={styles.user} key={user.id} >
              <div className={styles.position}>
                <h1>{index + 1}</h1>
              </div>

              <div className={styles.profile}>
                <img src="icons/profile.svg" />
                <div>
                  <strong>{user.username}</strong>
                  <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {user.level}
                  </p>
                </div>
              </div>
              <div className={styles.details}>
                <p>
                  <strong>{user.completedChallenges}</strong> completados
                </p>
                <p>
                  <strong>{user.xp}</strong> xp
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
