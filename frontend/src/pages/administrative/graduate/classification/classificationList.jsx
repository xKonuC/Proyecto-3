import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaFilter, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../../../utils/cookieUtils';

const ClassificationList = () => {
  const [classifications, setClassifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClassifications, setFilteredClassifications] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '',
    graduateCount: '',
    sortBy: 'name'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchClassifications();
  }, []);

  useEffect(() => {
    let filtered = classifications.filter(classification =>
      classification.classificationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classification.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Aplicar filtros adicionales
    if (filters.dateRange) {
      const now = new Date();
      const daysAgo = filters.dateRange === 'week' ? 7 : filters.dateRange === 'month' ? 30 : 365;
      const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
      
      filtered = filtered.filter(classification => {
        const createdDate = new Date(classification.createdAt);
        return createdDate >= cutoffDate;
      });
    }

    if (filters.graduateCount) {
      const count = parseInt(filters.graduateCount);
      filtered = filtered.filter(classification => {
        const graduateCount = classification.graduateCount || 0;
        return graduateCount >= count;
      });
    }

    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.classificationName.localeCompare(b.classificationName);
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'graduates':
          return (b.graduateCount || 0) - (a.graduateCount || 0);
        default:
          return 0;
      }
    });

    setFilteredClassifications(filtered);
  }, [classifications, searchTerm, filters]);

  const fetchClassifications = async () => {
    try {
      setLoading(true);
      const token = getAccessToken();
      
      const response = await fetch('http://localhost:5000/api/role/administrator/graduate/classification', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setClassifications(data.data || []);
      } else {
        console.error('Error fetching classifications');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (classificationId) => {
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
          fetchClassifications();
        } else {
          console.error('Error deleting classification');
        }
      } catch (error) {
        console.error('Error:', error);
      }
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      dateRange: '',
      graduateCount: '',
      sortBy: 'name'
    });
  };

  const applyFilters = () => {
    setShowFilters(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="bg-white text-orange-main min-h-screen rounded-lg p-10 shadow-md">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-orange-main sm:text-5xl">Clasificación de Egresados</h1>
            <p className="mt-4 text-gray-600 font-normal">Gestiona las clasificaciones y categorías de los egresados</p>
          </div>
          <button
            onClick={() => navigate('/Administrative/Graduate/Classification/Create')}
            className="border-orange-main bg-orange-main hover:text-orange-main hover:ring-orange-main text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition duration-200 hover:bg-transparent hover:ring-1 hover:font-semibold"
          >
            <FaPlus />
            <span>Nueva Clasificación</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow border-2 border-orange-main">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-main" />
              <input
                type="text"
                placeholder="Buscar clasificaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
              />
            </div>
            <button 
              onClick={() => setShowFilters(true)}
              className="border-orange-main bg-orange-main hover:text-orange-main hover:ring-orange-main text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition duration-200 hover:bg-transparent hover:ring-1 hover:font-semibold"
            >
              <FaFilter />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Classifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClassifications.map((classification) => (
            <div key={classification.classificationID} className="group relative block h-full">
              <span className="absolute inset-0 rounded-xl border-2 border-dashed border-orange-main"></span>
              <div className="relative flex h-full rounded-xl items-end border-2 border-orange-main bg-orange-main transition-all ease-in-out duration-300 group-hover:bg-white group-hover:border-orange-main">
                <div className="p-4 sm:p-6 lg:p-8 w-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-orange-main">
                      {classification.classificationName}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/Administrative/Graduate/Classification/${classification.classificationID}`)}
                        className="text-white group-hover:text-orange-main hover:scale-110 transition-transform"
                        title="Ver detalles"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => navigate(`/Administrative/Graduate/Classification/Edit/${classification.classificationID}`)}
                        className="text-white group-hover:text-orange-main hover:scale-110 transition-transform"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(classification.classificationID)}
                        className="text-white group-hover:text-orange-main hover:scale-110 transition-transform"
                        title="Eliminar"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <p className="hidden group-hover:block text-white group-hover:text-orange-main mb-4 line-clamp-3">
                    {classification.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm text-white group-hover:text-orange-main">
                    <span>{classification.graduateCount} egresados</span>
                    <span>{formatDate(classification.createdAt)}</span>
                  </div>
                  
                  {classification.criteria && (
                    <div className="mt-4 hidden group-hover:block">
                      <h4 className="text-sm font-medium text-white group-hover:text-orange-main mb-2">Criterios:</h4>
                      <div className="flex flex-wrap gap-2">
                        {formatCriteria(classification.criteria).map(({ label, value }, index) => (
                          <span key={index} className="bg-white text-orange-main text-xs px-2 py-1 rounded">
                            {label}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => navigate(`/Administrative/Graduate/Classification/${classification.classificationID}`)}
                    className="hidden group-hover:flex mt-2 font-bold items-center gap-1 text-white group-hover:text-orange-main hover:underline cursor-pointer transition-all duration-200 hover:scale-105"
                  >
                    Ver más
                    <span aria-hidden="true" className="block text-2xl transform transition-all rtl:rotate-180 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredClassifications.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {searchTerm ? 'No se encontraron clasificaciones con ese criterio' : 'No hay clasificaciones creadas'}
            </div>
            {!searchTerm && (
              <button
                onClick={() => navigate('/Administrative/Graduate/Classification/Create')}
                className="border-orange-main bg-orange-main hover:text-orange-main hover:ring-orange-main text-white px-6 py-3 rounded-xl transition duration-200 hover:bg-transparent hover:ring-1 hover:font-semibold"
              >
                Crear Primera Clasificación
              </button>
            )}
          </div>
        )}

        {/* Modal de Filtros */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-orange-main">Filtros de Clasificaciones</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Filtro por Rango de Fecha */}
                <div>
                  <label className="block text-sm font-medium text-orange-main mb-2">
                    Rango de Fecha
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
                  >
                    <option value="">Todas las fechas</option>
                    <option value="week">Última semana</option>
                    <option value="month">Último mes</option>
                    <option value="year">Último año</option>
                  </select>
                </div>

                {/* Filtro por Cantidad de Egresados */}
                <div>
                  <label className="block text-sm font-medium text-orange-main mb-2">
                    Mínimo de Egresados
                  </label>
                  <select
                    value={filters.graduateCount}
                    onChange={(e) => handleFilterChange('graduateCount', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
                  >
                    <option value="">Cualquier cantidad</option>
                    <option value="1">1+ egresados</option>
                    <option value="5">5+ egresados</option>
                    <option value="10">10+ egresados</option>
                    <option value="20">20+ egresados</option>
                  </select>
                </div>

                {/* Ordenamiento */}
                <div>
                  <label className="block text-sm font-medium text-orange-main mb-2">
                    Ordenar por
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
                  >
                    <option value="name">Nombre (A-Z)</option>
                    <option value="date">Fecha (Más reciente)</option>
                    <option value="graduates">Cantidad de egresados</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition duration-200"
                >
                  Limpiar Filtros
                </button>
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-orange-main text-white rounded-xl hover:bg-orange-600 transition duration-200"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ClassificationList;
