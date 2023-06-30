import React from "react"
import SearchBar from "../SearchBar/SearchBar"
import styles from "./NavBar.module.css"
import { Link, NavLink } from "react-router-dom"

export default function NavBar() {
    return (
        <div className={styles.divContenedorSearchBar}>

            <Link to='/'>
                <button className={styles.botonesNav}>LANDING PAGE</button>
            </Link>
            <Link to='/home'>
                <button className={styles.botonesNav}>HOME</button>
            </Link>

            <NavLink to='/about' >
                <button className={styles.botonesNav}>ABOUT</button>
            </NavLink>
            <SearchBar/>
        </div>
    )
}