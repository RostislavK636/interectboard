import React from 'react'

export default function Footer(props) {
    return(
        <div className='footer'>
            <div className="contact">
                <ul className='tab-ul'>
                    <li><b>Телефон: </b>+7 914 545 66 14</li>
                    <li><b>Почта: </b><a href='info544@s.mfua.ru'>info544@s.mfua.ru</a></li>
                </ul>
            </div>

            <div className='footer-nav'>
                <ul className='tab-ul'>
                    <li className={props.active === 0 ? 'active' : 'null'} onClick={() => {props.showActive(0)}}>Главная</li>
            <li className={props.active === 1 ? 'active' : 'null'} onClick={() => {props.showActive(1)}}>О нас</li>
            <li className={props.active === 2 ? 'active' : 'null'} onClick={() => {props.showActive(2)}}>Войти</li>               
                </ul>
            </div>
        </div>
    )
}