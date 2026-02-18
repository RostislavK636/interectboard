import React, { useState }from 'react'
import { useDispatch } from 'react-redux'
import {setActiveSort} from '../redux/slices/filterSlice'
import Pagination from '../components/Pagination/index.js'
import Catalog from '../components/Catalog'
import Filter from '../components/Filter/index.js'

export default function Home(props) {
    const dispatch = useDispatch()
    const [showDisplay, setShowDisplay] = useState(false)

  const handleShowList = (sortOption) => {
    dispatch(setActiveSort(sortOption))
    setShowDisplay(false)
  }

  // Sort options
  const sortOptions = [
    { sortBy: 'createdAt', order: 'asc', label: 'возрастанию даты' },
    { sortBy: 'createdAt', order: 'desc', label: 'убыванию даты' },
    { sortBy: 'rating', order: 'asc', label: 'возрастанию рейтинга' },
    { sortBy: 'rating', order: 'desc', label: 'убыванию рейтинга' },
  ]

  return (
    <>
    <h1>Каталог всех доступных досок</h1>

    <Filter 
      showList={handleShowList}
      setActiveFilter={props.setActiveFilter}
      activeFilter={props.activeFilter}
      setShowDisplay={setShowDisplay} 
      showDisplay={showDisplay}
      showSort={props.showSort}
      sortOptions={sortOptions}
    />

    <Catalog 
      catalog={props.catalog}  
      isLoading={props.isLoading}
      hasError={props.hasError}
      showBoard={props.showBoard}
    />

    <Pagination page={(el) => props.setPage(el)} />
    </>
  )
}
