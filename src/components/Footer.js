import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer(props) {
  const location = useLocation();
  return (
    <div className='footer'>
      <div className='contact'>
        <ul className='none'>
          <li>
            <b>Телефон: </b>+7 914 545 66 14
          </li>
          <li>
            <b>Почта: </b>
            <a href='mailto:info544@s.mfua.ru'>info544@s.mfua.ru</a>
          </li>
        </ul>
      </div>

      <div className='footer-nav'>
        <ul className='tab-ul'>
          <Link to='/interectboard'>
            <li
              className={props.active === 0 ? "active" : "null"}
              onClick={() => {
                props.showActive(0);
              }}
            >
              Главная
            </li>
          </Link>
          <li
            className={props.active === 1 ? "active" : "null"}
            onClick={() => {
              props.showActive(1);
            }}
          >
            О нас
          </li>
          {location.pathname !== "/interectboard/favourites" ? (
            <Link to='/interectboard/favourites' className='fovourite'>
              <li
                className={`fovourite-li ${props.active === 2 ? "active" : "null"}`}
                onClick={() => {
                  props.showActive(2);
                }}
              >
                Избранное
              </li>
            </Link>
          ) : null}

          <li
            className={props.active === 3 ? "active" : "null"}
            onClick={() => {
              props.showActive(3);
            }}
          >
            Войти
          </li>
        </ul>
      </div>
    </div>
  );
}
