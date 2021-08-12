import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

interface AuthenticateTokenContextData {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const AuthenticateTokenContext = createContext({} as AuthenticateTokenContextData);

export function AuthenticateTokenProvider({
    children
}: ChallengesProviderProps) {
  const [token, setToken] = useState('');

    return(
        <AuthenticateTokenContext.Provider 
        value={{
          token,
          setToken
        }}>
          {children}
        </AuthenticateTokenContext.Provider>
    )
}
