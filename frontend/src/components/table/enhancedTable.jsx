import React, { memo } from 'react';
import Table from './table';

const EnhancedTable = memo(({ theadContent, tbodyContent, selectAll, onChange }) => {
  return <Table theadContent={theadContent} tbodyContent={tbodyContent} hasCheckbox selectAll={selectAll} onChange={onChange} />;
});

export default EnhancedTable;
