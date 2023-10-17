import './Login.css'
import logo from '../../images/logo.svg'
import useFormWithValidation from '../hooks/useFormWithValidation';
import isEmail from 'validator/lib/isEmail';
import { useState } from 'react';

function Login(props) {
    const {
        values,
        errors,
        isValid,
        handleChange
    } = useFormWithValidation({
        initialValues: {
            email: '',
            password: '',
        },
        initialErrors: {
            email: '',
            password: '',
        },
        initialIsValid: false,
    })

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        if (!isEmail(value)) {
            setEmailError("Некорректный email");
        } else {
            setEmailError("");
        }
    };

    function onSubmit(e) {
        e.preventDefault();
        props.handleSignIn({ ...values, email });
    }

    return (
        <main className='auth page__auth'>
            <a href="./">
                <img className='logo auth__logo' src={logo} alt="Логотип" />
            </a>
            <h1 className='auth-heading'>Рады видеть!</h1>
            <form
                className='auth-form'
                onSubmit={(e) => onSubmit(e)}
                name="auth-form-signin"
                id="auth-form-signin"
                noValidate
            >
                <label className='auth-label'>
                    E-mail
                    <input
                        className='auth-input'
                        type="text"
                        placeholder='pochta@yandex.ru'
                        required
                        onChange={handleChange}
                        name="email"
                    />
                </label>
                <span className='auth-inform-message'>{emailError}</span>
                <label className='auth-label'>
                    Пароль
                    <input className='auth-input'
                        type="password"
                        placeholder='Ваш пароль'
                        required
                        onChange={handleChange}
                        name="password"
                    />
                </label>
                <span className={`auth-inform-message ${props.isSuccess && 'auth-inform-message_positive'}`}>
                    {((errors.password) || (props.isSuccess === null
                        ? ''
                        : props.isSuccess
                            ? 'Вы успешно зарегистрировались'
                            : 'Что-то пошло не так'))}
                </span>
            </form>
            <button form="auth-form-signin" className='auth-btn' disabled={isValid ? null : true}>Войти</button>
            <p className='auth-caption'>Ещё не зарегистрированы?<a className='auth-link' href='./signup'> Регистрация</a></p>
        </main>
    )
}

export default Login;