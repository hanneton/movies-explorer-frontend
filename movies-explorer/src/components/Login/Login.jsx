import './Login.css'
import logo from '../../images/logo.svg'
import useFormWithValidation from '../hooks/useFormWithValidation';
import isEmail from 'validator/lib/isEmail';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
    const {
        values,
        errors,
        isValid,
        handleChange
    } = useFormWithValidation({
        initialValues: {
            password: '',
        },
        initialErrors: {
            password: '',
        },
        initialIsValid: false,
    })

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        if (!isEmail(value)) {
            setIsEmailValid(false)
            setEmailError("Некорректный email");
        } else {
            setEmailError("");
            setIsEmailValid(true)
        }
    };

    function onSubmit(e) {
        e.preventDefault();
        props.handleSignIn({ ...values, email });
    }

    useEffect(() => { props.setIsSuccess(null) }, [])

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
                        value={email}
                        onChange={handleEmailChange}
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
            <button form="auth-form-signin" className='auth-btn' disabled={!(isValid && isEmailValid) || props.isPending ? true : null}>Войти</button>
            <p className='auth-caption'>Ещё не зарегистрированы?<Link className='auth-link' to='/signup'> Регистрация</Link></p>
        </main>
    )
}

export default Login;