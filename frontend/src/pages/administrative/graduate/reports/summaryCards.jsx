import { useState, useEffect } from 'react';
import { getAccessToken } from '../../../../utils/cookieUtils';

const useReportSummaryData = () => {
  // 1. Estados iniciales
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState({
    totalGraduates: 0,
    totalStudents: 0,
    totalClassifications: 0,
    graduatesByYear: [],
    graduatesBySpecialization: [],
    recentGraduates: []
  });

  // 2. Función de Fetching Real
  const fetchReportData = async () => {
    try {
      setLoading(true);
      
      const API_URL = 'http://localhost:5000/api/role/administrator/graduate/reports/summary';
      const accessToken = getAccessToken();
      
      const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
          },
      });

      if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      const fetchedData = result.data;
      
      // 3. Actualizar el estado con los datos
      setReportData({
        totalGraduates: fetchedData.totalGraduates || 0,
        totalStudents: fetchedData.totalStudents || 0,
        totalClassifications: fetchedData.totalClassifications || 0,
        graduatesByYear: fetchedData.graduatesByYear || [],
        graduatesBySpecialization: fetchedData.graduatesBySpecialization || [],
        recentGraduates: fetchedData.recentGraduates || [],
      });

    } catch (error) {
      console.error('❌ Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 4. Ejecutar el fetching al montar el componente
  useEffect(() => {
    fetchReportData();
  }, []);

  // 5. Retornar estados y funciones necesarias
  return { 
    loading, 
    reportData, 
    fetchReportData,
    setLoading
  };
};

export default useReportSummaryData;