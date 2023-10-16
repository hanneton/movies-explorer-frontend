import './Register.css'
import logo from '../../images/logo.svg'
import useFormWithValidation from '../hooks/useFormWithValidation';

function Register(props) {
    const {
        values,
        setValues,
        errors,
        setErrors,
        isValid,
        setIsValid,
        handleChange
    } = useFormWithValidation({
        initialValues: {
            email: '',
            password: '',
            name: ''
        },
        initialErrors: {
            email: '',
            password: '',
            name: ''
        },
        initialIsValid: false,
    })

    function onSubmit(e) {
        e.preventDefault();
        props.handleSignUp(values);
    }

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
                        onChange={handleChange}
                        type="email"
                        placeholder='pochta@yandex.ru'
                        required
                        name='email'
                    />
                </label>
                <span className='auth-inform-message'>{errors.email}</span>
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
                    {props.isSuccess === null
                        ? errors.password
                        : props.isSuccess
                            ? 'Вы успешно зарегистрировались'
                            : 'Что-то пошло не так'}
                </span>
            </form>
            <button form="auth-form-signup" className='auth-btn' disabled={isValid ? null : true}>Зарегистрироваться</button>
            <p className='auth-caption'>Уже зарегистрированы?<a className='auth-link' href='./signin'> Войти</a></p>
        </main>
    )
}

export default Register;



{/* {`auth-error ${!formRef.current.checkValidity() ? 'auth-error_active' : ''}`} */ }

// {props.isSuccess
//     ? { color: '#3DDC84' }
//     : { color: '#EE3465' }}

{/* <span
                    className={`auth-inform-message ${props.isSuccess !== null && "auth-inform-message_active"}`}>
                    {props.isSuccess
                        ? 'Вы успешно зарегистрировались'
                        : 'Что-то пошло не так'}
                </span> */}