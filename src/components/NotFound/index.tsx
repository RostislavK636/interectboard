import React from "react";
import style from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={style.root}>
      <h2>По вашему запросу ничего не найдено</h2>
      <p>Вернутесь на главную страницу и попробуйте снова</p>
    </div>
  );
}
