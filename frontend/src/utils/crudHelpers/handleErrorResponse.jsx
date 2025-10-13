export const handleErrorResponse = ({ error, customMessage, showAlert }) => {
  if (error.response) {
    const { data, status } = error.response;
    showAlert({ type: 'error', content: `Error ${status}: ${customMessage || data.message}`});
  } else if (error.request) {
    showAlert({ type: 'error', content: `Error de solicitud: ${customMessage || error.message}`});
  } else {
    showAlert({ type: 'error', content: `Error: ${customMessage || error.message}`});
  }
};
