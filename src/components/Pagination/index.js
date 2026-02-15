import React from 'react'
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss'

export default function Pagination({page}) {


  return (
      <div className={style.root}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => page(event.selected + 1)}
            pageRangeDisplayed={3}
            pageCount={4}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
      </div>
  )
}
