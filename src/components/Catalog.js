import React from 'react'


export default function Catalog(props) {
    return(
        <>
        <h1>Каталог всех досупных досок</h1>
        <div className='catalog'>
            {props.catalog.map((catalog) => (
                <div className='card-board' key={catalog.id}>
                    <img src={catalog.image} alt={catalog.title}/>
                    <h3>{catalog.title}</h3>
                    <p className='desc'>{catalog.description}</p>
                    <p><b>{catalog.createdAt}</b></p>
                    <button onClick={() => props.showBoard(catalog)}>Перейти</button>
                </div>
            ))}
        </div>
        </>
    )
}