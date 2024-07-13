import React from 'react'
import styles from "./Cell.module.css";

function Cell({value, onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>{value}</button>
  )
}

export default Cell
