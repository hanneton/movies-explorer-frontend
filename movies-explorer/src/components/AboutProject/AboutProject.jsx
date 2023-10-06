import './AboutProject.css';

function AboutProject() {
    return (
        <section id="about-project" className='about content__about'>
            <h2 className="heading about__heading">О проекте</h2>
            <div className='about__container'>
                <div className="about__text">
                    <h3 className="about__subheading">Дипломный проект включал 5 этапов</h3>
                    <p className="about__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about__text">
                    <h3 className="about__subheading">На выполнение диплома ушло 5 недель</h3>
                    <p className="about__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='about-progress-bar about__about-progress-bar'>
                <p className='about-progress-bar__backend-label'>1 неделя</p>
                <p className='about-progress-bar__frontend-label'>4 недели</p>
            </div>
            <div className='about-progress-captions about__about-progress-captions'>
                <p className='about-progress-bar__backend-caption'>Back-end</p>
                <p className='about-progress-bar__frontend-caption'>Front-end</p>
            </div>


        </section>
    )
}

export default AboutProject