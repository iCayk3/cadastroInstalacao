import MenuLink from "../MenuLink"
import styles from "./Menu.module.css"

export default function Menu() {
    return (
        <header className={styles.head}>
            <nav className={styles.menu}>
                <MenuLink to="/">
                    Inicio
                </MenuLink>
                <MenuLink to="/overview">
                    Overview
                </MenuLink>
            </nav>
        </header>
    )
}