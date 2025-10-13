import React from 'react';
import { FaEdit } from 'react-icons/fa';
import TextArea from '../../../../input/textArea';
import FormContainerReview from '../../../../forms/body/formContainerReview'

const ProjectReviewForm = ({ newItem, handleInputChange, handleUpdate, closeModal }) => {
  return (
    <FormContainerReview
      message={'Revisar Anteproyecto'}
      secondaryMessage={''}
      messageButton={'Guardar Cambios'}
      handleSubmit={handleUpdate}
      closeModal={closeModal}
      customPath={<FaEdit size={20} />}
    >
      <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-3 transition duration-100 hover:bg-gray-100">
        <div className="space-y-2 w-full">
          <strong className="block text-start font-medium text-gray-900">Planteamiento del problema</strong>
          <div className="w-full">
            <TextArea
              inputId='comment1'
              value={newItem.comment1 || ''}
              onChange={(e) => handleInputChange('comment1', e.target.value)}
              placeholder={`Ingresar Comentario`}
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
              value={newItem.comment2 || ''}
              onChange={(e) => handleInputChange('comment2', e.target.value)}
              placeholder={`Ingresar Comentario`}
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
              value={newItem.comment3 || ''}
              onChange={(e) => handleInputChange('comment3', e.target.value)}
              placeholder={`Ingresar Comentario`}
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
              value={newItem.comment4 || ''}
              onChange={(e) => handleInputChange('comment4', e.target.value)}
              placeholder={`Ingresar Comentario`}
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
              value={newItem.comment5 || ''}
              onChange={(e) => handleInputChange('comment5', e.target.value)}
              placeholder={`Ingresar Comentario`}
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
              value={newItem.comment6 || ''}
              onChange={(e) => handleInputChange('comment6', e.target.value)}
              placeholder={`Ingresar Comentario`}
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
              value={newItem.comment7 || ''}
              onChange={(e) => handleInputChange('comment7', e.target.value)}
              placeholder={`Ingresar Comentario`}
            />
          </div>
        </div>
      </div>
    </FormContainerReview>
  );
};

export default ProjectReviewForm;
