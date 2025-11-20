import React from 'react';
import Pagination from './pagination';

const PaginationButtons = (props) => (
  <Pagination {...props} length={props.length || props.totalItems} />
);

export default PaginationButtons;
