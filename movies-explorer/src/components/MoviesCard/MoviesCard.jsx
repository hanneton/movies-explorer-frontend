import './MoviesCard.css';
import fallback from '../../images/default-fallback-pic.jpg'


function MoviesCard() {
    return (
        <figure className='card'>
            <img className='card__pic' src={fallback} alt="" />
            <figcaption className='card__caption'>
                <p className='card__title'>Игги и The Stooges</p>
                <p className='card__duration'>1ч 17м</p>
            </figcaption>
            <button className='card__save-btn' type='button'>Сохранить</button>
            <div className='card__saved-label'></div>
        </figure>
    )
}

export default MoviesCard;