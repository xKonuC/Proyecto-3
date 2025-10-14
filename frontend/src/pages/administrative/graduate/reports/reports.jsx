import React, { useState, useEffect } from 'react';
import { FaChartBar, FaDownload, FaFilePdf, FaFileExcel, FaUsers, FaGraduationCap, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import { getAccessToken } from '../../../../utils/cookieUtils';

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState({
    totalGraduates: 0,
    totalStudents: 0,
    totalClassifications: 0,
    graduatesByYear: [],
    graduatesBySpecialization: [],
    recentGraduates: []
  });
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      
      // Por ahora, usar datos de prueba para demostrar la funcionalidad
      // En producción, esto se conectaría con el backend real
      console.log('📊 Loading report data...');
      
      // Simular delay de carga
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos de prueba realistas
      setReportData({
        totalGraduates: 15,
        totalStudents: 8,
        totalClassifications: 3,
        graduatesByYear: [
          { year: 2023, count: 8 },
          { year: 2022, count: 5 },
          { year: 2021, count: 2 }
        ],
        graduatesBySpecialization: [
          { specialization: 'General', count: 15 }
        ],
        recentGraduates: [
          {
            userID: 1,
            fullName: 'Carlos Alberto Martínez López',
            email: 'carlos.martinez@alumnos.uta.cl',
            entry: 2021,
            specialization: 'General'
          },
          {
            userID: 2,
            fullName: 'María Elena González Pérez',
            email: 'maria.gonzalez@alumnos.uta.cl',
            entry: 2022,
            specialization: 'General'
          },
          {
            userID: 3,
            fullName: 'Leonardo Rodríguez',
            email: 'leonardo.rodriguez@alumnos.uta.cl',
            entry: 2023,
            specialization: 'General'
          },
          {
            userID: 4,
            fullName: 'Sebastian Torres',
            email: 'sebastian.torres@alumnos.uta.cl',
            entry: 2023,
            specialization: 'General'
          },
          {
            userID: 5,
            fullName: 'Ana Patricia Silva',
            email: 'ana.silva@alumnos.uta.cl',
            entry: 2022,
            specialization: 'General'
          }
        ]
      });
      
      console.log('✅ Report data loaded successfully');
      
    } catch (error) {
      console.error('❌ Error:', error);
      
      // Datos de fallback en caso de error
      setReportData({
        totalGraduates: 0,
        totalStudents: 0,
        totalClassifications: 0,
        graduatesByYear: [],
        graduatesBySpecialization: [],
        recentGraduates: []
      });
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (reportType) => {
    try {
      setLoading(true);
      
      console.log('📊 Generating report:', reportType);
      
      // Simular delay de generación
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Crear contenido del reporte basado en los datos actuales
      const reportContent = generateReportContent(reportType);
      
      // Crear y descargar archivo
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('✅ Report generated successfully');
      
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Error al generar el reporte. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const generateReportContent = (reportType) => {
    const currentDate = new Date().toLocaleDateString('es-ES');
    const dateRangeText = dateRange.startDate && dateRange.endDate 
      ? `\nPeríodo: ${dateRange.startDate} - ${dateRange.endDate}` 
      : '\nPeríodo: Todos los datos';

    let content = `REPORTE DE GRADUADOS - ${currentDate}${dateRangeText}\n`;
    content += '='.repeat(50) + '\n\n';

    switch (reportType) {
      case 'graduates-summary':
        content += 'RESUMEN DE EGRESADOS\n';
        content += `Total de Egresados: ${reportData.totalGraduates}\n`;
        content += `Total de Estudiantes: ${reportData.totalStudents}\n`;
        content += `Total de Clasificaciones: ${reportData.totalClassifications}\n\n`;
        
        content += 'DISTRIBUCIÓN POR AÑO:\n';
        reportData.graduatesByYear.forEach(item => {
          content += `- ${item.year}: ${item.count} egresados\n`;
        });
        break;

      case 'graduates-by-year':
        content += 'EGRESADOS POR AÑO\n';
        reportData.graduatesByYear.forEach(item => {
          content += `Año ${item.year}: ${item.count} egresados\n`;
        });
        break;

      case 'graduates-by-specialization':
        content += 'EGRESADOS POR ESPECIALIZACIÓN\n';
        reportData.graduatesBySpecialization.forEach(item => {
          content += `${item.specialization}: ${item.count} egresados\n`;
        });
        break;

      case 'classifications-report':
        content += 'REPORTE DE CLASIFICACIONES\n';
        content += `Total de Clasificaciones: ${reportData.totalClassifications}\n`;
        break;

      default:
        content += 'REPORTE GENERAL\n';
    }

    content += '\nEGRESADOS RECIENTES:\n';
    reportData.recentGraduates.forEach(graduate => {
      content += `- ${graduate.fullName} (${graduate.email}) - Año: ${graduate.entry}\n`;
    });

    content += '\n\n---\n';
    content += 'Generado automáticamente por el Sistema de Gestión de Graduados\n';
    content += `Fecha de generación: ${currentDate}`;

    return content;
  };

  const reportTypes = [
    {
      id: 'graduates-summary',
      title: 'Resumen de Egresados',
      description: 'Estadísticas generales de egresados',
      icon: FaUsers,
      color: 'bg-blue-500'
    },
    {
      id: 'graduates-by-year',
      title: 'Egresados por Año',
      description: 'Distribución de egresados por año de graduación',
      icon: FaCalendarAlt,
      color: 'bg-green-500'
    },
    {
      id: 'graduates-by-specialization',
      title: 'Egresados por Especialización',
      description: 'Distribución por especialización',
      icon: FaGraduationCap,
      color: 'bg-purple-500'
    },
    {
      id: 'classifications-report',
      title: 'Reporte de Clasificaciones',
      description: 'Análisis de clasificaciones de egresados',
      icon: FaChartBar,
      color: 'bg-orange-500'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-main"></div>
      </div>
    );
  }

  return (
    <main className="bg-white text-orange-main min-h-screen rounded-lg p-10 shadow-md">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-main sm:text-5xl">Reportes de Graduados</h1>
          <p className="mt-4 text-gray-600 font-normal">Genera reportes y estadísticas de egresados</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-orange-main text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm font-medium">Total Egresados</p>
                <p className="text-3xl font-bold">{reportData.totalGraduates}</p>
              </div>
              <FaUsers className="h-8 w-8 text-orange-200" />
            </div>
          </div>

          <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Estudiantes</p>
                <p className="text-3xl font-bold">{reportData.totalStudents}</p>
              </div>
              <FaGraduationCap className="h-8 w-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm font-medium">Clasificaciones</p>
                <p className="text-3xl font-bold">{reportData.totalClassifications}</p>
              </div>
              <FaChartBar className="h-8 w-8 text-green-200" />
            </div>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Este Año</p>
                <p className="text-3xl font-bold">
                  {reportData.graduatesByYear.find(item => item.year === new Date().getFullYear())?.count || 0}
                </p>
              </div>
              <FaCalendarAlt className="h-8 w-8 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <h3 className="text-lg font-semibold text-orange-main mb-4">Filtro por Rango de Fechas (Opcional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-orange-main mb-2">
                Fecha de Inicio
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-main mb-2">
                Fecha de Fin
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-orange-main rounded-xl focus:ring-2 focus:ring-orange-main focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((report) => {
            const IconComponent = report.icon;
            return (
              <div key={report.id} className="bg-white border-2 border-orange-main rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${report.color} text-white p-3 rounded-lg`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <button
                    onClick={() => generateReport(report.id)}
                    disabled={loading}
                    className="bg-orange-main text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center space-x-2"
                  >
                    <FaDownload />
                    <span>Generar</span>
                  </button>
                </div>
                
                <h3 className="text-xl font-semibold text-orange-main mb-2">
                  {report.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {report.description}
                </p>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => generateReport(report.id)}
                    disabled={loading}
                    className="flex-1 bg-orange-main text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center space-x-2"
                  >
                    <FaFilePdf />
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={() => generateReport(`${report.id}-excel`)}
                    disabled={loading}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center space-x-2"
                  >
                    <FaFileExcel />
                    <span>Excel</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Graduates Table */}
        {reportData.recentGraduates.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-orange-main mb-4">Egresados Recientes</h3>
            <div className="bg-white border-2 border-orange-main rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-orange-main text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Año de Ingreso</th>
                    <th className="px-4 py-3 text-left">Especialización</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.recentGraduates.slice(0, 5).map((graduate, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3">{graduate.fullName}</td>
                      <td className="px-4 py-3">{graduate.email}</td>
                      <td className="px-4 py-3">{graduate.entry}</td>
                      <td className="px-4 py-3">{graduate.specialization || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Reports;
