import './Register.css'
import logo from '../../images/logo.svg'

function Register() {
    return (
        <section className='auth page__auth'>
            <img className='logo auth__logo' src={logo} alt="" />
            <h2 className='auth-heading'>Добро пожаловать!</h2>
            <form className='auth-form' action="">
                <label className='auth-label'>
                    Имя
                    <input className='auth-input' value='Виталий' type="text" />
                </label>
                <label className='auth-label'>
                    E-mail
                    <input className='auth-input' value='pochta@yandex.ru' type="email" />
                </label>
                <label className='auth-label'>
                    Пароль
                    <input className='auth-input' type="password" />
                </label>
            </form>
            <button className='auth-btn'>Зарегистрироваться</button>
            <p className='auth-caption'>Уже зарегистрированы?<a className='auth-link' href=''> Войти</a></p>
        </section>
    )
}

export default Register;