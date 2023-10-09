import './Portfolio.css';
function Portfolio() {
    return (
        <>
            <h3 className='about-me__portfolio-heading'>Портфолио</h3>
            <nav>
                <ul className='about-me__list'>
                    <li className='about-me__list-item'>
                        <a className='about-me__portfolio-link' target="blank" href='https://github.com/hanneton/how-to-learn'>
                            Статичный сайт
                        </a>
                    </li>
                    <li className='about-me__list-item'>
                        <a className='about-me__portfolio-link' target="blank" href='https://hanneton.github.io/russian-travel/index.html'>
                            Адаптивный сайт
                        </a>
                    </li>
                    <li className='about-me__list-item'>
                        <a className='about-me__portfolio-link' target="blank" href='https://hanneton.github.io/mesto/index.html'>
                            Одностраничное приложение
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Portfolio