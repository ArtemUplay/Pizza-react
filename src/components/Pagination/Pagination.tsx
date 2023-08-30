import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
import { IPaginationProps } from './Pagination.types';

const PaginationComponent = ({ currentPage, onChangePage }: IPaginationProps) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(pageNumber) => {
        onChangePage(pageNumber.selected + 1);
      }}
      pageRangeDisplayed={8}
      // Хардкодом задаём 3 страницы, потому что mochapi не возвращает количество страниц
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

const Pagination = React.memo(PaginationComponent);

export default Pagination;
