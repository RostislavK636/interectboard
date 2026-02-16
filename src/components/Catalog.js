import React from 'react'
import Skeleton from './BorderBlock/Skeleton.js'
import Border from './BorderBlock/index.js'
import Pagination from './Pagination/index.js'

export default function Catalog(props) {
  const boards = Array.isArray(props.catalog)
    ? props.catalog.map(catalog => (
        <Border
          key={catalog.id}
          catalog={catalog}
          showBoard={props.showBoard}
        />
      ))
    : <h2>По вашему запросу ничего не найдено</h2>

  return (
    <>
      <h1>Каталог всех доступных досок</h1>

      <div className="filter-div">
        <ul className='filters'>
          <li className={props.activeFilter === 0 ? 'active-filter' : 'null'} onClick={() => {props.setActiveFilter(0)}}>Все</li>
          <li className={props.activeFilter === 1 ? 'active-filter' : 'null'} onClick={() => {props.setActiveFilter(1)}}>Математика</li>
          <li className={props.activeFilter === 2 ? 'active-filter' : 'null'} onClick={() => {props.setActiveFilter(2)}}>Русский</li>
          <li className={props.activeFilter === 3 ? 'active-filter' : 'null'} onClick={() => {props.setActiveFilter(3)}}>Физика</li>
          <li className={props.activeFilter === 4 ? 'active-filter' : 'null'} onClick={() => {props.setActiveFilter(4)}}>Химия</li>
          <li className={props.activeFilter === 5 ? 'active-filter' : 'null'} onClick={() => {props.setActiveFilter(5)}}>Программирование</li>
        </ul>

        <p>Сортировка по <button className='btn-sort' onClick={() => {props.setShowDisplay(!props.showDisplay)}}>{props.showSort}</button>▾</p>

        <div className={props.showDisplay ? 'sort-list-on' : 'sort-list-off'}>
          <ul>
            <li onClick={() => {props.showList(props.sortOptions[0])}}>{props.sortOptions[0].label}</li>
            <li onClick={() => {props.showList(props.sortOptions[1])}}>{props.sortOptions[1].label}</li>
            <li onClick={() => {props.showList(props.sortOptions[2])}}>{props.sortOptions[2].label}</li>
            <li onClick={() => {props.showList(props.sortOptions[3])}}>{props.sortOptions[3].label}</li>
          </ul>
        </div>
      </div>

      <div className='catalog'>
        {
          props.isLoading
            ? [...new Array(3)].map((_, index) => <Skeleton key={index} />)
            : boards
        }
      </div>

      <Pagination page={(el) => props.setPage(el)} />
    </>
    )
}