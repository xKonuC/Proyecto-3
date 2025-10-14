import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaEdit, FaTrash, FaDownload, FaPrint, FaUserGraduate } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../../../utils/cookieUtils';

const ClassificationDetail = () => {
  const { classificationId } = useParams();
  const [classification, setClassification] = useState(null);
  const [graduates, setGraduates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGraduates, setFilteredGraduates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClassificationDetails();
  }, [classificationId]);

  useEffect(() => {
    const filtered = graduates.filter(graduate =>
      graduate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      graduate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      graduate.workPlace.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGraduates(filtered);
  }, [graduates, searchTerm]);

  const fetchClassificationDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/role/administrator/graduate/classification/graduates/${classificationId}`, {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setClassification(data.data.classification);
        setGraduates(data.data.graduates || []);
      } else {
        console.error('Error fetching classification details');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta clasificación?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/role/administrator/graduate/classification/${classificationId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          navigate('/Administrative/Graduate/Classification');
        } else {
          console.error('Error deleting classification');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleExport = () => {
    // Implementar exportación a Excel/PDF
    console.log('Exporting classification data...');
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'Invalid Date') {
      return 'No disponible';
    }
    try {
      return new Date(dateString).toLocaleDateString('es-ES');
    } catch (error) {
      return 'No disponible';
    }
  };

  const formatCriteria = (criteria) => {
    if (!criteria) return [];
    
    const criteriaLabels = {
      'minAverage': 'Promedio mínimo',
      'academicExcellence': 'Excelencia académica',
      'publications': 'Publicaciones',
      'researchFocus': 'Enfoque en investigación',
      'leadership': 'Liderazgo',
      'management': 'Gestión',
      'promedio': 'Promedio',
      'especializacion': 'Especialización',
      'cargo': 'Cargo',
      'experiencia': 'Experiencia',
      'publicaciones': 'Publicaciones',
      'tipo': 'Tipo',
      'groups': 'Grupos',
      'entryYears': 'Años de ingreso',
      'articulations': 'Articulaciones',
      'specializations': 'Especializaciones',
      'workPlaces': 'Lugares de trabajo',
      'jobs': 'Cargos'
    };

    return Object.entries(criteria).map(([key, value]) => {
      const label = criteriaLabels[key] || key;
      let displayValue = value;
      
      if (Array.isArray(value)) {
        displayValue = value.join(', ');
      } else if (typeof value === 'boolean') {
        displayValue = value ? 'Sí' : 'No';
      } else if (typeof value === 'number') {
        displayValue = value.toString();
      } else if (typeof value === 'string') {
        displayValue = value;
      }
      
      return { label, value: displayValue };
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!classification) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Clasificación no encontrada</h2>
        <button
          onClick={() => navigate('/Administrative/Graduate/Classification')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Volver a Clasificaciones
        </button>
      </div>
    );
  }

  return (
    <main className="bg-white text-orange-main min-h-screen rounded-lg p-10 shadow-md">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/Administrative/Graduate/Classification')}
              className="text-orange-main hover:text-orange-second transition-colors"
            >
              <FaArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-orange-main sm:text-5xl">{classification.name}</h1>
              <p className="mt-4 text-gray-600 font-normal">{classification.description}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/Administrative/Graduate/Classification/Edit/${classificationId}`)}
              className="border-yellow-500 bg-yellow-500 hover:text-yellow-500 hover:ring-yellow-500 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition duration-200 hover:bg-transparent hover:ring-1 hover:font-semibold"
            >
              <FaEdit />
              <span>Editar</span>
            </button>
            <button
              onClick={handleExport}
              className="border-green-500 bg-green-500 hover:text-green-500 hover:ring-green-500 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition duration-200 hover:bg-transparent hover:ring-1 hover:font-semibold"
            >
              <FaDownload />
              <span>Exportar</span>
            </button>
            <button
              onClick={handleDelete}
              className="border-red-500 bg-red-500 hover:text-red-500 hover:ring-red-500 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition duration-200 hover:bg-transparent hover:ring-1 hover:font-semibold"
            >
              <FaTrash />
              <span>Eliminar</span>
            </button>
          </div>
        </div>

        {/* Classification Info */}
        <div className="bg-white rounded-lg shadow border-2 border-orange-main p-6">
          <h3 className="text-lg font-semibold text-orange-main mb-4">Información de la Clasificación</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-orange-main mb-2">Total de Egresados</h4>
              <p className="text-2xl font-bold text-orange-main">{graduates.length}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-orange-main mb-2">Fecha de Creación</h4>
              <p className="text-gray-900">{formatDate(classification.createdAt)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-orange-main mb-2">Última Actualización</h4>
              <p className="text-gray-900">{formatDate(classification.updatedAt)}</p>
            </div>
          </div>

          {classification.criteria && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-orange-main mb-3">Criterios de Clasificación</h4>
              <div className="flex flex-wrap gap-2">
                {formatCriteria(classification.criteria).map(({ label, value }, index) => (
                  <span key={index} className="bg-orange-main text-white text-sm px-3 py-1 rounded-full">
                    {label}: {value}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Graduates List */}
        <div className="bg-white rounded-lg shadow border-2 border-orange-main">
          <div className="p-6 border-b-2 border-orange-main">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-orange-main">
                Egresados ({graduates.length})
              </h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar egresados..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
                  />
                  <FaUserGraduate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-main" />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-orange-main">
              <thead className="bg-orange-main bg-opacity-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-orange-main uppercase tracking-wider">
                    Egresado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-orange-main uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-orange-main uppercase tracking-wider">
                    Año de Ingreso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-orange-main uppercase tracking-wider">
                    Lugar de Trabajo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-orange-main uppercase tracking-wider">
                    Clasificado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-orange-main">
                {filteredGraduates.map((graduate) => (
                  <tr key={graduate.userID} className="hover:bg-orange-main hover:bg-opacity-10 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-orange-main flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {graduate.firstName.charAt(0)}{graduate.surname1.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-orange-main">
                            {graduate.fullName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {graduate.rut}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {graduate.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {graduate.entry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {graduate.workPlace || 'No especificado'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(graduate.classifiedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredGraduates.length === 0 && graduates.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron egresados con ese criterio de búsqueda</p>
            </div>
          )}

          {graduates.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay egresados en esta clasificación</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ClassificationDetail;
