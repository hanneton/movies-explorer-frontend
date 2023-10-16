import './MoviesCard.css';
import { beatFilmsUrl } from '../../utils/MoviesApi'
import { useLocation } from 'react-router-dom';


function MoviesCard(props) {
    const location = useLocation();

    return (
        <figure className='card'>
            <img className='card__pic' src={beatFilmsUrl + props.film.image.url} alt="Скриншот из фильма" />
            <figcaption className='card__caption'>
                <h2 className='card__title'>{props.film.nameRU}</h2>
                <p className='card__duration'>
                    {`${Math.floor(props.film.duration / 60)}ч ${props.film.duration % 60}м`}
                </p>
            </figcaption>
            <button onClick={() => props.handleSaveFilm(props.film)} className='card__btn card__btn_type_save' type='button'></button>
        </figure >
    )
}

export default MoviesCard;