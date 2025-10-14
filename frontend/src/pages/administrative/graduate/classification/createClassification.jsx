import React, { useState, useEffect } from 'react';
import { FaSave, FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../../../utils/cookieUtils';

const CreateClassification = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    criteria: {
      specializations: [],
      entryYears: [],
      groups: [],
      articulations: [],
      workPlaces: [],
      jobs: []
    }
  });
  const [availableCriteria, setAvailableCriteria] = useState({});
  const [selectedGraduates, setSelectedGraduates] = useState([]);
  const [allGraduates, setAllGraduates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCriteria();
    fetchGraduates();
  }, []);

  const fetchCriteria = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/role/administrator/graduate/classification/criteria', {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAvailableCriteria(data.data);
      }
    } catch (error) {
      console.error('Error fetching criteria:', error);
    }
  };

  const fetchGraduates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/role/administrator/graduate/students', {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAllGraduates(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching graduates:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCriteriaChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        [category]: value
      }
    }));
  };

  const handleGraduateSelection = (graduateId, isSelected) => {
    if (isSelected) {
      setSelectedGraduates(prev => [...prev, graduateId]);
    } else {
      setSelectedGraduates(prev => prev.filter(id => id !== graduateId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/role/administrator/graduate/classification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify({
          ...formData,
          graduateIds: selectedGraduates
        })
      });

      if (response.ok) {
        navigate('/Administrative/Graduate/Classification');
      } else {
        console.error('Error creating classification');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-orange-main mb-2">
          Nombre de la Clasificación *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
          placeholder="Ej: Egresados 2023 - Especialización en Educación"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-orange-main mb-2">
          Descripción
        </label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
          placeholder="Describe los criterios y propósito de esta clasificación..."
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-orange-main mb-4">Criterios de Clasificación</h3>
      
      {/* Especializaciones */}
      <div>
        <label className="block text-sm font-medium text-orange-main mb-2">
          Especializaciones
        </label>
        <select
          multiple
          value={formData.criteria.specializations}
          onChange={(e) => handleCriteriaChange('specializations', Array.from(e.target.selectedOptions, option => option.value))}
          className="w-full px-3 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
        >
          {availableCriteria.specializations?.map(spec => (
            <option key={spec.specializationID} value={spec.specializationName}>
              {spec.specializationName}
            </option>
          ))}
        </select>
      </div>

      {/* Años de ingreso */}
      <div>
        <label className="block text-sm font-medium text-orange-main mb-2">
          Años de Ingreso
        </label>
        <select
          multiple
          value={formData.criteria.entryYears}
          onChange={(e) => handleCriteriaChange('entryYears', Array.from(e.target.selectedOptions, option => option.value))}
          className="w-full px-3 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
        >
          {availableCriteria.entryYears?.map(year => (
            <option key={year.year} value={year.year}>
              {year.year}
            </option>
          ))}
        </select>
      </div>

      {/* Grupos */}
      <div>
        <label className="block text-sm font-medium text-orange-main mb-2">
          Grupos
        </label>
        <select
          multiple
          value={formData.criteria.groups}
          onChange={(e) => handleCriteriaChange('groups', Array.from(e.target.selectedOptions, option => option.value))}
          className="w-full px-3 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
        >
          {availableCriteria.groups?.map(group => (
            <option key={group.groupName} value={group.groupName}>
              {group.groupName}
            </option>
          ))}
        </select>
      </div>

      {/* Articulaciones */}
      <div>
        <label className="block text-sm font-medium text-orange-main mb-2">
          Articulaciones
        </label>
        <select
          multiple
          value={formData.criteria.articulations}
          onChange={(e) => handleCriteriaChange('articulations', Array.from(e.target.selectedOptions, option => option.value))}
          className="w-full px-3 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
        >
          {availableCriteria.articulations?.map(articulation => (
            <option key={articulation.articulationType} value={articulation.articulationType}>
              {articulation.articulationType}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-orange-main mb-4">Seleccionar Egresados</h3>
      
      <div className="bg-orange-main bg-opacity-10 p-4 rounded-xl border-2 border-orange-main">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-orange-main font-medium">
            {selectedGraduates.length} egresados seleccionados
          </span>
          <button
            type="button"
            onClick={() => setSelectedGraduates([])}
            className="text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            Limpiar selección
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto space-y-2">
          {allGraduates.map(graduate => (
            <label key={graduate.userID} className="flex items-center space-x-3 p-2 hover:bg-orange-main hover:bg-opacity-20 rounded-xl transition-colors">
              <input
                type="checkbox"
                checked={selectedGraduates.includes(graduate.userID)}
                onChange={(e) => handleGraduateSelection(graduate.userID, e.target.checked)}
                className="rounded border-2 border-orange-main text-orange-main focus:ring-orange-main"
              />
              <div className="flex-1">
                <div className="font-medium text-orange-main">{graduate.fullName}</div>
                <div className="text-sm text-gray-600">
                  {graduate.email} • {graduate.entry} • {graduate.workPlace}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <main className="bg-white text-orange-main min-h-screen rounded-lg p-10 shadow-md">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate('/Administrative/Graduate/Classification')}
            className="text-orange-main hover:text-orange-second transition-colors"
          >
            <FaArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-orange-main sm:text-5xl">Crear Clasificación</h1>
            <p className="mt-4 text-gray-600 font-normal">Define los criterios y selecciona los egresados</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber ? 'bg-orange-main text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-orange-main' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Información Básica</span>
            <span>Criterios</span>
            <span>Egresados</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow border-2 border-orange-main p-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setStep(step > 1 ? step - 1 : 1);
              }}
              disabled={step === 1}
              className="px-4 py-2 text-orange-main border-2 border-orange-main rounded-xl hover:bg-orange-main hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              Anterior
            </button>
            
            <div className="flex space-x-4">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setStep(step + 1);
                  }}
                  className="border-orange-main bg-orange-main hover:text-orange-main hover:ring-orange-main text-white px-4 py-2 rounded-xl transition duration-200 hover:bg-transparent hover:ring-1 hover:font-semibold"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !formData.name}
                  className="border-green-500 bg-green-500 hover:text-green-500 hover:ring-green-500 text-white px-6 py-2 rounded-xl transition duration-200 hover:bg-transparent hover:ring-1 hover:font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <FaSave />
                  )}
                  <span>Crear Clasificación</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateClassification;
