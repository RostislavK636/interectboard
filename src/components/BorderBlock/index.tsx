import React from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItems, selectCard } from "../../redux/slices/cardSlice";
import type { Board } from "../../redux/slices/BorderSlice";

interface Catalog {
  catalog: Board;
}

export default function BoardCard({ catalog }: Catalog) {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCard);

  if (!catalog) return null;

  const { id, image, title, description, createdAt } = catalog;
  const like = items.some((item: any) => item.id === id);

  const onClickRemove = () => {
    dispatch(removeItems(id));
  };

  const onClickAdd = () => {
    const item = {
      id,
      image,
      title,
      description,
    };
    dispatch(addItem(item));
  };
  return (
    <div className='card-board'>
      <img src={image} alt={title} />
      {like ? (
        <FcLike className='like-board' onClick={onClickRemove} />
      ) : (
        <CiHeart onClick={onClickAdd} className='like-board' />
      )}
      <h3>{title}</h3>
      <p className='desc'>{description}</p>
      <p>
        <b>{createdAt}</b>
      </p>
      <Link to={`/interectboard/board/${id}`}>
        <button className='btn-card'>Перейти</button>
      </Link>
    </div>
  );
}
