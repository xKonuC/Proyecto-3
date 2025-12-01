export const handleErrorResponse = ({ error, customMessage, showAlert }) => {
  if (error.response) {
    const { data, status } = error.response;
    
    // Manejar errores específicos de autenticación
    if (status === 401) {
      showAlert({ type: 'error', content: 'Sesión expirada. Por favor, inicia sesión nuevamente.'});
      // Redirigir al login
      window.location.href = '/Login';
      return;
    }
    
    // Manejar conflictos (duplicados)
    if (status === 409) {
      const errorMessage = data?.message || 'El registro ya existe';
      showAlert({ type: 'error', content: errorMessage});
      return;
    }
    
    // Manejar otros errores HTTP
    const errorMessage = data?.message || data || `Error ${status}`;
    showAlert({ type: 'error', content: `${customMessage || errorMessage}`});
  } else if (error.request) {
    showAlert({ type: 'error', content: `Error de solicitud: ${customMessage || error.message}`});
  } else {
    showAlert({ type: 'error', content: `Error: ${customMessage || error.message}`});
  }
};
