import { useState, useEffect } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ButtonImage from "../ButtonImage/ButtonImage"
import imgLogo from "../../assets/faviconOG.png"
import imgMenu from "../../assets/svg/Menu.svg"
import imgCross from "../../assets/svg/Cross.svg"
import imgLogin from "../../assets/svg/Login.svg"
import imgAdd from "../../assets/svg/Plus.svg"


// Иконки страниц
import imgHome from "../../assets/svg/Home.svg"
import imgNews from "../../assets/svg/News.svg"
import imgUser from "../../assets/svg/User.svg"
import imgCity from "../../assets/svg/Country.svg"
import imgMap from "../../assets/svg/Map.svg"
import imgVideo from "../../assets/svg/Video.svg"
import imgTool from "../../assets/svg/Tool.svg"
import imgHelp from "../../assets/svg/Help.svg"
import imgInfo from "../../assets/svg/Info.svg"
import imgSettings from "../../assets/svg/Settings.svg"
import imgUpdate from "../../assets/svg/Update.svg"
import imgDev from "../../assets/svg/Dev.svg"


import "./Aside.css"
import "./Aside-phone.css"

export default function Aside() {
    const Navigate = useNavigate()
    const Location = useLocation()

    // Состояние открытого или закрытого меню навигации на телефоне
    const [showNavMenu, setShowNavMenu] = useState(false) // По умолчанию не показываем
    const [showAside, setShowAside] = useState(false)

    // При обновлении ссылки закрываем навигацию
    useEffect(() => {
        setShowNavMenu(false)

        // Отображаем Aside на всех страницах кроме /login
        setShowAside(!Location.pathname.toLowerCase().endsWith("/login"))

    }, [Location]);

    if (!showAside) {
        return false
    }

    return (
        <aside>
            {/* Темный фон во время открытого меню навигации */}
            <div
                id="nav-menu-bg"
                className={showNavMenu ? "show-nav-menu" : ""}
                onClick={() => setShowNavMenu(false)}
            ></div>

            {/* Лого в мобильной навигации */}
            <ButtonImage
                id="nav-logo-phone"
                className="tp no-filter"
                src={imgLogo}
                alt="logotype"
                title="Открыть главную страницу"
                onClick={() => Navigate("/")}
            />

            {/* Кнопка открытия мобильного меню навигации */}
            <ButtonImage
                id="nav-menu-open"
                className="tp"
                src={imgMenu}
                alt="open-menu"
                title="Открыть меню навигации"
                onClick={() => setShowNavMenu(true)}
            />

            {/* Контейнер навигации */}
            <div className={`nav-wrapper ${showNavMenu ? "show-nav-menu" : ""}`}>
                <nav>
                    {/* Закрытие мобильного меню */}
                    <ButtonImage
                        id="nav-menu-close"
                        className="tp"
                        src={imgCross}
                        alt="close-menu"
                        title="Закрыть меню навигации"
                        onClick={() => setShowNavMenu(false)}
                    />

                    <div id="nav-logo">
                        <NavLink to="/">
                            <img src={imgLogo} alt="logotype" title="Открыть главную страницу" />
                        </NavLink>
                    </div>
                    
                    <ul>
                        <li>
                            <NavLink to="/">
                                <img src={imgHome} alt="nav-icon" draggable="false" />
                                <p>Главная</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/news">
                                <img src={imgNews} alt="nav-icon" draggable="false" />
                                <p>Новости</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user">
                                <img src={imgUser} alt="nav-icon" draggable="false" />
                                <p>Участники</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/city">
                                <img src={imgCity} alt="nav-icon" draggable="false" />
                                <p>Города</p>
                            </NavLink>
                        </li>
                        {/* <li><NavLink to="/nation">Нации</NavLink></li> */}
                        <li>
                            <NavLink to="https://vk.com/bonkotia">
                                <img src={imgMap} alt="nav-icon" draggable="false" />
                                <p>Карта</p>
                            </NavLink>
                        </li>
                        <hr />
                        <li>
                            <NavLink to="/about">
                                <img src={imgInfo} alt="nav-icon" draggable="false" />
                                <p>О нас</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/support">
                                <img src={imgHelp} alt="nav-icon" draggable="false" />
                                <p>Помощь</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/settings">
                                <img src={imgSettings} alt="nav-icon" draggable="false" />
                                <p>Настройки</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/changelogs">
                                <img src={imgUpdate} alt="nav-icon" draggable="false" />
                                <p>Обновления</p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside> 
    )
}
