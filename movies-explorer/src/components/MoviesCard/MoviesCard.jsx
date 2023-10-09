import './MoviesCard.css';
import fallback from '../../images/default-fallback-pic.jpg'


function MoviesCard() {
    return (
        <figure className='card'>
            <img className='card__pic' src={fallback} alt="Скриншот из фильма" />
            <figcaption className='card__caption'>
                <h2 className='card__title'>Игги и The Stooges</h2>
                <p className='card__duration'>1ч 17м</p>
            </figcaption>
            <button className='card__btn card__btn_type_delete' type='button'></button>
            <div className='card__saved-label'></div>
        </figure>
    )
}

export default MoviesCard;