// Componente sin casilla de verificación
import React from 'react';
import Table from './table';

const SimpleTable = ({ theadContent, tbodyContent }) => {
  return <Table theadContent={theadContent} tbodyContent={tbodyContent} />;
};

export default SimpleTable;
