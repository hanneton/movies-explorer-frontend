import Portfolio from '../Portfolio/Portfolio'
import './AboutMe.css'
import personalPhoto from '../../images/personal-photo.jpg'

function AboutMe() {
    return (
        <section id="student" className="about-me content__about-me">
            <h2 className="heading about-me__heading">Студент</h2>
            <div className='about-me__container'>
                <div className='about-me__text'>
                    <h3 className='about-me__name'>Виталий</h3>
                    <h4 className='about-me__field'>Фронтенд-разработчик, 30 лет</h4>
                    <p className='about-me__info'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                        С&nbsp;2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a href="https://github.com/hanneton" target='blank' className='about-me__github-link'>Github</a>
                </div>
                <img className='about-me__personal-photo' src={personalPhoto} alt="Фотография автора" />
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe