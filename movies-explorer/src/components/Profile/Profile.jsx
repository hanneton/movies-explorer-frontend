import { useState } from 'react';
import Header from '../Header/Header';
import './Profile.css'
import useFormWithValidation from '../hooks/useFormWithValidation';
import { Link } from 'react-router-dom';

function Profile(props) {
    const {
        values,
        errors,
        isValid,
        handleChange
    } = useFormWithValidation({
        initialValues: {
            email: props.currentUser.email,
            name: props.currentUser.name
        },
        initialErrors: {
            email: '',
            name: ''
        },
        initialIsValid: false,
    })


    function handleSubmit(e) {
        e.preventDefault();
        console.log(values)
        props.handleUpdateUser(values);
    }

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <main className="profile page__profile">
                <h1 className='profile__heading'>Привет, {props.currentUser.name}!</h1>
                <form onSubmit={(e) => handleSubmit(e)} className='profile__form' id="profile__form" name="profile__form">
                    <label className='profile__label'>
                        <span>Имя</span>
                        <input className='profile__input'
                            onChange={handleChange}
                            name="name"
                            defaultValue={values.name}
                            placeholder='Ваше имя'
                            minLength="2"
                            maxLength="30"
                            type="text"
                            required
                            disabled={!props.isEditMode ? true : null} />
                    </label>
                    <label className='profile__label'>
                        <span>E-mail</span>
                        <input className='profile__input'
                            onChange={handleChange}
                            type="text"
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            placeholder='Ваша почта'
                            defaultValue={values.email}
                            required
                            name='email'
                            disabled={!props.isEditMode ? true : null} />
                    </label>
                </form>
                {
                    props.isEditMode
                        ? (
                            <div className='profile__btns-group_edit'>
                                <span className='profile__update-error'>При обновлении профиля произошла ошибка.</span>
                                <button
                                    form='profile__form'
                                    className='auth-btn'
                                    disabled={
                                        isValid
                                            && ((props.currentUser.name !== values.name)
                                                || (props.currentUser.email !== values.email))
                                            ? null
                                            : true}
                                >Сохранить</button>
                            </div>
                        )
                        : (
                            <div className="profile__btns-group">
                                <button onClick={props.onEdit} className='profile__btn'>Редактировать</button>
                                <Link to="/" onClick={props.logout} className='profile__btn profile__btn_exit'>Выйти из аккаунта</Link>
                            </div>
                        )
                }

            </main>
        </>
    )
}

export default Profile;