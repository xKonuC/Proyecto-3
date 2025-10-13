import Cookies from 'js-cookie';

// Obtener datos de la cookie
export const getAccessToken = () => Cookies.get('access_token');
export const getRefreshToken = () => Cookies.get('refresh_token');
export const getIsAdminAccess = () => {
  const cookieData = Cookies.get('isAdminAccess');
  return cookieData === 'true';
};

export const getTemplateTemplateOverview = () => {
  const cookieData = Cookies.get('templateTemplateOverview');
  return cookieData ? JSON.parse(cookieData) : null;
}; 
export const getQuestion = () => {
  const cookieData = Cookies.get('question');
  return cookieData ? JSON.parse(cookieData) : null;
};
export const getSection = () => {
  const cookieData = Cookies.get('section');
  return cookieData ? JSON.parse(cookieData) : null;
};
export const getEvaluationStatus = () => {
  const cookieData = Cookies.get('evaluationStatus');
  return cookieData ? JSON.parse(cookieData) : null;
};

export const getUser = () => {
  const cookieData = Cookies.get('user');
  return cookieData ? JSON.parse(cookieData) : null;
};
export const getUserHasPermission = () => {
  const cookieData = Cookies.get('userHasPermission');
  return cookieData ? JSON.parse(cookieData) : null;
};

// Guardar datos en la cookie
export const setAccessToken = (access_token) => Cookies.set('access_token', access_token);
export const setRefreshToken = (refresh_token) => Cookies.set('refresh_token', refresh_token);
export const setIsAdminAccess = (isAdminAccess) => Cookies.set('isAdminAccess', isAdminAccess);

export const setTemplateTemplateOverview = (templateTemplateOverview) => {
  Cookies.set('templateTemplateOverview', JSON.stringify(templateTemplateOverview));
}; 
export const setSectionData = (section) => {
  Cookies.set('section', JSON.stringify(section));
}; 
export const setQuestionData = (question) => {
  Cookies.set('question', JSON.stringify(question));
}; 
export const setEvaluationStatusData = (evaluationStatus) => {
  Cookies.set('evaluationStatus', JSON.stringify(evaluationStatus));
}; 

// Datos del Estudiante para evitar hacer peticiones repetitivas
export const setUser = (user) => {
  Cookies.set('user', JSON.stringify(user));
};
export const setUserHasPermission = (user) => {
  Cookies.set('userHasPermission', JSON.stringify(user));
};

export const removeTokens = () => {
  // Obtiene todas las cookies del sitio
  const cookies = Cookies.get();

  // Itera sobre las cookies y las elimina una por una
  Object.keys(cookies).forEach(cookieName => {
    Cookies.remove(cookieName);
  });;
};
