import { useState } from 'react';
import './SearchForm.css'

function SearchForm(props) {
    const [request, setRequest] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    function handleRequest(e) {
        e.preventDefault();
        props.onRequest({ request, isChecked });
    }

    return (
        <section className='movies-req content__movies-req'>
            <form onSubmit={handleRequest} className="movies-req__form">
                <input
                    className="movies-req__input"
                    type="text"
                    placeholder="Фильм"
                    onChange={(e) => setRequest(e.target.value)}
                    value={request}
                    name="request"
                />
                <button className="movies-req__btn"></button>
            </form>
            <div className='movies-req__container'>
                <label className="movies-req__switch">
                    <input
                        id='movies-req__checkbox'
                        type='checkbox'
                        className="movies-req__checkbox"
                        checked={isChecked}
                        onClick={(e) => setIsChecked(e.target.checked)}
                        name='isChecked'
                    />
                    <span className="movies-req__slider"></span>
                </label>
                <label for="movies-req__checkbox" className='movies-req__caption'>Короткометражки</label>
            </div>
        </section >
    )
}

export default SearchForm;