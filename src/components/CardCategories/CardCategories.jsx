import React from "react";
import styles from "./cardCategories.module.css";
import { Link } from "react-router-dom";
function CardCategories({ category }) {
  return (
    <Link className={styles.card}>
      <img src={category?.icons[0]?.url} alt="category"></img>
      <p>{category?.name}</p>
    </Link>
  );
}

export default CardCategories;
