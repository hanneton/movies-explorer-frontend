import './NotFound.css'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <main className='not-found page__not-found'>
            <h1 className='not-found__heading'>404</h1>
            <p className='not-found__subheading'>Страница не найдена</p>
            <Link className='auth-link' to="/"> Назад</Link>
        </main>
    )
}

export default NotFound;