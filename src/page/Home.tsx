import React from "react";
import Pagination from "../components/Pagination";
import Catalog from "../components/Catalog";
import Filter from "../components/Filter";
import type { Board } from "../redux/slices/BorderSlice";

interface SortOption {
  sortBy: string;
  order: "asc" | "desc";
  label: string;
}

interface HomeProps {
  catalog: Board[];
  isLoading: boolean;
  hasError: boolean;
  setActiveFilter: (value: number) => void;
  activeFilter: number;
  showSort: string;
  setPage: (page: number) => void;
}

export default function Home({
  catalog,
  isLoading,
  hasError,
  setActiveFilter,
  activeFilter,
  showSort,
  setPage,
}: HomeProps) {
  // Sort options
  const sortOptions: SortOption[] = [
    { sortBy: "createdAt", order: "asc", label: "возрастанию даты" },
    { sortBy: "createdAt", order: "desc", label: "убыванию даты" },
    { sortBy: "rating", order: "asc", label: "возрастанию рейтинга" },
    { sortBy: "rating", order: "desc", label: "убыванию рейтинга" },
  ];

  return (
    <>
      <h1>Каталог всех доступных досок</h1>

      <Filter
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
        showSort={showSort}
        sortOptions={sortOptions}
      />

      <Catalog
        catalog={catalog}
        isLoading={isLoading}
      />

      <Pagination page={(el) => setPage(el)} />
    </>
  );
}
