import React, { Suspense } from 'react';

// Importa tu ModalFile con React.lazy
const ModalFile = React.lazy(() => import('../../modal/modalFile'));

const LazyModalFile = (props) => (
  <Suspense>
    <ModalFile {...props} />
  </Suspense>
);

export default LazyModalFile;
