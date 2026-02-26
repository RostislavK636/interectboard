import React from "react";
import { useDispatch } from "react-redux";
import { setActiveSort } from "../../redux/slices/filterSlice";
import style from "./Filter.module.scss";

interface SortOption {
  sortBy: string;
  order: "asc" | "desc";
  label: string;
}

interface FiltersType {
  activeFilter: number;
  setActiveFilter: (value: number) => void;
  sortOptions: SortOption[];
  showSort: string;
}

export default function Filter({
  activeFilter,
  setActiveFilter,
  sortOptions,
  showSort,
}: FiltersType) {
  const dispatch = useDispatch();
  const [showDisplay, setShowDisplay] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const handleShowList = (sortOption: SortOption) => {
    dispatch(setActiveSort(sortOption));
    setShowDisplay(false);
  };

  React.useEffect(() => {
    const handlClickOutside = (event: MouseEvent) => {
      const path = (event.composedPath && event.composedPath()) || [];
      if (!path.includes(sortRef.current as EventTarget)) {
        setShowDisplay(false);
      }
    };
    document.body.addEventListener("click", handlClickOutside);

    return () => {
      document.body.removeEventListener("click", handlClickOutside);
    };
  }, []);
  return (
    <div className={style.root}>
      <ul className={style.filter}>
        <li
          className={activeFilter === 0 ? style.active : "null"}
          onClick={() => {
            setActiveFilter(0);
          }}
        >
          Все
        </li>
        <li
          className={activeFilter === 1 ? style.active : "null"}
          onClick={() => {
            setActiveFilter(1);
          }}
        >
          Математика
        </li>
        <li
          className={activeFilter === 2 ? style.active : "null"}
          onClick={() => {
            setActiveFilter(2);
          }}
        >
          Русский
        </li>
        <li
          className={activeFilter === 3 ? style.active : "null"}
          onClick={() => {
            setActiveFilter(3);
          }}
        >
          Физика
        </li>
        <li
          className={activeFilter === 4 ? style.active : "null"}
          onClick={() => {
            setActiveFilter(4);
          }}
        >
          Химия
        </li>
        <li
          className={activeFilter === 5 ? style.active : "null"}
          onClick={() => {
            setActiveFilter(5);
          }}
        >
          Программирование
        </li>
      </ul>

      <div ref={sortRef}>
        <p>
          Сортировка по{" "}
          <button
            className={style.btn_sort}
            onClick={() => {
              setShowDisplay(!showDisplay);
            }}
          >
            {showSort}
          </button>
          ▾
        </p>

        <div className={showDisplay ? style.sort_on : style.sort_off}>
          <ul>
            <li
              onClick={() => {
                handleShowList(sortOptions[0]);
              }}
            >
              {sortOptions[0].label}
            </li>
            <li
              onClick={() => {
                handleShowList(sortOptions[1]);
              }}
            >
              {sortOptions[1].label}
            </li>
            <li
              onClick={() => {
                handleShowList(sortOptions[2]);
              }}
            >
              {sortOptions[2].label}
            </li>
            <li
              onClick={() => {
                handleShowList(sortOptions[3]);
              }}
            >
              {sortOptions[3].label}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
