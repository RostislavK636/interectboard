import React from "react";
import ReactPaginate from "react-paginate";
import style from "./Pagination.module.scss";

interface Page {
  page: (value: number) => void;
}

export default function Pagination({ page }: Page) {
  return (
    <div className={style.root}>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        onPageChange={(event) => page(event.selected + 1)}
        pageRangeDisplayed={3}
        pageCount={4}
        previousLabel='<'
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
