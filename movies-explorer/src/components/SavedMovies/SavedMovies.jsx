import "./SavedMovies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies() {
    return (
        <>
            <Header />
            <div className="saved-movies page__saved-movies">
                <SearchForm />
                <MoviesCardList />
            </div>
            <Footer />
        </>
    )
}

export default SavedMovies;