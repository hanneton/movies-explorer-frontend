import './Register.css'
import logo from '../../images/logo.svg'
import { useState, useRef } from 'react'
import { useEffect } from 'react';

function Register() {
    const formRef = useRef(null);
    const [isValid, setIsValid] = useState(false)
    function checkValidity() {
        const validity = formRef.current.checkValidity();
        if (validity) {
            setIsValid(true);
        }
        else {
            setIsValid(false)
        }
    }
    return (
        <main className='auth page__auth'>
            <a href='./'>
                <img className='logo auth__logo' src={logo} alt="Логотип" />
            </a>
            <h1 className='auth-heading'>Добро пожаловать!</h1>
            <form ref={formRef} name="auth-form" className='auth-form' action="">
                <label className='auth-label'>
                    Имя
                    <input className='auth-input'
                        onChange={checkValidity}
                        defaultValue='Виталий'
                        placeholder='Ваше имя'
                        minLength="5"
                        maxLength="15"
                        type="text"
                        required
                    />
                </label>
                <label className='auth-label'>
                    E-mail
                    <input className='auth-input'
                        onChange={checkValidity}
                        defaultValue='pochta@yandex.ru'
                        type="email"
                        placeholder='Ваша почта'
                        required
                    />
                </label>
                <label className='auth-label'>
                    Пароль
                    <input className='auth-input'
                        onChange={checkValidity}
                        type="password"
                        placeholder='Ваш пароль'
                        minLength="7"
                        maxLength="20"
                        required
                    />
                </label>
                <span className={`auth-error ${!isValid ? 'auth-error_active' : ''}`}>Что-то пошло не так</span>
            </form>
            <button className='auth-btn'>Зарегистрироваться</button>
            <p className='auth-caption'>Уже зарегистрированы?<a className='auth-link' href='./signin'> Войти</a></p>
        </main>
    )
}

export default Register;