import React from "react";
import Search from "./Search/index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCard } from "../redux/slices/cardSlice";

interface HeaderProps {
  active: number;
  showActive: (value: number) => void;
}

export default function Header({ active, showActive }: HeaderProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const { items } = useSelector(selectCard);
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [items]);
  return (
    <div className='header-div'>
      <Link to='/interectboard'>
        <div
          className='logo-div'
          onClick={() => {
            showActive(0);
          }}
        >
          <h2>LikeBoard</h2>
          <img
            src='https://cdn-icons-png.flaticon.com/512/10134/10134831.png'
            alt='logo'
          />
        </div>
      </Link>

      {location.pathname.startsWith("/interectboard/board/") ? null : (
        <Search />
      )}

      <ul className='nav'>
        <Link to='/interectboard'>
          <li
            className={active === 0 ? "active" : "null"}
            onClick={() => {
              showActive(0);
            }}
          >
            Главная
          </li>
        </Link>
        <li
          className={active === 1 ? "active" : "null"}
          onClick={() => {
            showActive(1);
          }}
        >
          О нас
        </li>
        {location.pathname !== "/interectboard/favourites" ? (
          <Link to='/interectboard/favourites' className='fovourite'>
            <li
              className={`fovourite-li ${active === 2 ? "active" : "null"}`}
              onClick={() => {
                showActive(2);
              }}
            >
              Избранное
            </li>
            <span className='index-favorite'>{items.length}</span>
          </Link>
        ) : null}
        <li
          className={active === 3 ? "active" : "null"}
          onClick={() => {
            showActive(3);
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
              className={active === 0 ? "active" : "null"}
              onClick={() => {
                showActive(0);
              }}
            >
              Главная
            </li>
          </Link>
          <li
            className={active === 1 ? "active" : "null"}
            onClick={() => {
              showActive(1);
            }}
          >
            О нас
          </li>
          {location.pathname !== "/interectboard/favourites" ? (
            <Link to='/interectboard/favourites' className='fovourite'>
              <li
                className={`fovourite-li ${active === 2 ? "active" : "null"}`}
                onClick={() => {
                  showActive(2);
                }}
              >
                Избранное
              </li>
              <span className='index-favorite-hamburger'>{items.length}</span>
            </Link>
          ) : null}
          <li
            className={active === 3 ? "active" : "null"}
            onClick={() => {
              showActive(3);
            }}
          >
            Войти
          </li>
        </ul>
      </nav>
    </div>
  );
}
