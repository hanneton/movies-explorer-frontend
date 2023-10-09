import './SearchForm.css'

function SearchForm() {
    return (
        <section className='movies-req content__movies-req'>
            <form className="movies-req__form">
                <input className="movies-req__input" type="text" placeholder="Фильм" />
                <button className="movies-req__btn"></button>
            </form>
            <div className='movies-req__container'>
                <label className="movies-req__switch">
                    <input id='movies-req__form' type='checkbox' className="movies-req__checkbox" />
                    <span className="movies-req__slider"></span>
                </label>
                <label for="movies-req__form" className='movies-req__caption'>Короткометражки</label>
            </div>
        </section >
    )
}

export default SearchForm;