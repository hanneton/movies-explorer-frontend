import './NotFound.css'

function NotFound() {
    return (
        <div className='not-found page__not-found'>
            <h2 className='not-found__heading'>404</h2>
            <p className='not-found__subheading'>Страница не найдена</p>
            <a className='auth-link'> Назад</a>
        </div>
    )
}

export default NotFound;