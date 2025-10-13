import React from 'react';
import FormHeader from '../header/formHeader';
import FormButtons from '../../button/form/formButtons'

const FormContainer = ({
  updateMessage,
  createMessage,
  update2Message,
  create2Message,
  updateId,
  itemName,
  pText = '',
  handleSubmit,
  closeModal,
  children,
  formHeight = 'h-auto', // Añade esto con un valor por defecto
}) => {
  return (
    <div className="bg-white w-10/12 sm:w-7/12 md:w-6/12 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-2 p-3 sm:p-6">
        <FormHeader
          updateMessage='Actualizar Información' 
          create2Message='Los campos marcados con * son obligatorios'
          update2Message='Los campos marcados con * son obligatorios'
          createMessage={createMessage}
          updateId={updateId}
          itemName={itemName}
          pText={pText}
        />

        {/* Utiliza el prop formHeight para controlar la altura */}
        <div className={`overflow-auto p-1 ${formHeight} space-y-2 sm:space-y-3`}>{children}</div>

        <FormButtons
          updateMessage='Actualizar Información' 
          createMessage={createMessage}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          updateId={updateId}
          itemName={itemName}
        />
      </form>
    </div>
  );
};

export default FormContainer;
