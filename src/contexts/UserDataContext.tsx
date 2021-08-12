import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface UserDataContextData {
  user: UserData,
  setUser: Dispatch<SetStateAction<UserData>>
}

interface ChallengesProviderProps {
    children: ReactNode;
}

interface UserData {
  username: string,
  completedChallenges: string,
  level: string,
  xp: string
}

export const UserDataContext = createContext({} as UserDataContextData);

export function UserDataContextProvider({
    children
}: ChallengesProviderProps) {
  const userD = {
    username: "",
    completedChallenges: "0",
    level: "1",
    xp: "0"
  };
  const [user, setUser] = useState<UserData>(userD);

    return(
        <UserDataContext.Provider 
        value={{
          user,
          setUser
        }}>
          {children}
        </UserDataContext.Provider>
    )
}
