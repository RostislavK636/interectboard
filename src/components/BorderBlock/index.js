import React from 'react'
import { Link } from "react-router-dom"
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";

export default function BoardCard({ catalog, showBoard }) {
  const [like, setLike] = React.useState(false)
  
  if (!catalog) return null;
  // const isLike = (like ? <CiHeart className='like-board' onClick={() => {setLike(!like)}}/> : <FcLike />)

  return (
    <div className='card-board'>
      <img src={catalog.image} alt={catalog.title} />
      {like ? <FcLike className='like-board' onClick={() => setLike(false)}/> : <CiHeart className='like-board' onClick={() => setLike(true)}/>}
      <h3>{catalog.title}</h3>
      <p className='desc'>{catalog.description}</p>
      <p><b>{catalog.createdAt}</b></p>
      <Link to={`/board/${catalog.id}`}>
        <button className='btn-card' onClick={() => {showBoard(catalog)}}>Перейти</button>
      </Link>
    </div>
  )
}