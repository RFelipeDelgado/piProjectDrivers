import React from "react";
import { useEffect } from "react";
import { firstCallDrivers } from "../../actions";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { useDispatch } from "react-redux";

const URLBack =
  "https://www.wsupercars.com/wallpapers-regular/Formula-1/Alpine/2023-Formula1-Alpine-A523-005-1080.jpg";

export default function LandingPage() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(firstCallDrivers())
}, [dispatch])

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${URLBack})` }}
    >
      <div className={styles.landingBox}>
        <h1 className={styles.title}>Bienvenido!</h1>
        <Link to="/home" className={styles.buttonLink}>
          <button className={styles.button}>
            Ingresar
          </button>
        </Link>
      </div>
    </div>
  );
}
