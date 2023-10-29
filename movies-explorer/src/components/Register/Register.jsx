import './Register.css'
import logo from '../../images/logo.svg'
import useFormWithValidation from '../hooks/useFormWithValidation';
import isEmail from 'validator/lib/isEmail';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Register(props) {
    const {
        values,
        errors,
        isValid,
        handleChange
    } = useFormWithValidation({
        initialValues: {
            password: '',
            name: ''
        },
        initialErrors: {
            password: '',
            name: ''
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
    }


    function onSubmit(e) {
        e.preventDefault();
        props.handleSignUp({ ...values, email });
    }

    useEffect(() => { props.setIsSuccess(null) }, [])
    return (
        <main className='auth page__auth'>
            <a href='./'>
                <img className='logo auth__logo' src={logo} alt="Логотип" />
            </a>
            <h1 className='auth-heading'>Добро пожаловать!</h1>
            <form
                id="auth-form-signup"
                name="auth-form-signup"
                className='auth-form'
                onSubmit={(e) => onSubmit(e)}
                noValidate
            >
                <label className='auth-label'>
                    Имя
                    <input className='auth-input auth-input-name'
                        onChange={handleChange}
                        name="name"
                        placeholder='Виталий'
                        minLength="2"
                        maxLength="30"
                        type="text"
                        required
                    />
                </label>
                <span className='auth-inform-message'>{errors.name}</span>
                <label className='auth-label'>
                    E-mail
                    <input className='auth-input auth-input-email'
                        onChange={handleEmailChange}
                        type="text"
                        placeholder='pochta@yandex.ru'
                        required
                        name='email'
                    />
                </label>
                <span className='auth-inform-message'>{emailError}</span>
                <label className='auth-label'>
                    Пароль
                    <input className='auth-input auth-input-password'
                        onChange={handleChange}
                        type="password"
                        placeholder='Ваш пароль'
                        required
                        name='password'
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
            <button form="auth-form-signup" className='auth-btn' disabled={!(isValid && isEmailValid) || props.isPending ? true : null}>Зарегистрироваться</button>
            <p className='auth-caption'>Уже зарегистрированы?<Link className='auth-link' to='/signin'> Войти</Link></p>
        </main>
    )
}

export default Register;


