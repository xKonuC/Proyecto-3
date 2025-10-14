export const fetchHelpers = async (url, config) => {
  const response = await fetch(url, config);
  
  // Forzar la codificación UTF-8
  const text = await response.text();
  return JSON.parse(text);
};
