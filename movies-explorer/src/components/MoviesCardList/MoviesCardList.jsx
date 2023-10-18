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
        let firstChunk = props.filteredRequestedFilms.slice(0, perFirstChunk);
        setDisplayedFilms(firstChunk)
        localStorage.setItem('displayedFilms', JSON.stringify(props.filteredRequestedFilms))
    }, [currentWidth, props.filteredRequestedFilms, props.isCheckedGlobal])

    function handleClick() {
        const revealedCards = props.filteredRequestedFilms.slice(displayedFilms.length, displayedFilms.length + calcChunkSize().perRevealedChunk);
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
                        handleSaveFilm={props.handleSaveFilm}
                    />
                })}
            </section>
            {!(displayedFilms.length === props.filteredRequestedFilms.length) && <button onClick={handleClick} className='movies__btn'>Еще</button>}

        </>
    )
}

export default MoviesCardList;