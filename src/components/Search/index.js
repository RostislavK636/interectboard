import React from 'react'
import style from './Search.module.scss'
import debounce from 'lodash.debounce';
import { CiSearch } from "react-icons/ci"
import { IoMdClose } from "react-icons/io";
import { SearchContext } from '../../App'

export default function Search() {
  const {setSearch } = React.useContext(SearchContext)
  const [value, setValue] = React.useState('')
  const [activeInput, setActiveInput] = React.useState(false)
  const inputRef = React.useRef() 

  const clickInput = () => {
    setActiveInput(false)
    setSearch('')
    setValue('')
    inputRef.current.focus()
  }

  const updateInput = React.useMemo(() =>
    debounce((str) => {
      setSearch(str)
    }, 1000),
    [setSearch],
  )

  const changInput = (event) =>{
    setValue(event.target.value)
    updateInput(event.target.value)
  }


  return (
    <div className={style.root}>
      <div className={style.media}>
        <CiSearch className={style.icon_seacrh} />
        <input
          ref={inputRef}
          className={style.inputs}
          placeholder='Введите название...'
          onChange={changInput}
          onClick={() => setActiveInput(true)}
          value={value}
          id="search"
          name="search"
        />
        <IoMdClose className={activeInput ? (style.icon_close) : (style.non)} onClick={() => clickInput()}/>
      </div>
    </div>
  )
}