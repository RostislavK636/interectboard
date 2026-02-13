import React from 'react'
import { Link } from "react-router-dom";



export default function index({catalog, showBoard}) {
  if (!catalog) return null;
  return (
    <div>   
        <div className='card-board' >
          
            <img src={catalog.image} alt={catalog.title}/>
            <h3>{catalog.title}</h3>
            <p className='desc'>{catalog.description}</p>
            <p><b>{catalog.createdAt}</b></p>
            <Link 
                to={`/board/${catalog.id}`}>
                <button className='btn-card' onClick={() => {showBoard(catalog)}}>Перейти</button>
            </Link>
        </div>       
    </div>
  )
}
// onClick={() => props.showBoard(catalog)}