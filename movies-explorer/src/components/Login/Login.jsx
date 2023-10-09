import './Login.css'
import logo from '../../images/logo.svg'
import { useState, useRef } from 'react'

function Login() {
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
            <a href="./">
                <img className='logo auth__logo' src={logo} alt="Логотип" />
            </a>
            <h1 className='auth-heading'>Рады видеть!</h1>
            <form className='auth-form' ref={formRef} name="auth-form-signin" action="">
                <label className='auth-label'>
                    E-mail
                    <input className='auth-input'
                        defaultValue='pochta@yandex.ru'
                        type="email"
                        placeholder='Ваша почта'
                        onChange={checkValidity}
                        required
                    />
                </label>
                <label className='auth-label'>
                    Пароль
                    <input className='auth-input'
                        type="password"
                        placeholder='Ваш пароль'
                        onChange={checkValidity}
                        required
                        minLength="7"
                        maxLength="20"
                    />
                </label>
                <span className={`auth-error ${!isValid ? 'auth-error_active' : ''}`}>Что-то пошло не так</span>
            </form>
            <button className='auth-btn'>Войти</button>
            <p className='auth-caption'>Ещё не зарегистрированы?<a className='auth-link' href='./signup'> Регистрация</a></p>
        </main>
    )
}

export default Login;