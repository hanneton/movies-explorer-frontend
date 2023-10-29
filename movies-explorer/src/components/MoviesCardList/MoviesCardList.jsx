import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { CurrentWidth } from '../../contexts/CurrentWidth';
import {
    MAIN_CHUNK_MAX, MAIN_CHUNK_MEDIUM, MAIN_CHUNK_MIN,
    EXTRA_CHUNK_MAX, EXTRA_CHUNK_MEDIUM, EXTRA_CHUNK_MIN
} from '../../constants/constants';


function MoviesCardList(props) {
    const currentWidth = useContext(CurrentWidth);
    const [displayedFilms, setDisplayedFilms] = useState([]);
    function calcChunkSize() {
        let [perMainChunk, perExtraChunk] = currentWidth >= 1280
            ? [MAIN_CHUNK_MAX, EXTRA_CHUNK_MAX]
            : currentWidth >= 768
                ? [MAIN_CHUNK_MEDIUM, EXTRA_CHUNK_MEDIUM]
                : [MAIN_CHUNK_MIN, EXTRA_CHUNK_MIN]
        return { perMainChunk, perExtraChunk }
    }

    useEffect(() => {
        let { perMainChunk } = calcChunkSize();
        let firstChunk = props.filteredRequestedFilms.slice(0, perMainChunk);
        setDisplayedFilms(firstChunk)
        localStorage.setItem('displayedFilms', JSON.stringify(props.filteredRequestedFilms))
    }, [currentWidth, props.filteredRequestedFilms, props.isCheckedGlobal])

    function handleClick() {
        const revealedCards = props.filteredRequestedFilms.slice(displayedFilms.length, displayedFilms.length + calcChunkSize().perExtraChunk);
        setDisplayedFilms([...displayedFilms, ...revealedCards])
    }

    return (
        <>
            <section className="cardlist content__cardlist">
                {displayedFilms.map((film, index) => {
                    return <MoviesCard
                        key={film.id}
                        film={film}
                        savedFilms={props.savedFilms}
                        handleCardClick={props.handleCardClick}
                    />
                })}
            </section>
            {!(displayedFilms.length === props.filteredRequestedFilms.length) && <button onClick={handleClick} className='movies__btn'>Еще</button>}

        </>
    )
}

export default MoviesCardList;