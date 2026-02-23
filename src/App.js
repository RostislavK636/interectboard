import React, {
  useEffect,
  useState,
  createContext,
  useRef,
  useCallback,
} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveFilter,
  setPage,
  setSearch,
  setFilters,
} from "./redux/slices/filterSlice";
import { fetchBoards } from "./redux/slices/BorderSlice.js";
import qs from "qs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FullBoard from "./components/FullBoard";
import Home from "./page/Home";
import Favourites from "./page/Favourites.js";

export const SearchContext = createContext(null);

function App() {
  const nav = useNavigate();

  // Redux
  const activeFilter = useSelector((state) => state.filter.activeFilter);
  const activeSort = useSelector((state) => state.filter.activeSort);
  const page = useSelector((state) => state.filter.page);
  const search = useSelector((state) => state.filter.search);
  const { borders, status } = useSelector((state) => state.border);
  const dispatch = useDispatch();

  // Local state
  const [active, setActive] = useState(0);
  const [getBoard, setGetBoard] = useState(null);
  const isLoading = status === "loading";
  const hasError = status === "error";
  const catalog = borders;

  // Handlers
  const showActive = (index) => {
    setActive(index);
  };

  const handleSetActiveFilter = (value) => {
    dispatch(setActiveFilter(value));
  };

  const handlSetPage = (num) => {
    dispatch(setPage(num));
  };

  const handlSetSearch = (str) => {
    dispatch(setSearch(str));
  };

  const showBoard = (board) => {
    setGetBoard(board);
  };

  // Flags to prevent duplicate API calls on mount
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // Fetch boards from API
  const getApi = useCallback(() => {
    dispatch(
      fetchBoards({
        page,
        search,
        activeSort,
        activeFilter,
      }),
    );
  }, [activeFilter, activeSort, search, page, dispatch]);

  // Call API when filters change
  useEffect(() => {
    if (!isSearch.current) {
      window.scroll(0, 0);
      getApi();
    }
    isSearch.current = false;
  }, [activeFilter, activeSort, search, page, getApi]);

  // Restore state from URL on mount
  useEffect(() => {
    if (window.location.search) {
      const param = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(param));
    }
    isSearch.current = true;
  }, [dispatch]);

  // Save state to URL when filters change
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        filter: activeFilter,
        sortBy: activeSort.sortBy,
        order: activeSort.order,
        label: activeSort.label,
        page,
        search,
      });
      nav(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeFilter, activeSort, page, search, nav]);

  return (
    <div className='App'>
      <SearchContext.Provider value={{ search, handlSetSearch }}>
        <Header showActive={showActive} active={active} />
        <Routes>
          <Route
            path='/interectboard'
            element={
              <Home
                catalog={catalog}
                isLoading={isLoading}
                hasError={hasError}
                setActiveFilter={handleSetActiveFilter}
                activeFilter={activeFilter}
                showSort={activeSort.label}
                showBoard={showBoard}
                setPage={handlSetPage}
              />
            }
          />
          <Route
            path='/board/:boardId'
            element={<FullBoard board={getBoard} />}
          />
          <Route
            path='/interectboard/favourites'
            element={<Favourites showBoard={showBoard} />}
          />
        </Routes>
        <Footer showActive={showActive} active={active} />
      </SearchContext.Provider>
    </div>
  );
}

export default App;
