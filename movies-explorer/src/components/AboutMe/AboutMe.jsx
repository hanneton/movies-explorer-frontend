import Portfolio from '../Portfolio/Portfolio'
import './AboutMe.css'
import personalPhoto from '../../images/personal-photo.jpg'

function AboutMe() {
    return (
        <section id="student" className="about-me content__about-me">
            <h2 className="heading about-me__heading">Студент</h2>
            <div className='about-me__container'>
                <div className='about-me__text'>
                    <h3 className='about-me__name'>Антон</h3>
                    <h4 className='about-me__field'>Фронтенд-разработчик, 28 лет</h4>
                    <p className='about-me__info'>Я родился и живу в Петербурге, закончил факультет географии РГПУ. Я люблю смотреть кино, в особенности новую советскую волну, а также торговать на бирже. Недавно начал кодить.
                        С&nbsp;ноября 2022 года начал проходить курс по веб-разработке в Яндекс.Практикум, а этот сайт – дипломный проект.</p>
                    <a href="https://github.com/hanneton" target='blank' className='about-me__github-link'>Github</a>
                </div>
                <img className='about-me__personal-photo' src={personalPhoto} alt="Фотография автора" />
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe