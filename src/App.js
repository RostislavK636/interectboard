import React, { useEffect, useState, createContext } from 'react'
import { Routes, Route } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setActiveFilter, setActiveSort, setPage } from './redux/slices/filterSlice'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer' 
import Catalog from './components/Catalog'
import FullBoard from './components/FullBoard'


export const SearchContext = createContext(null)

function App() {
  // Redux
  const activeFilter = useSelector(state => state.filter.activeFilter)
  const activeSort = useSelector(state => state.filter.activeSort)
  const page = useSelector(state => state.filter.page)
  const dispatch = useDispatch()

  // Local State
  const [active, setActive] = useState(0)
  const [search, setSearch] = useState('')
  const [showDisplay, setShowDisplay] = useState(false)
  const [getBoard, setGetBoard] = useState(null)
  const [catalog, setCatalog] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Handlers
  const showActive = (index) => {
    setActive(index)
  }

  const handleSetActiveFilter = (value) => {
    dispatch(setActiveFilter(value))
  }

  const handleShowList = (sortOption) => {
    dispatch(setActiveSort(sortOption))
    setShowDisplay(false)
  }

  const handlSetPage = (num) => {
    dispatch(setPage(num))
  }

  const showBoard = (board) => {
    setGetBoard(board)
  }

  // API Fetch
  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    
    const params = new URLSearchParams()
    params.append('l', 3)
    params.append('p', page)

    if (search) {
      params.append('search', search)
    }
    
    if (activeSort?.sortBy && activeSort?.order) {
      params.append('sortBy', activeSort.sortBy)
      params.append('order', activeSort.order)
    }

    if (activeFilter !== 0) {
      params.append('category', activeFilter)
    }
    
    const url = `https://698e3096aded595c25314dea.mockapi.io/boards?${params}`

    axios.get(url)
      .then(response => {
        setCatalog(response.data)
        setIsLoading(false)
        setHasError(false)
      })
      .catch((error) => {
        console.error('Ошибка запроса:', error)
        setCatalog([])
        setIsLoading(false)
        setHasError(true)
      })

  }, [activeFilter, activeSort, search, page])

  // Sort Options
  const sortOptions = [
    { sortBy: 'createdAt', order: 'asc', label: 'возрастанию даты' },
    { sortBy: 'createdAt', order: 'desc', label: 'убыванию даты' },
    { sortBy: 'rating', order: 'asc', label: 'возрастанию рейтинга' },
    { sortBy: 'rating', order: 'desc', label: 'убыванию рейтинга' },
  ]

  return (
    <div className="App">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Header
          showActive={showActive}
          active={active}
        />
        <Routes>
          <Route
            path="/interectboard"
            element={
              <Catalog
                catalog={catalog}
                isLoading={isLoading}
                hasError={hasError}
                setActiveFilter={handleSetActiveFilter}
                activeFilter={activeFilter}
                sortOptions={sortOptions}
                showList={handleShowList}
                setShowDisplay={setShowDisplay}
                showDisplay={showDisplay}
                showSort={activeSort.label}
                showBoard={showBoard}
                setPage={handlSetPage}
              />
            }
          />
          <Route
            path="/board/:boardId"
            element={<FullBoard board={getBoard} />}
          />
        </Routes>
        <Footer showActive={showActive} active={active} />
      </SearchContext.Provider>
    </div>
  )
}

export default App
