import React, { useEffect, useState} from 'react'
import {Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer' 
import Catalog from './components/Catalog'
import FullBoard from './components/FullBoard'

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
      {id:'sortBy=createdAt&order=asc', label: 'возрастанию даты' },
      {id:'sortBy=createdAt&order=desc', label: 'убыванию даты' },
      {id:'sortBy=rating&order=asc', label: 'возрастанию рейтинга' },
      {id:'sortBy=rating&order=desc', label: 'убыванию рейтинга' },
  ]

  const [showSort, setShowSort] = useState(sotrName[0].label)
  const [showSortId, setShowSortId] = useState()
  const [showDisplay, setShowDisplay] = useState(false)
  const showList = (name) => {
      setShowSort(name.label)
      setShowSortId(name.id)
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
  console.log(page)

  // mockapi
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetch(activeFilter === 0 ? `https://698e3096aded595c25314dea.mockapi.io/boards?p=${page}&l=3&search=${search}&${showSortId}` : `https://698e3096aded595c25314dea.mockapi.io/boards?category=${activeFilter}&${showSortId}&search=${search}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setCatalog(data);
      setIsLoading(false)
    });
  }, [activeFilter, showSortId, search, page])


  return (
    <div className="App">
      <Header
        showActive={showActive}
        active={active}
        search={search}
        setSearch={setSearch}
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
              search={search}
              setPage={setPage}
            />
          } 
        />        
        <Route path="/board/:boardId" element={
          <FullBoard board={getBoard}/>} 
        />
      </Routes> 
      
  
      
      <Footer showActive={showActive} active={active}/>
    </div>
  );
}

export default App;
