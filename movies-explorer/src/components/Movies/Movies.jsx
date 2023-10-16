import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './Movies.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies(props) {
    return (
        <>
            <Header />
            <main className="movies page__movies">
                <SearchForm
                    onRequest={props.onRequest}
                    isShort={props.isShort}
                />
                {props.isLoading
                    ? <Preloader />
                    : props.requestedFilms.length !== 0
                        ? (
                            <MoviesCardList
                                handleSaveFilm={props.handleSaveFilm}
                                requestedFilms={props.requestedFilms}
                            />
                        )
                        : (
                            <p className="movies__result">
                                {
                                    `${props.apiStatus
                                        ? "Ничего не найдено"
                                        : "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"}`
                                }
                            </p>
                        )
                }
            </main>
            <Footer />
        </>
    )
}

export default Movies;