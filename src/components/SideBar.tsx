import { useContext } from 'react';
import Link from 'next/link';
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
                    <Link href="/">
                        <div className={styles.iconActive} >
                            <img src="icons/home.svg" alt="Home" />
                        </div>
                    </Link>
                    
                    <Link href="/ranking">
                        <div className={styles.iconActive} >
                            <img src="icons/reanking.svg" alt="Reanking"/>
                        </div>
                    </Link>
                    
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