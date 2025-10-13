import React from 'react';
import FormHeaderNotUpdate from '../header/formHeaderNotUpdate';
import FormButtonsNotUpdate from '../../button/form/formButtonsNotUpdate'

const FormContainerNotUpdate = ({
  message,
  secondaryMessage,
  pText,
  messageButton,
  handleSubmit,
  closeModal,
  children,
  customPath,
  formHeight = 'h-auto',
}) => {
  return (
    <div className="bg-white w-10/12 sm:w-7/12 md:w-6/12 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-2 p-3 sm:p-6">
        <FormHeaderNotUpdate
          message={message}
          secondaryMessage={secondaryMessage}
          pText={pText}
        />
        {/* Utiliza el prop formHeight para controlar la altura */}
        <div className={`overflow-auto p-1 ${formHeight} space-y-2 sm:space-y-3`}>{children}</div>

        <FormButtonsNotUpdate
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          message={messageButton}
          customPath={customPath}
        />
      </form>
    </div>
  );
};

export default FormContainerNotUpdate;
