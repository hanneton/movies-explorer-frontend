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


function App() {
  const [films, setFilms] = useState([])
  const [requestedFilms, setRequestedFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(true);
  const [savedFilms, setSavedFilms] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [windowWidth, setWindowWidth] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const navigate = useNavigate();

  function handleRequest({ request, isChecked }) {
    setIsLoading(true);
    moviesApi.getFilms()
      .then(films => {
        setFilms(films);
        return films.filter((el) => {
          return isChecked
            ? (el.nameRU.includes(request) && el.duration < 40)
            : el.nameRU.includes(request)
        }
        )
      })
      .then(filteredFilms => {
        setRequestedFilms(filteredFilms);
        setIsLoading(false);
      })
      .catch(err => {
        setApiStatus(false);
        console.log(err)
      })
  }


  function handleSaveFilm(film) {
    let modifiedFilmInfo = { ...film, owner: currentUser._id }
    // console.log(film, currentUser)
    // const isUnique = !savedFilms.some((el) => el.id === card.id);
    // if (isUnique) setSavedFilms([...savedFilms, card]);
    savedDataApi.saveFilm(modifiedFilmInfo)
      .then(fetchedFilm => console.log(fetchedFilm))
      .catch(err => console.log)
  }

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

  function handleSignUp({ password, email, name }) {
    savedDataApi.register({ password, email, name })
      .then(() => {
        setIsLoggedIn(true)
        setIsSuccess(true)
        navigate('/movies')
        setCurrentUser({ email, name })
        setIsSuccess(null)
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
        setIsLoggedIn(true);
        setIsSuccess(true)
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
            />
          } />
          <Route path='/movies' element={
            <ProtectedRoute
              element={Movies}
              handleSaveFilm={handleSaveFilm}
              isLoading={isLoading}
              onRequest={handleRequest}
              requestedFilms={requestedFilms}
              isLoggedIn={isLoggedIn}
              apiStatus={apiStatus}
            />
          }
          />
          <Route path='/saved-movies' element={
            <ProtectedRoute
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
            />
          } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentWidth.Provider>

  );
}

export default App;
