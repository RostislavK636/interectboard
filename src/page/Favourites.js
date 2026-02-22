import React from "react";
import { useSelector } from "react-redux";
import FavouriteCard from "../components/FavouriteCard/index";
import { CgSmileSad } from "react-icons/cg";

export default function Favourites(props) {
  const items = useSelector((state) => state.card.items);
  const board =
    items.length > 0 ? (
      items.map((catalog) => (
        <FavouriteCard
          key={catalog.id}
          catalog={catalog}
          showBoard={props.showBoard}
        />
      ))
    ) : (
      <div style={{ color: "#5c45df" }}>
        <h2>Пока что в избранном пусто</h2>
        <CgSmileSad fontSize='2rem' />
      </div>
    );
  return (
    <>
      <h1>Избранное</h1>
      <div className='div-favourites'>{board}</div>
    </>
  );
}
