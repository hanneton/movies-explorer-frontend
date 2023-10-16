const beatFilmsUrl = 'https://api.nomoreparties.co';
class MoviesApi {
    constructor(url) {
        this.url = url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
    }

    getFilms() {
        return fetch(this.url)
            .then(this._checkResponse);
    }
}

const moviesApi = new MoviesApi(`${beatFilmsUrl}/beatfilm-movies`);
export { moviesApi, beatFilmsUrl };
