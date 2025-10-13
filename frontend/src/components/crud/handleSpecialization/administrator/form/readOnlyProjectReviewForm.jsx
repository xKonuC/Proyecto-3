import React from 'react';
import TextArea from '../../../../input/textArea';
import StyledButton from '../../../../button/styledButton';
import CancelIcon from '../../../../icon/handle/cancelIcon';

const ReadOnlyProjectReviewForm = ({ newItem, closeModal }) => {
  return (
    <form className="space-y-2 p-3 sm:p-6">
      <h1 className="text-gray-900 text-center text-2xl font-bold sm:text-3xl">
        Revision Anteproyecto
      </h1>
      <div className='overflow-auto p-1 min-h-full max-h-[80vh] space-y-2 sm:space-y-3'>
        <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-3 transition duration-100 hover:bg-gray-100">
          <div className="space-y-2 w-full">
            <strong className="block text-start font-medium text-gray-900">Planteamiento del problema</strong>
            <div className="w-full">
              <TextArea
                inputId='comment1'
                value={newItem.comment1 || 'Sin Comentarios'}
                isEditable={false}
                placeholder={``}
              />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-3 transition duration-100 hover:bg-gray-100">
          <div className="space-y-2 w-full">
            <strong className="block text-start font-medium text-gray-900">Justificación del Proyecto</strong>
            <div className="w-full">
              <TextArea
                inputId='comment2'
                value={newItem.comment2 || 'Sin Comentarios'}
                isEditable={false}
                placeholder={``}
              />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-3 transition duration-100 hover:bg-gray-100">
          <div className="space-y-2 w-full">
            <strong className="block text-start font-medium text-gray-900">Objetivo(s) Generales(es)</strong>
            <div className="w-full">
              <TextArea
                inputId='comment3'
                value={newItem.comment3 || 'Sin Comentarios'}
                isEditable={false}
                placeholder={``}
              />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-3 transition duration-100 hover:bg-gray-100">
          <div className="space-y-2 w-full">
            <strong className="block text-start font-medium text-gray-900">Objetivos Específicos</strong>
            <div className="w-full">
              <TextArea
                inputId='comment4'
                value={newItem.comment4 || 'Sin Comentarios'}
                isEditable={false}
                placeholder={``}
              />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-3 transition duration-100 hover:bg-gray-100">
          <div className="space-y-2 w-full">
            <strong className="block text-start font-medium text-gray-900">Marco Metodológico</strong>
            <div className="w-full">
              <TextArea
                inputId='comment5'
                value={newItem.comment5 || 'Sin Comentarios'}
                isEditable={false}
                placeholder={``}
              />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-3 transition duration-100 hover:bg-gray-100">
          <div className="space-y-2 w-full">
            <strong className="block text-start font-medium text-gray-900">Marco Teórico</strong>
            <div className="w-full">
              <TextArea
                inputId='comment6'
                value={newItem.comment6 || 'Sin Comentarios'}
                isEditable={false}
                placeholder={``}
              />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-3 transition duration-100 hover:bg-gray-100">
          <div className="space-y-2 w-full">
            <strong className="block text-start font-medium text-gray-900">Referencias Bibliográficas</strong>
            <div className="w-full">
              <TextArea
                inputId='comment7'
                value={newItem.comment7 || 'Sin Comentarios'}
                isEditable={false}
                placeholder={``}
              />
            </div>
          </div>
        </div>
      </div>
      <StyledButton
        onClick={closeModal}
        color="red"
      >
        <CancelIcon />
        Volver
      </StyledButton>
    </form>
  );
};

export default ReadOnlyProjectReviewForm;
