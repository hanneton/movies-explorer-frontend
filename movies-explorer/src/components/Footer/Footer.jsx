import './Footer.css';
function Footer() {
    return (
        <footer className='footer page__footer'>
            <h2 className='footer__heading'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className='footer__container'>
                <p className='footer__copyright'>© 2020</p>
                <ul className='footer__list'>
                    <li className='footer__list-item'>
                        <a className='footer__link' target="blank" href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
                    </li>
                    <li className='footer__list-item'>
                        <a className='footer__link' target='blank' href='https://github.com/hanneton'>Github</a>
                    </li>
                </ul>
            </div>
        </footer >
    )
}

export default Footer;