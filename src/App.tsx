import React, { useEffect, useState, useRef, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  setActiveFilter,
  setPage,
  setFilters,
  selectFilter,
} from "./redux/slices/filterSlice";
import { fetchBoards, selectBorder } from "./redux/slices/BorderSlice";
import qs from "qs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FullBoard from "./components/FullBoard";
import Home from "./page/Home";
import Favourites from "./page/Favourites";
import NotFound from "./components/NotFound/index";
import { useAppDispatch } from "./redux/store";

function App() {
  const nav = useNavigate();

  // Redux
  const { activeFilter, activeSort, page, search } = useSelector(selectFilter);
  const { borders, status } = useSelector(selectBorder);
  const dispatch = useAppDispatch();

  // Local state
  const [active, setActive] = useState(0);
  const isLoading = status === "loading";
  const hasError = status === "error";
  const catalog = borders;

  // Handlers
  const showActive: (index: number) => void = (index) => {
    setActive(index);
  };

  const handleSetActiveFilter: (value: number) => void = (value) => {
    dispatch(setActiveFilter(value));
  };

  const handlSetPage: (num: number) => void = (num) => {
    dispatch(setPage(num));
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
        activeSort: {
          ...activeSort,
          order: activeSort.order as "asc" | "desc",
        },
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
              setPage={handlSetPage}
            />
          }
        />
        <Route path='/interectboard/board/:boardId' element={<FullBoard />} />
        <Route path='/interectboard/favourites' element={<Favourites />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer showActive={showActive} active={active} />
    </div>
  );
}

export default App;
