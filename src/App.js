import React, { useEffect, useState, createContext} from 'react'
import {Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer' 
import Catalog from './components/Catalog'
import FullBoard from './components/FullBoard'

export const SerchContent = createContext(null)

function App() {

    // header and footer
  const[active, setActive] = useState(0)

  const showActive = (index) => {
    setActive(index)
  }



// filter category
  const [activeFilter, setActiveFilter] = useState(0)
  
  
  
// sort category
  const sotrName = [
      { sortBy: 'createdAt', order: 'asc', label: 'возрастанию даты' },
      { sortBy: 'createdAt', order: 'desc', label: 'убыванию даты' },
      { sortBy: 'rating', order: 'asc', label: 'возрастанию рейтинга' },
      { sortBy: 'rating', order: 'desc', label: 'убыванию рейтинга' },
  ]

  const [showSort, setShowSort] = useState(sotrName[0].label)
  const [showSortId, setShowSortId] = useState(sotrName[0])
  const [showDisplay, setShowDisplay] = useState(false)
  const showList = (name) => {
      setShowSort(name.label)
      setShowSortId(name)
      setShowDisplay(false)
  }


// get active board before click to card
  const [getBoard, setGetBoard] = useState(null)
  const showBoard = (board) => {
      setGetBoard(board);
  }


  // search controled
  
  const [search, setSearch] = useState('')


  const [page, setPage] = useState(1)
  // mockapi
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    
    const params = new URLSearchParams()
    
    // Всегда добавляем лимит
    params.append('l', 3)
    
    // Поиск только если есть текст
    if (search) {
      params.append('search', search)
    }
    
    // Сортировка - добавляем только если выбрана
    if (showSortId?.sortBy && showSortId?.order) {
      params.append('sortBy', showSortId.sortBy)
      params.append('order', showSortId.order)
    }
    
    // В зависимости от фильтра добавляем разные параметры
    if (activeFilter !== 0) {
      params.append('category', activeFilter)
    }
    
    const url = `https://698e3096aded595c25314dea.mockapi.io/boards?${params}`
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCatalog(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Ошибка запроса:', error)
        setIsLoading(false)
      })
  }, [activeFilter, showSortId, search, page])


  return (
    <div className="App">
      <SerchContent.Provider value={{search, setSearch}} >
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
              setActiveFilter={setActiveFilter}
              activeFilter={activeFilter}
              sotrName={sotrName}
              showList={showList}
              setShowDisplay={setShowDisplay}
              showDisplay={showDisplay}
              showSort={showSort}
              showBoard={showBoard}
              setPage={setPage}
            />
          } 
        />        
        <Route path="/board/:boardId" element={
          <FullBoard board={getBoard}/>} 
        />
      </Routes> 
      <Footer showActive={showActive} active={active}/>
      </SerchContent.Provider>
    </div>
  );
}

export default App;
