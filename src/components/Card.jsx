import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
export default function Card({ id }) {
  return (
    <Link className={style.cardContent} to={`./songs/${id}  `}>
      <div className={style.cardImg}>
        <img src="./banner1.jpg" />
      </div>
      <div className={style.cardText}>
        <p className={style.cardHeader}>Night Changes</p>
        <p className={style.cardDescription}>One Direction</p>
      </div>
    </Link>
  );
}
