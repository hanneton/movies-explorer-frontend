import './Main.css'
import Promo from '../Promo/Promo'
import NavTab from '../NavTab/NavTab'
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'


function Main() {
    return (
        <>
            <Header />
            <main className='content'>
                <Promo />
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
            </main>
            <Footer />
        </>
    )
}

export default Main