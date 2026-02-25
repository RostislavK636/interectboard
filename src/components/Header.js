import React from "react";
import Search from "./Search/index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCard } from "../redux/slices/cardSlice.js";

export default function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items } = useSelector(selectCard);
  return (
    <div className='header-div'>
      <div className='logo-div'>
        <h2>LikeBoard</h2>
        <img
          src='https://cdn-icons-png.flaticon.com/512/10134/10134831.png'
          alt='logo'
        />
      </div>

      <Search />

      <ul className='nav'>
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
        <Link to='/interectboard/favourites' className='fovourite'>
          <li
            className={`fovourite-li ${props.active === 2 ? "active" : "null"}`}
            onClick={() => {
              props.showActive(2);
            }}
          >
            Избранное
          </li>
          <span className='index-favorite'>{items.length}</span>
        </Link>
        <li
          className={props.active === 3 ? "active" : "null"}
          onClick={() => {
            props.showActive(3);
          }}
        >
          Войти
        </li>
      </ul>

      <div
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
      <nav
        className={`menu ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ul>
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
          <Link to='/interectboard/favourites'>
            <li
              className={props.active === 2 ? "active" : "null"}
              onClick={() => {
                props.showActive(2);
              }}
            >
              Избранное
              <span className='index-favorite-humburger'>{items.length}</span>
            </li>
          </Link>
          <li
            className={props.active === 3 ? "active" : "null"}
            onClick={() => {
              props.showActive(3);
            }}
          >
            Войти
          </li>
        </ul>
      </nav>
    </div>
  );
}
