import "./SavedMovies.css"
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect } from "react";


function SavedMovies(props) {

    useEffect(() => {
        props.setFilteredSavedRequestedFilms(props.savedFilms);
        props.setSavedRequestedFilms(props.savedFilms);
    }, [])

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <main className="saved-movies page__saved-movies">
                <SearchForm
                    handleSavedFilmsRequest={props.handleSavedFilmsRequest}
                    setIsCheckedGlobal={props.setIsCheckedGlobal}
                />
                <section className="cardlist content__cardlist">
                    {
                        props.filteredSavedRequestedFilms.map((film, index) =>
                            <MoviesCard
                                key={film.movieId}
                                film={film}
                                savedFilms={props.savedFilms}
                                handleSaveFilm={props.handleSaveFilm}
                            />)
                    }
                    {props.filteredSavedRequestedFilms.length === 0
                        && props.savedRequest
                        && <p className="movies__result">Ничего не найдено</p>}
                    {props.isCheckedGlobal
                        && !props.savedRequest
                        && <p className="movies__result">Ничего не найдено</p>}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;