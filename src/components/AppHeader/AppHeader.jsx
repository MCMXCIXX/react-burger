import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import MenuButton from "../MenuButton/MenuButton";
import { NavLink } from "react-router-dom";
import styles from './AppHeader.module.scss';

const AppHeader = () => {
    return (
        <header className={styles['app-header']}>
            <nav className={styles['app-header__navigation']}>
                {/* Левая группа ссылок */}
                <div className={styles['app-header__menu-items-wrapper']}>
                    <NavLink
                        to="/"
                        className={styles['app-header__menu-items-link']}
                    >
                        {({ isActive }) => (
                            <MenuButton
                                className={styles[`app-header__menu-items-button ${!isActive ? 'active' : ''}`]}
                                title="Конструктор"
                                text="Конструктор"
                                icon={<BurgerIcon type={!isActive ? "primary" : "secondary"} />}
                            />
                        )}
                    </NavLink>

                    <NavLink
                        to="/feed"
                        className={styles['app-header__menu-items-link']}
                    >
                        {({ isActive }) => (
                            <MenuButton
                                className={styles[`app-header__menu-items-button ${!isActive ? 'active' : ''}`]}
                                title="Лента заказов"
                                text="Лента заказов"
                                icon={<ListIcon type={!isActive ? "primary" : "secondary"} />}
                            />
                        )}
                    </NavLink>
                </div>

                {/* Логотип по центру */}
                <NavLink to="/" className={styles['app-header__menu-items-link']}>
                    <MenuButton
                        disabledPadding
                        text={<Logo className={styles['app-header__logo']} />}
                        href="/"
                        title="Лого"
                    />
                </NavLink>

                {/* Правая группа (личный кабинет) */}
                <div className={styles['app-header__menu-items-wrapper']}>
                    <NavLink
                        to="/profile"
                        className={styles['app-header__menu-items-link']}
                    >
                        {({ isActive }) => (
                            <MenuButton
                                title="Личный кабинет"
                                text="Личный кабинет"
                                icon={<ProfileIcon type={!isActive ? "primary" : "secondary"} />}
                            />
                        )}
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
