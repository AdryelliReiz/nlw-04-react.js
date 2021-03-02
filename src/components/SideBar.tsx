import { useContext } from 'react';
import Switch from 'react-switch';
import styles from'../styles/components/SideBar.module.css';
import { ThemeContext } from 'styled-components';
import { ThemeContextLD } from '../contexts/ThemeContext';


export function SideBar() {
    const theme = useContext(ThemeContext);
    const {toggleTheme} = useContext(ThemeContextLD);
    

    return(
        <div className={styles.sideBar}>
            <div className={styles.icons}>
                <img src="icons/logo.svg" />
                <div className={styles.menu} >
                    <div className={styles.iconActive} >
                        <img src="icons/home.svg" alt="Home" />
                    </div>
                    <div>
                        <img src="icons/reanking.svg" alt="Reanking"/>
                    </div>
                    
                </div>
                <Switch
                    onChange={toggleTheme}
                    checked={theme.title === "dark"}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    height={16}
                    width={50}
                    handleDiameter={25}
                    offColor="#252627"
                    onColor="#f2f3f5"
                />
                </div>
        </div>
    )
}