import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css'

function SearchForm(props) {
    const [request, setRequest] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const location = useLocation();
    const handleRequest = location.pathname === '/movies'
        ? (e) => {
            e.preventDefault()
            return !request
                ? setIsEmpty(true)
                : (props.onRequest({ request, isChecked }),
                    setIsEmpty(false));
        }
        : (e) => {
            e.preventDefault();
            return !request
                ? setIsEmpty(true)
                : (props.handleSavedFilmsRequest({ request, isChecked }),
                    setIsEmpty(false))
        }

    useEffect(() => {
        if (location.pathname === '/movies') {
            if (localStorage.getItem('request') === null) {
                localStorage.setItem('request', '')
            }
            if (localStorage.getItem('isChecked') === null) {
                localStorage.setItem('isChecked', false)
            }
            setRequest(localStorage.getItem('request'));
            setIsChecked(JSON.parse(localStorage.getItem('isChecked')));
        }
    }, []);

    return (
        <section className='movies-req content__movies-req'>
            <form onSubmit={handleRequest} className="movies-req__form">
                <input
                    className="movies-req__input"
                    type="text"
                    placeholder="Фильм"
                    onChange={(e) => {
                        localStorage.setItem('request', e.target.value);
                        setRequest(e.target.value)
                    }}
                    value={request}
                    name="request"
                />
                <button
                    className="movies-req__btn"
                >
                </button>
            </form>
            <span className={`movies-req__message ${isEmpty && 'movies-req__message_active'}`}>Нужно ввести ключевое слово</span>
            <div className='movies-req__container'>
                <label className="movies-req__switch">
                    <input
                        id='movies-req__checkbox'
                        type='checkbox'
                        className="movies-req__checkbox"
                        checked={isChecked}
                        onClick={(e) => {
                            setIsChecked(e.target.checked);
                            localStorage.setItem('isChecked', e.target.checked);
                        }}
                        name='isChecked'
                    />
                    <span className="movies-req__slider"></span>
                </label>
                <label htmlFor="movies-req__checkbox" className='movies-req__caption'>Короткометражки</label>
            </div>
        </section >
    )
}

export default SearchForm;