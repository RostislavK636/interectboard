import React from 'react'
import Search from './Search/index.js'

 

export default function Header(props) {
    return(
        <div className='header-div'>
        
        <div className="logo-div">
            <h2>LikeBoard</h2>
            <img src='https://cdn-icons-png.flaticon.com/512/10134/10134831.png' alt='logo'/>
        </div>

        <Search search={props.search} setSearch={props.setSearch}/>

        <ul className='nav'>
            <li className={props.active === 0 ? 'active' : 'null'} onClick={() => {props.showActive(0)}}>Главная</li>
            <li className={props.active === 1 ? 'active' : 'null'} onClick={() => {props.showActive(1)}}>О нас</li>
            <li className={props.active === 2 ? 'active' : 'null'} onClick={() => {props.showActive(2)}}>Войти</li>
        </ul>

        </div>
    )
}