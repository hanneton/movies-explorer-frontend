import './Login.css'
import logo from '../../images/logo.svg'

function Login() {
    return (
        <section className='auth page__auth'>
            <img className='logo auth__logo' src={logo} alt="" />
            <h2 className='auth-heading'>Рады видеть!</h2>
            <form className='auth-form' action="">
                <label className='auth-label'>
                    E-mail
                    <input className='auth-input' value='pochta@yandex.ru' type="email" />
                </label>
                <label className='auth-label'>
                    Пароль
                    <input className='auth-input' type="password" />
                </label>
            </form>
            <button className='auth-btn'>Войти</button>
            <p className='auth-caption'>Ещё не зарегистрированы?<a className='auth-link' href=''> Регистрация</a></p>
        </section>
    )
}

export default Login;