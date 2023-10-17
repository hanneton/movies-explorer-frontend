import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './Movies.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

function Movies(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <main className="movies page__movies">
                <SearchForm
                    onRequest={props.onRequest}
                    isShort={props.isShort}
                />

                {props.isLoading
                    ? <Preloader />
                    : props.films.length === 0
                        ? <p className="movies__result"></p>
                        : props.requestedFilms.length === 0
                            ? <p className="movies__result">Ничего не найдено</p>
                            : props.isSuccess === false
                                ? <p>Во время запроса произошла ошибка.
                                    Возможно, проблема с соединением или сервер недоступен.
                                    Подождите немного и попробуйте ещё раз</p>
                                : <MoviesCardList
                                    handleSaveFilm={props.handleSaveFilm}
                                    requestedFilms={props.requestedFilms}
                                    savedFilms={props.savedFilms}
                                />}

            </main>
            <Footer />
        </>
    )
}

export default Movies;