import React from 'react'
import style from './Search.module.scss'
import debounce from 'lodash.debounce';
import { CiSearch } from "react-icons/ci"
import { IoMdClose } from "react-icons/io";
import { SearchContext } from '../../App'

export default function Search() {
  const { search, handlSetSearch } = React.useContext(SearchContext)
  const [value, setValue] = React.useState(search || '')
  const [activeInput, setActiveInput] = React.useState(false)
  const inputRef = React.useRef()

  // Синхронизируем input с Redux state при изменении
  React.useEffect(() => {
    setValue(search || '')
  }, [search]) 

  const clickInput = () => {
    setActiveInput(false)
    handlSetSearch('')
    setValue('')
    inputRef.current.focus()
  }

  const updateInput = React.useMemo(() =>
    debounce((str) => {
      handlSetSearch(str)
    }, 1000),
    [handlSetSearch],
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