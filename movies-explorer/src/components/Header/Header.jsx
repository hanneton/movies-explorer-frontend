import './Header.css'
import logo from '../../images/logo.svg'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';


function Header() {
    const location = useLocation();
    const [windowWidth, setWindowWidth] = useState(0);
    const [isPopupOpen, setPopupState] = useState(false);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    return (
        <>
            <header className='header page__header'>
                <a href='./'>
                    <img className='logo' alt='Логотип' src={logo} />
                </a>
                {
                    location.pathname === '/'
                        ? (
                            <ul className='header__user-creds'>
                                <li>
                                    <a className='header__link-signup' href='./signup'>Регистрация</a>
                                </li>
                                <li>
                                    <a className='header__link-signin' href='./signin'>Войти</a>
                                </li>
                            </ul>

                        )
                        : windowWidth <= 768
                            ? (
                                <button onClick={() => setPopupState(true)} className='burger'>
                                    <div className='burger__line'></div>
                                    <div className='burger__line'></div>
                                    <div className='burger__line'></div>
                                </button>
                            )
                            : (
                                <>
                                    <ul className='header__films'>
                                        <li>
                                            <a className='header__link-films' href="./movies">Фильмы</a>
                                        </li>
                                        <li>
                                            <a className='header__link-films header__link-films_active' href="./saved-movies">Сохранённые фильмы</a>
                                        </li>
                                    </ul>
                                    <a className='header__link-account' href='./profile'>Аккаунт</a>
                                </>
                            )
                }
            </header>
            <div className={`popup ${isPopupOpen && 'popup_active'}`}>
                <div className='popup__container'>
                    <button className="popup__close-btn" onClick={() => setPopupState(false)}></button>
                    <ul className='popup__links'>
                        <li>
                            <a className='popup__link' href="./">Главная</a>
                        </li>
                        <li>
                            <a className='popup__link popup__link_active' href="./movies">Фильмы</a>
                        </li>
                        <li>
                            <a className='popup__link' href="./saved-movies">Сохраненные фильмы</a>
                        </li>
                    </ul>
                    <a className='profile-btn' href="./profile">Аккаунт</a>
                </div>
            </div>
        </>

    )
}

export default Header;