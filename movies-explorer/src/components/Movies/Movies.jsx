import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './Movies.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies() {
    return (
        <>
            <Header />
            <main className="movies page__movies">
                <SearchForm />
                <Preloader />
                <MoviesCardList />
                <button className='movies__btn' type='button'>Ещё</button>
            </main>
            <Footer />
        </>
    )
}

export default Movies;