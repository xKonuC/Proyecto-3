export const fetchHelpers = async (url, config) => {
  const response = await fetch(url, config);
  
  // Forzar la codificación UTF-8
  const text = await response.text();
  
  // Verificar si la respuesta es exitosa
  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
    error.response = {
      status: response.status,
      statusText: response.statusText,
      data: text
    };
    throw error;
  }
  
  // Intentar parsear como JSON
  try {
    return JSON.parse(text);
  } catch (parseError) {
    // Si no es JSON válido, devolver el texto como está
    return text;
  }
};
