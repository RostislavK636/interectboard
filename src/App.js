import React, {use, useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer' 
import Catalog from './components/Catalog'
import FullBoard from './components/FullBoard'

function App() {

  const [catalog, setCatalog] = useState([]);

  fetch('https://698e3096aded595c25314dea.mockapi.io/boards')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    setCatalog(data);
  });

  const [ifFull, setIsFull] = useState(false);
  const [getBoard, setGetBoard] = useState(null)

  const showBoard = (catalog) => {
    if(catalog){
      setIsFull(true);
      setGetBoard(catalog);
    } else {
      setIsFull(false);
      setGetBoard(null)
    }
  }

  const[active, setActive] = useState(0)

  const showActive = (index) => {
    setActive(index)
  }



  return (
    <div className="App">
      <Header showActive={showActive} active={active}/>
      {ifFull ? <FullBoard board={getBoard} showBoard={showBoard}/>: <Catalog catalog={catalog} showBoard={showBoard}/>  }
      <Footer showActive={showActive} active={active}/>
    </div>
  );
}

export default App;
