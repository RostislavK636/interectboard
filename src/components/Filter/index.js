import React from 'react'
import style from './Filter.module.scss'

export default function Filter(props) {
  const { setShowDisplay } = props
  const sortRef = React.useRef()

  React.useEffect(() => {
    const handlClickOutside = (event) => {
      if(!event.composedPath().includes(sortRef.current)){
        setShowDisplay(false);
      }
    }
    document.body.addEventListener('click', handlClickOutside)

    return () => {
      document.body.removeEventListener('click', handlClickOutside)
    }
  }, [setShowDisplay])
  return (
    <div className={style.root}>
      <ul className={style.filter}>
        <li className={props.activeFilter === 0 ? (style.active) : 'null'} onClick={() => {props.setActiveFilter(0)}}>Все</li>
        <li className={props.activeFilter === 1 ? (style.active) : 'null'} onClick={() => {props.setActiveFilter(1)}}>Математика</li>
        <li className={props.activeFilter === 2 ? (style.active) : 'null'} onClick={() => {props.setActiveFilter(2)}}>Русский</li>
        <li className={props.activeFilter === 3 ? (style.active) : 'null'} onClick={() => {props.setActiveFilter(3)}}>Физика</li>
        <li className={props.activeFilter === 4 ? (style.active) : 'null'} onClick={() => {props.setActiveFilter(4)}}>Химия</li>
        <li className={props.activeFilter === 5 ? (style.active) : 'null'} onClick={() => {props.setActiveFilter(5)}}>Программирование</li>
      </ul>

      <div ref={sortRef}>
        <p>Сортировка по <button className={style.btn_sort} onClick={() => {setShowDisplay(!props.showDisplay)}}>{props.showSort}</button>▾</p>

        <div className={props.showDisplay ? (style.sort_on) : (style.sort_off)}>
          <ul>
            <li onClick={() => {props.showList(props.sortOptions[0])}}>{props.sortOptions[0].label}</li>
            <li onClick={() => {props.showList(props.sortOptions[1])}}>{props.sortOptions[1].label}</li>
            <li onClick={() => {props.showList(props.sortOptions[2])}}>{props.sortOptions[2].label}</li>
            <li onClick={() => {props.showList(props.sortOptions[3])}}>{props.sortOptions[3].label}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
