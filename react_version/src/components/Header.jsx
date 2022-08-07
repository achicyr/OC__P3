import { useContext, useState } from 'react'
import { AuthContext } from '../utils/auth'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'


export default function Header() {
    let { setToken, token, user} = useContext(AuthContext)
	let [Content, setContent] = useState()

    return (
        <header className="header">
            <Link to="/" className="header__retourBtn"></Link>
            {/* header.header>img.header__logo[src="assets/images/logo/ohmyfood.png" alt="logo OhMyFood: commande de repas gastronomique en ligne 100% mobile."] */}
            <img src="assets/images/logo/ohmyfood.png" alt="logo OhMyFood: commande de repas gastronomique en ligne 100% mobile." className="header__logo" />
            {/*DÉPOSER CI-DESSOUS DU HTML CORRESPONDANT À DU CONTENU STATIQUE(MENU PRIMAIRE SECONDAIRE, LOGO ET ETC)*/}
            {/*DÉPOSER CI-DESSOUS DES ABBRÉVIATIONS  SNIPPETS POUR GÉNÉRER DES MENU DYNAMIQUE (ET STATIQUE)*/}
            {/**/}
            <section className="header__secondaryMenu">
                {!token && <>
                    <Link to="/login" path="login">Login</Link>
                    <Link to="/signup" path="signup">Signup</Link>
                </>}
                {token &&
                    <Link to="/logout" path="logout">Logout</Link>
                }
                {token && user.role=="2" &&
                    <Link to="/menu/new">+</Link>
                }
            </section>

        </header>
    )
}
