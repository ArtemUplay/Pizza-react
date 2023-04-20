import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(pageNumber) => onChangePage(pageNumber.selected + 1)}
      pageRangeDisplayed={8}
      // Хардкодом задаём 3 страницы, потому что mochapi не возвращает количество страниц
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
