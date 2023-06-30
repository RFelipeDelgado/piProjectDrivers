import React from "react";
import styles from "./About.module.css"
import { Link } from "react-router-dom";
const img = "https://static.wixstatic.com/media/228c57_3d2a9e78a3e348d8ad940564a3f3d73c~mv2.jpg/v1/fill/w_2438,h_2438,al_c,q_85/228c57_3d2a9e78a3e348d8ad940564a3f3d73c~mv2.jpg"

const About = () => {
    return (
        <div className={styles.divPadre}>
            <div className={styles.card}>
                <h1>Autor: Raúl Felipe Delgado</h1>
                <img className={styles.imgAbout} src={img}></img>
                <h2>Nacionalidad: Chileno</h2>
                <h2>Cohorte 38a</h2>
                <p>Músico de profesión, buscando ampliar horizontes mediante la gran oportunidad que es soyHenry. </p>
                <h2>Correo de contacto: raulfeliped@hotmail.com</h2>
                <h2>PI soyHenry, 2023-06-21</h2>
                <Link to="/home">
                    <button>HOME</button>
                </Link>
            </div>
        </div>
    )
}

export default About