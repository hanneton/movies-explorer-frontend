import './Promo.css';

function Promo() {
    return (
        <section className='promo content__promo'>
            <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
            <ul className='promo__links'>
                <li className='promo__item'>
                    <a className="promo__link" href='#about-project'>О проекте</a>
                </li>
                <li className='promo__item'>
                    <a className="promo__link" href='#techs'>Технологии</a>
                </li>
                <li className='promo__item'>
                    <a className="promo__link" href='#student'>Студент</a>
                </li>
            </ul>
        </section>
    )
}

export default Promo;