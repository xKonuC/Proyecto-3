export const getStatusColor = (status) => {
  switch (status) {
    case 'Activo': return 'bg-green-100 text-green-800';
    case 'Egresado': return 'bg-blue-100 text-blue-800';
    case 'Inactivo': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getClassificationColor = (classification) => {
  switch (classification) {
    case 'En Proceso': return 'bg-yellow-100 text-yellow-800';
    case 'Graduado': return 'bg-green-100 text-green-800';
    case 'En Evaluación': return 'bg-blue-100 text-blue-800';
    case 'Sin clasificar': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
