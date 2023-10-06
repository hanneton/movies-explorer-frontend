import Header from '../Header/Header';
import './Profile.css'

function Profile() {
    return (
        <>
            <Header />
            <section className="profile page__profile">
                <h2 className='profile__heading'>Привет, Виталий!</h2>
                <form className='profile__form' action="">
                    <label className='profile__label'>
                        <span>Имя</span>
                        <input className='profile__input' type="text" value='Виталий' />
                    </label>
                    <label className='profile__label'><span>E-mail</span><input className='profile__input' type="email" value='pochta@yandex.ru' /></label>
                </form>
                <button className='profile__btn'>Редактировать</button>
                <button className='profile__btn profile__btn_exit'>Выйти из аккаунта</button>
            </section>
        </>
    )
}

export default Profile;