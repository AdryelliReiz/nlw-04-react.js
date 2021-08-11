import axios from 'axios';
import { useSession,signIn } from 'next-auth/client';


import { createContext, ReactNode} from 'react';

interface SessionContextProps {
    children: ReactNode
}

interface SessionContextData {
    SessionLogin: () => void;
}

export const SessionContext = createContext({} as SessionContextData);

export function SessionContextProvider({children} : SessionContextProps) {
    const [session, loading] = useSession();

    function SessionLogin() {
        signIn()
        if(session) {
            const {user} = session;
            axios.post('/api/session', {user})
            
        }

    }
    return (
        <SessionContext.Provider value={{
            SessionLogin,
        }} >
            {children}
        </SessionContext.Provider>
    )
}