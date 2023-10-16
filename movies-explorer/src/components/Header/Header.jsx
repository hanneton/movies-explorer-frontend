import './Header.css'
import logo from '../../images/logo.svg'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { CurrentWidth } from '../../contexts/CurrentWidth';


function Header(props) {
    const location = useLocation();
    const currentWidth = useContext(CurrentWidth);
    const [isPopupOpen, setPopupState] = useState(false);


    return (
        <>
            <header className='header page__header'>
                <Link to='/'>
                    <img className='logo' alt='Логотип' src={logo} />
                </Link>
                {
                    !props.isLoggedIn
                        ? (
                            <ul className='header__user-creds'>
                                <li>
                                    <Link to="/signup" className='header__link-signup'>Регистрация</Link>
                                </li>
                                <li>
                                    <Link to="/signin" className='header__link-signin'>Войти</Link>
                                </li>
                            </ul>

                        )
                        : currentWidth <= 768
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
                                            <Link to="/movies" className='header__link-films'>Фильмы</Link>
                                        </li>
                                        <li>
                                            <Link to="/saved-movies" className='header__link-films header__link-films_active'>Сохранённые фильмы</Link>
                                        </li>
                                    </ul>
                                    <Link to="/profile" className='header__link-account'>Аккаунт</Link>
                                </>
                            )
                }
            </header>
            <div className={`popup ${isPopupOpen && 'popup_active'}`}>
                <div className='popup__container'>
                    <button className="popup__close-btn" onClick={() => setPopupState(false)}></button>
                    <ul className='popup__links'>
                        <li>
                            <Link to="/" className='popup__link'>Главная</Link>
                        </li>
                        <li>
                            <Link to="/movies" className='popup__link popup__link_active'>Фильмы</Link>
                        </li>
                        <li>
                            <Link to="/saved-movies" className='popup__link'>Сохраненные фильмы</Link>
                        </li>
                    </ul>
                    <Link to="/profile" className='profile-btn'>Аккаунт</Link>
                </div>
            </div>
        </>

    )
}

export default Header;