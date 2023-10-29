import './MoviesCard.css';
import { beatFilmsUrl } from '../../utils/MoviesApi'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'

function MoviesCard(props) {
    const location = useLocation();
    return (
        <figure className='card'>
            <a className='card__link' target="blank" href={props.film.trailerLink}>
                <img
                    className='card__pic'
                    src={location.pathname === '/movies'
                        ? beatFilmsUrl + props.film.image.url
                        : props.film.image
                    }
                    alt={props.film.nameRU}
                />
            </a>

            <figcaption className='card__caption'>
                <h2 className='card__title'>{props.film.nameRU}</h2>
                <p className='card__duration'>
                    {`${Math.floor(props.film.duration / 60)}ч ${props.film.duration % 60}м`}
                </p>
            </figcaption>
            {location.pathname === '/movies'
                ? (<button
                    onClick={() => {
                        let foundFilm = props.savedFilms.find((el) => {
                            return props.film.id === el.movieId;
                        })
                        props.handleCardClick(foundFilm, props.film)
                    }}
                    className={`card__btn ${props.savedFilms.some((el) => {
                        return props.film.id === el.movieId;
                    }) ? "card__btn_type_checked" : "card__btn_type_save"}`}
                    type='button'>
                </button>)
                : (<button
                    onClick={() => props.handleCardClick(props.film)}
                    className='card__btn card__btn_type_delete'>
                </button>)}
        </figure >
    )
}

export default MoviesCard;