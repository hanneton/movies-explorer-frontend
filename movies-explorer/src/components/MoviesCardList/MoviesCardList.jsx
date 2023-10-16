import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { CurrentWidth } from '../../contexts/CurrentWidth';

function MoviesCardList(props) {
    const currentWidth = useContext(CurrentWidth);
    const [displayedFilms, setDisplayedFilms] = useState([]);
    function calcChunkSize() {
        let [perFirstChunk, perRevealedChunk] = currentWidth >= 1280
            ? [12, 3]
            : currentWidth >= 768
                ? [8, 2]
                : [5, 1]
        return { perFirstChunk, perRevealedChunk }
    }
    useEffect(() => {
        let { perFirstChunk } = calcChunkSize();
        setDisplayedFilms(props.requestedFilms.slice(0, perFirstChunk))
    }, [currentWidth])

    function handleClick() {
        const revealedCards = props.requestedFilms.slice(displayedFilms.length, displayedFilms.length + calcChunkSize().perRevealedChunk);
        setDisplayedFilms([...displayedFilms, ...revealedCards])
    }

    return (
        <>
            <section className="cardlist content__cardlist">
                {displayedFilms.map((film) => <MoviesCard film={film} handleSaveFilm={props.handleSaveFilm} />)}
            </section>
            <button onClick={handleClick} className='movies__btn'>Еще</button>
        </>
    )
}

export default MoviesCardList;