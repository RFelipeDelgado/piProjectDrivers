import React from "react";
import styles from "./Card.module.css";

export default function Card({ name, image, teams, dob, createdInDb, Teams }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{name}</h3>
      { createdInDb ? 
        <p>{Teams.map((team) => team.name).join(", ")}</p>
        :
        <p>{teams}</p>
      }
      <h5>{dob}</h5>
      <img src={image} alt="no hay img" className={styles.image} />
    </div>
  );
}