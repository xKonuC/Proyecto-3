import { handleDeniedError, handleGenericMessage, handleValidationErrors, handleUnknownError, handleUnexpectedError } from './messageHandlers'
import { renewSession } from '../sessionHelpers';

const ResponseHandler = async ({
  showAlert = {},
  navigate,
  response,
  onVerification = () => {},
  onRenewal = () => {},
  onDenied = handleDeniedError,
  onMessage = handleGenericMessage,
  onErrors = handleValidationErrors,
  onError = handleUnknownError,
  onData = () => {},
  onSuccess = () => {},
  onDefault = handleUnexpectedError,
}) => {
  if (response === null) {
    window.close();
    return;
  }
  if (response.verificationMessage) {
    onVerification(response.verificationMessage);
  } else if (response.errorDenied) {
    onDenied(response.errorDenied, showAlert, navigate);
  } else if (response.expirationError) {
    if (response.expirationError) {
      const renewedData = await renewSession();
      if (renewedData.renewalMessage) {
        onRenewal(renewedData.renewalMessage);
      } else {
        onError(renewedData.error, showAlert);
      }
    }
  } else if (response.message) {
    const message = response.message?.error?.message || response.message;
    // Detectar si es un mensaje de éxito
    if (response.success || message.includes('exitosamente') || message.includes('successfully')) {
      onSuccess(message);
    } else {
      onMessage(message, showAlert);
    }
  } else if (response.error) {
    onError(response.error, showAlert);
  } else if (response.errors) {
    onErrors(response.errors, showAlert);
  } else if (response) {
    const responseData = response.result ?? response;
    onData(responseData);

  } else {
    onDefault(showAlert);
  }

  return null;
};

export default ResponseHandler;
