import { useState } from 'react';
import Header from '../Header/Header';
import './Profile.css'

function Profile() {
    const [isEditMode, setIsEditMode] = useState(false)
    return (
        <>
            <Header />
            <main className="profile page__profile">
                <h1 className='profile__heading'>Привет, Виталий!</h1>
                <form className='profile__form' id="profile__form" name="profile__form" action="">
                    <label className='profile__label'>
                        <span>Имя</span>
                        <input className='profile__input'
                            minLength="5"
                            maxLength="15"
                            required type="text"
                            defaultValue='Виталий'
                            placeholder='Ваше имя'
                            disabled={!isEditMode} />
                    </label>
                    <label className='profile__label'>
                        <span>E-mail</span>
                        <input className='profile__input'
                            required type="email"
                            defaultValue='pochta@yandex.ru'
                            placeholder='Ваша почта'
                            disabled={!isEditMode} />
                    </label>
                </form>
                {
                    isEditMode
                        ? (
                            <div className='profile__btns-group_edit'>
                                <span className='profile__update-error'>При обновлении профиля произошла ошибка.</span>
                                <button className='auth-btn'>Сохранить</button>
                            </div>
                        )
                        : (
                            <div className="profile__btns-group">
                                <button onClick={() => setIsEditMode(true)} className='profile__btn'>Редактировать</button>
                                <a className='profile__btn profile__btn_exit' href='./signin'>Выйти из аккаунта</a>
                            </div>
                        )
                }

            </main>
        </>
    )
}

export default Profile;