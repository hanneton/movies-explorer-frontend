const savedDataUrl = 'https://api.beatexplorer.nomoredomainsicu.ru';

class SavedDataApi {
    constructor(url) {
        this.url = url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
    }

    getSavedFilms() {
        return fetch(`${this.url}/movies`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(this._checkResponse);
    }

    postNewFilm() {
        return fetch(`${this.url}/movies`, {
            method: "",
            headers: {}
        })
            .then(this._checkResponse)
    }

    removeFilmById() {
        return fetch(`${this.url}/movies`, {
            method: "",
            headers: {}
        })
            .then(this._checkResponse)
    }

    register({ password, email, name }) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, email, name })
        })
            .then(this._checkResponse)
    };

    login({ password, email }) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, email })
        })
            .then(this._checkResponse)
    };

    getPersonalData = (token) => {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(this._checkResponse)
    }

    editProfileInfo({ name, email }) {
        return fetch(`${this.url}/users/me`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'PATCH',
            body: JSON.stringify({
                name,
                email,
            })
        })
            .then(this._checkResponse);
    }

    unsaveFilm(id) {
        return fetch(`${this.url}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(this._checkResponse);
    }

    saveFilm({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        movieId,
        nameRU,
        nameEN,
        thumbnail
    }) {
        console.log({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            movieId,
            nameRU,
            nameEN,
            thumbnail
        })
        return fetch(`${this.url}/movies`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                thumbnail,
                movieId,
                nameRU,
                nameEN,
            })
        })
            .then(this._checkResponse);
    }


}

const savedDataApi = new SavedDataApi(`${savedDataUrl}`);
export { savedDataApi, savedDataUrl };
