import './Header.css'
import logo from '../../images/logo.svg'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';


function Header() {
    const location = useLocation();
    const [windowWidth, setWindowWidth] = useState(0);
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
                            <div className='header__user-creds'>
                                <a className='header__link-signup' href='./signup'>Регистрация</a>
                                <a className='header__link-signin' href='./signin'>Войти</a>
                            </div>

                        )
                        : windowWidth <= 768
                            ? (
                                <button className='burger'>
                                    <div className='burger__line'></div>
                                    <div className='burger__line'></div>
                                    <div className='burger__line'></div>
                                </button>
                            )
                            : (
                                <>
                                    <div className='header__films'>
                                        <a className='header__link-films' href="./movies">Фильмы</a>
                                        <a className='header__link-saved-films' href="./saved-movies">Сохранённые фильмы</a>
                                    </div>
                                    <a className='header__link-account' href='./profile'>Аккаунт</a>
                                </>
                            )
                }
            </header>
            <div className='popup'>
                <div className='popup__container'>
                    <button className="popup__close-btn"></button>
                    <ul className='popup__links'>
                        <li>
                            <a className='popup__link' href="#">Главная</a>
                        </li>
                        <li>
                            <a className='popup__link popup__link_active' href="#">Фильмы</a>
                        </li>
                        <li>
                            <a className='popup__link' href="#">Сохраненные фильмы</a>
                        </li>
                    </ul>
                    <button className='profile-btn'>Аккаунт</button>
                </div>
            </div>
        </>

    )
}

export default Header;