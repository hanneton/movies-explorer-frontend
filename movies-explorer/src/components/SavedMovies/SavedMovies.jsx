import "./SavedMovies.css"
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCard from "../MoviesCard/MoviesCard";


function SavedMovies(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <main className="saved-movies page__saved-movies">
                <SearchForm handleSavedFilmsRequest={props.handleSavedFilmsRequest} />
                <section className="cardlist content__cardlist">
                    {
                        props.savedRequestedFilms.map((film, index) =>
                            <MoviesCard
                                key={index}
                                film={film}
                                savedFilms={props.savedFilms}
                                handleSaveFilm={props.handleSaveFilm}
                            />)
                    }
                </section>
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;