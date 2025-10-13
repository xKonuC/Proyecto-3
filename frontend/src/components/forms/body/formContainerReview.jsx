import React from 'react';
import FormHeaderNotUpdate from '../header/formHeaderNotUpdate';
import FormButtonsNotUpdate from '../../button/form/formButtonsNotUpdate';

const FormContainerReview = ({
  message,
  secondaryMessage,
  pText,
  messageButton,
  handleSubmit,
  closeModal,
  children,
  customPath,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-3 sm:p-6">
      <FormHeaderNotUpdate
        message={message}
        secondaryMessage={secondaryMessage}
        pText={pText}
      />
      {/* Utiliza el prop formHeight para controlar la altura */}
      <div className={`overflow-auto p-1 min-h-full max-h-[80vh] space-y-2 sm:space-y-3`}>
        {children}
      </div>
      <FormButtonsNotUpdate
        handleSubmit={handleSubmit}
        closeModal={closeModal}
        message={messageButton}
        customPath={customPath}
      />
    </form>
  );
};

export default FormContainerReview;
