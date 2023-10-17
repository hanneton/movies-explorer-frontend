import './App.css'
import { Routes, Route } from 'react-router-dom'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound'
import { moviesApi } from '../../utils/MoviesApi'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { savedDataApi } from '../../utils/MainApi'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { CurrentWidth } from '../../contexts/CurrentWidth'
import { beatFilmsUrl } from '../../utils/MoviesApi'

function App() {
  const [films, setFilms] = useState([])
  const [requestedFilms, setRequestedFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedFilms, setSavedFilms] = useState([]);
  const [savedRequestedFilms, setSavedRequestedFilms] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [windowWidth, setWindowWidth] = useState(0);

  const navigate = useNavigate();

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      savedDataApi.getSavedFilms()
        .then(savedFilms => {
          setSavedFilms(savedFilms)
        })
        .catch(err => console.log)
    }
  }, [isLoggedIn])

  function filterFilmsList(request, films, isChecked) {
    return films.filter((el) => {
      return isChecked
        ? ((el.nameRU.toLowerCase().includes(request.toLowerCase()) || el.nameEN.toLowerCase().includes(request.toLowerCase())) && el.duration < 40)
        : (el.nameRU.toLowerCase().includes(request.toLowerCase()) || el.nameEN.toLowerCase().includes(request.toLowerCase()))
    }
    )
  }

  function handleRequest({ request, isChecked }) {
    setIsLoading(true);
    if (films.length === 0) {
      moviesApi.getFilms()
        .then(films => {
          setFilms(films);
          setRequestedFilms(filterFilmsList(request, films, isChecked))
          setIsLoading(false)
          setIsSuccess(true);
        })
        .catch(err => {
          console.log(err)
          setIsSuccess(false)
        })
    }
    else {
      setRequestedFilms(filterFilmsList(request, films, isChecked));
      setIsLoading(false)
    }
  }

  function handleSavedFilmsRequest({ request, isChecked }) {
    setSavedRequestedFilms(filterFilmsList(request, savedFilms, isChecked))
  }

  function handleSaveFilm(foundFilm, newFilm) {
    if (!foundFilm) {
      let modifiedFilm = {
        ...newFilm,
        owner: currentUser._id,
        image: beatFilmsUrl + newFilm.image.url,
        thumbnail: beatFilmsUrl + newFilm.image.formats.thumbnail.url,
        movieId: newFilm.id
      }

      savedDataApi.saveFilm(modifiedFilm)
        .then(fetchedFilm => setSavedFilms([...savedFilms, fetchedFilm]))
        .catch(err => console.log)
    }
    else {
      savedDataApi.unsaveFilm(foundFilm._id)
        .then(() => {
          setSavedFilms(savedFilms.filter(el => el._id !== foundFilm._id))
          setSavedRequestedFilms(savedRequestedFilms.filter(el => el._id !== foundFilm._id))
        })
        .catch(err => console.log)
    }
  }

  useEffect(() => {
    setSavedRequestedFilms(savedFilms)
  }, [savedRequestedFilms, savedFilms])

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      savedDataApi.getPersonalData(jwt)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
          navigate('/movies');
        })
        .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    checkToken();
  }, [isLoggedIn])

  function logout() {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  }

  function handleSignUp({ password, email, name }) {
    savedDataApi.register({ password, email, name })
      .then(() => {
        handleSignIn({ password, email })
      })
      .catch(err => {
        console.log(err);
        setIsSuccess(false)
      })
  }

  function handleSignIn({ password, email }) {
    savedDataApi.login({ password, email })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsSuccess(true)
        setIsLoggedIn(true);
        navigate('/movies', { replace: true });
        setIsSuccess(null)
      })
      .catch(err => {
        console.log(err)
        setIsSuccess(false)
      })
  }

  function handleUpdateUser({ name, email }) {
    savedDataApi.editProfileInfo({ name, email })
      .then((updatedUser) => {
        console.log(updatedUser)
        setCurrentUser(updatedUser);
        setIsEditMode(false);
      })
  }

  function onEdit() {
    setIsEditMode(true)
  }

  return (

    <CurrentWidth.Provider value={windowWidth}>
      <div className="page">
        <Routes>
          <Route path='/' element={
            <Main
              isLoggedIn={isLoggedIn}
            />
          }
          />
          <Route path='/signin' element={
            <Login
              handleSignIn={handleSignIn}
              isSuccess={isSuccess}
            />} />
          <Route path='/signup' element={
            <Register
              handleSignUp={handleSignUp}
              isSuccess={isSuccess}
            />} />
          <Route path='/profile' element={
            <ProtectedRoute
              handleUpdateUser={handleUpdateUser}
              element={Profile}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onEdit={onEdit}
              isEditMode={isEditMode}
              logout={logout}
            />
          } />
          <Route path='/movies' element={
            <ProtectedRoute
              element={Movies}
              handleSaveFilm={handleSaveFilm}
              savedFilms={savedFilms}
              isLoading={isLoading}
              onRequest={handleRequest}
              requestedFilms={requestedFilms}
              isLoggedIn={isLoggedIn}
              films={films}
              isSuccess={isSuccess}
            />
          }
          />
          <Route path='/saved-movies' element={
            <ProtectedRoute
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
              savedFilms={savedFilms}
              handleSaveFilm={handleSaveFilm}
              savedRequestedFilms={savedRequestedFilms}
              handleSavedFilmsRequest={handleSavedFilmsRequest}
            />
          } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentWidth.Provider>

  );
}

export default App;
