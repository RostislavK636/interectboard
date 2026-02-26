import React from "react";
import style from "./Favourite.module.scss";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeItems } from "../../redux/slices/cardSlice";
import type { FavoriteItem } from "../../redux/slices/cardSlice";

interface FavouriteCardProps {
  catalog: FavoriteItem;
}

export default function FavouriteCard({ catalog }: FavouriteCardProps) {
  const dispatch = useDispatch();

  const removeBoard = () => {
    dispatch(removeItems(catalog.id));
  };
  return (
    <>
      <div className={style.root}>
        <img src={catalog.image} alt={catalog.title} width='150px' />
        <div>
          <h3>{catalog.title}</h3>
          <p className='desc'>{catalog.description}</p>
        </div>
        <FcLike className={style.heart} onClick={removeBoard} />
        <Link to={`/board/${catalog.id}`}>
          <button className='btn-card'>Перейти</button>
        </Link>
      </div>
    </>
  );
}
