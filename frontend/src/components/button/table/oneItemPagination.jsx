import React from 'react';
import Pagination from './pagination';

const OneItemPagination = (props) => (
  <Pagination {...props} length={props.length || props.totalItems} />
);

export default OneItemPagination;
