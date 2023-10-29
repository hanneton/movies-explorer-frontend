import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './Movies.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <main className="movies page__movies">
                <SearchForm
                    onRequest={props.onRequest}
                    isCheckedGlobal={props.isCheckedGlobal}
                    setIsCheckedGlobal={props.setIsCheckedGlobal}
                    setFilteredRequestedFilms={props.setFilteredRequestedFilms}
                    setRequestedFilms={props.setRequestedFilms}
                />
                {props.isLoading && <Preloader />}
                < MoviesCardList
                    handleCardClick={props.handleCardClick}
                    filteredRequestedFilms={props.filteredRequestedFilms}
                    setFilteredRequestedFilms={props.setFilteredRequestedFilms}
                    savedFilms={props.savedFilms}
                    isCheckedGlobal={props.isCheckedGlobal}
                />

                {props.isFound === false
                    && <p>Во время запроса произошла ошибка.
                        Возможно, проблема с соединением или сервер недоступен.
                        Подождите немного и попробуйте ещё раз</p>}

                {props.filteredRequestedFilms.length === 0
                    && <p className="movies__result">Ничего не найдено</p>}

                {localStorage.getItem('displayedFilms') === null
                    && < MoviesCardList
                        handleCardClick={props.handleCardClick}
                        filteredRequestedFilms={props.filteredRequestedFilms}
                        setFilteredRequestedFilms={props.setFilteredRequestedFilms}
                        savedFilms={props.savedFilms}
                        isCheckedGlobal={props.isCheckedGlobal}
                    />}
            </main>
            <Footer />
            <p className="movies__result"></p>
        </>
    )
}

export default Movies;