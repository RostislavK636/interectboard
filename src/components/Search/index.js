import React from 'react'
import style from './Search.module.scss'
import { CiSearch } from "react-icons/ci";
import {SerchContent} from '../../App'

export default function Search() {
  const {search, setSearch} = React.useContext(SerchContent)
  return (
    <>
        <div className={style.root}>
            <CiSearch className={style.icon_seacrh}/>
            <input className={style.inputs} placeholder='Введите название...' onChange={(event) => setSearch(event.target.value)} value={search} id="search" name="search"/>
        </div>
    </>
  )
}


