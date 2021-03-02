import { createContext, ReactNode} from "react";

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import usePersistedState from "../utils/usePersistedeState";
import {DefaultTheme} from 'styled-components';

interface ThemeContextProps {
    children: ReactNode;
}

interface ThemeContextData {
    toggleTheme: () => void;
    theme: object;
}

export const ThemeContextLD = createContext({} as ThemeContextData);

export function ThemeContextProvider({children} : ThemeContextProps) {
    const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);

    function toggleTheme() {
      setTheme(theme.title === 'light' ? dark : light)
    }
    return(
        <ThemeContextLD.Provider value={{
            toggleTheme,
            theme
        }}>
            {children}
        </ThemeContextLD.Provider>
    )
}

