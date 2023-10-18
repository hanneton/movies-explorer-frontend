import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
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
import { Navigate } from "react-router-dom";

function App() {
  const [films, setFilms] = useState([])
  const [requestedFilms, setRequestedFilms] = useState([]);
  const [filteredRequestedFilms, setFilteredRequestedFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedFilms, setSavedFilms] = useState([]);
  const [savedRequestedFilms, setSavedRequestedFilms] = useState([]);
  const [filteredSavedRequestedFilms, setFilteredSavedRequestedFilms] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isFound, setIsFound] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [windowWidth, setWindowWidth] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [isCheckedGlobal, setIsCheckedGlobal] = useState(false);
  const [savedRequest, setSavedRequest] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
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
          setSavedRequestedFilms(savedFilms)
          setFilteredSavedRequestedFilms(savedFilms)
        })
        .catch(err => console.log)
    }
  }, [isLoggedIn])

  useEffect(() => {
    isCheckedGlobal
      ? setFilteredRequestedFilms(filterByDuration(requestedFilms))
      : setFilteredRequestedFilms(requestedFilms)
  }, [isCheckedGlobal])

  useEffect(() => {
    isCheckedGlobal
      ? setFilteredSavedRequestedFilms(filterByDuration(savedRequestedFilms))
      : setFilteredSavedRequestedFilms(savedRequestedFilms)
  }, [isCheckedGlobal])


  function filterByDuration(films) {
    return films.filter(el => el.duration < 40)
  }

  function filterByRequest(req, films) {
    return films.filter((el) => {
      return ((el.nameRU.toLowerCase().includes(req.toLowerCase())
        || el.nameEN.toLowerCase().includes(req.toLowerCase())))
    })
  }

  function filterById(id, films) {
    return films.filter(el => el._id !== id);
  }

  function filterFilmsList(request, films) {
    return isCheckedGlobal
      ? filterByDuration(filterByRequest(request, films))
      : filterByRequest(request, films)
  }

  function handleRequest({ request }) {
    setIsLoading(true);
    if (films.length === 0) {
      moviesApi.getFilms()
        .then(films => {
          setFilms(films);
          let filteredFilms = filterFilmsList(request, films);
          setRequestedFilms(filteredFilms);
          setFilteredRequestedFilms(filteredFilms);
          setIsLoading(false)
          setIsFound(true);
        })
        .catch(err => {
          console.log(err)
          setIsFound(false)
        })
    }
    else {
      setRequestedFilms(filterFilmsList(request, films));
      setFilteredRequestedFilms(filterFilmsList(request, films));
      setIsLoading(false)
    }
  }

  function handleSavedFilmsRequest({ request }) {
    setSavedRequest(request);
    setSavedRequestedFilms(filterFilmsList(request, savedFilms, isCheckedGlobal));
    setFilteredSavedRequestedFilms(filterFilmsList(request, savedFilms, isCheckedGlobal));
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
          setSavedFilms(filterById(foundFilm._id, savedFilms))
          setSavedRequestedFilms(filterById(foundFilm._id, savedRequestedFilms))
          setFilteredSavedRequestedFilms(filterById(foundFilm._id, filteredSavedRequestedFilms))
        })
        .catch(err => console.log)
    }
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      savedDataApi.getPersonalData(jwt)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
          navigate(location.pathname);
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
    setIsPending(true);
    savedDataApi.register({ password, email, name })
      .then(() => {
        handleSignIn({ password, email })
      })
      .catch(err => {
        console.log(err);
        setIsSuccess(false)
      })
      .finally(() => setIsPending(false))
  }

  function handleSignIn({ password, email }) {
    setIsPending(true);
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
      .finally(() => setIsPending(false))
  }

  function handleUpdateUser({ name, email }) {
    setIsPending(true);
    savedDataApi.editProfileInfo({ name, email })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditMode(false);
        setIsSuccess(true);

      })
      .catch(err => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => setIsPending(false))
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
            isLoggedIn
              ? <Navigate
                to='/'
              /> : <Login
                handleSignIn={handleSignIn}
                isSuccess={isSuccess}
                setIsSuccess={setIsSuccess}
                isPending={isPending}
              />} />
          <Route path='/signup' element={
            isLoggedIn
              ? <Navigate
                to='/'
              />
              : <Register
                handleSignUp={handleSignUp}
                isSuccess={isSuccess}
                setIsSuccess={setIsSuccess}
                isPending={isPending}
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
              isSuccess={isSuccess}
              setIsSuccess={setIsSuccess}
              isPending={isPending}
            />
          } />
          <Route path='/movies' element={
            <ProtectedRoute
              element={Movies}
              handleSaveFilm={handleSaveFilm}
              savedFilms={savedFilms}
              isLoading={isLoading}
              onRequest={handleRequest}
              setRequestedFilms={setRequestedFilms}
              filteredRequestedFilms={filteredRequestedFilms}
              setFilteredRequestedFilms={setFilteredRequestedFilms}
              isLoggedIn={isLoggedIn}
              films={films}
              isFound={isFound}
              isCheckedGlobal={isCheckedGlobal}
              setIsCheckedGlobal={setIsCheckedGlobal}
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
              setSavedRequestedFilms={setSavedRequestedFilms}
              filteredSavedRequestedFilms={filteredSavedRequestedFilms}
              setFilteredSavedRequestedFilms={setFilteredSavedRequestedFilms}
              isCheckedGlobal={isCheckedGlobal}
              setIsCheckedGlobal={setIsCheckedGlobal}
              savedRequest={savedRequest}
            />
          } />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentWidth.Provider>

  );
}

export default App;
