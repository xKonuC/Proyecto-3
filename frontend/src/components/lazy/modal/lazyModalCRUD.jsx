import React, { Suspense } from 'react';

// Importa tu ModalCRUD con React.lazy
const ModalCRUD = React.lazy(() => import('../../modal/modalCRUD'));

const LazyModalCRUD = (props) => (
  <Suspense>
    <ModalCRUD {...props} />
  </Suspense>
);

export default LazyModalCRUD;
