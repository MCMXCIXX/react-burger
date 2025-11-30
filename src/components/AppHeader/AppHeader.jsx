import './AppHeader.scss';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import MenuButton from "../MenuButton/MenuButton";

const AppHeader = (props) => {
    const {className} = props
    return <header className="app-header container p-4">
        <nav className="app-header__navigation">
            <div className="app-header__menu-tiems-warpper">
                <MenuButton title="Конструктор" text="Конструктор" icon={<BurgerIcon type="primary"/>}/>
                <MenuButton title="Лента заказов" text="Лента заказов" icon={<ListIcon type="primary"/>}/>

            </div>

            <MenuButton disabledPadding text={<Logo className="app-header__logo"/>} href="/" title="Лого" />

            <div className="app-header__menu-tiems-warpper">
                <MenuButton title="Личный кабинет" text="Личный кабинет" icon={<ProfileIcon type="primary"/>}/>
            </div>
        </nav>


    </header>
};

export default AppHeader;