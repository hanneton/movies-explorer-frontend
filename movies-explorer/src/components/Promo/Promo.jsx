import './Promo.css';

function Promo() {
    return (
        <section className='promo content__promo'>
            <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
            <div className='promo__links'>
                <a className="promo__link" href='#about-project'>О проекте</a>
                <a className="promo__link" href='#techs'>Технологии</a>
                <a className="promo__link" href='#student'>Студент</a>
            </div>
        </section>
    )
}

export default Promo;