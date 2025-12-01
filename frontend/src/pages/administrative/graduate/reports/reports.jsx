import React, { useState } from 'react';
import { FaChartBar, FaFilePdf, FaFileExcel, FaUsers, FaGraduationCap, FaCalendarAlt, FaEye } from 'react-icons/fa';
import PreviewModal from './previewModel';
import { getExportData, exportToExcel, generatePDFFromData } from './reportUtils';
import useReportSummaryData from './summaryCards';
import { getAccessToken } from '../../../../utils/cookieUtils';

const Reports = () => {
  const { loading, reportData, setLoading } = useReportSummaryData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const handleGenerateReport = async (reportId, format, reportTitle) => {
    try {
      setLoading(true);

      let sourceData = reportData;

      if (reportId === 'acreditacion-report') {
        const token = getAccessToken();

        const response = await fetch(
          'http://localhost:5000/api/role/administrator/graduate/reports/accreditation-report',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          },
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        sourceData = result.data;
      }

      const exportData = getExportData(reportId, sourceData);
      
      if (exportData.length === 0) {
        alert("No hay datos disponibles para generar este reporte.");
        return;
      }
      
      if (format === 'preview' || format === 'pdf') {
        const result = await generatePDFFromData(reportTitle, exportData, format === 'preview');
        
        if (format === 'preview' && result) {
          setPdfPreviewUrl(result);
          setModalTitle(reportTitle);
          setIsModalOpen(true);
        }

      } else if (format === 'excel') {
        exportToExcel(exportData, reportTitle);
      }
      
    } catch (error) {
      console.error('Error al generar reporte:', error);
      alert(`Error al generar el reporte ${format.toUpperCase()}. Por favor, inténtalo de nuevo.`);
    } finally {
      setLoading(false);
    }
  };
  
  const reportTypes = [
    { id: 'graduates-summary', title: 'Resumen de Graduados', description: 'Estadísticas generales de graduados', icon: FaUsers, color: 'bg-blue-500' },
    { id: 'graduates-by-year', title: 'Graduados por Año', description: 'Distribución de graduados por año de graduación', icon: FaCalendarAlt, color: 'bg-green-500' },
    { id: 'graduates-by-specialization', title: 'Graduados por Especialización', description: 'Distribución por especialización', icon: FaGraduationCap, color: 'bg-purple-500' },
    { id: 'classifications-report', title: 'Reporte de Clasificaciones', description: 'Análisis de clasificaciones de graduados', icon: FaChartBar, color: 'bg-orange-500' },
    { id: 'acreditacion-report', title: 'Reporte de Acreditación', description: 'Reporte de acreditación', icon: FaChartBar, color: 'bg-orange-500' },
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
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-main sm:text-5xl">Reportes de Graduados</h1>
          <p className="mt-4 text-gray-600 font-normal">Genera reportes y estadísticas de graduados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-orange-main text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm font-medium">Total Graduados</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((report) => {
            const IconComponent = report.icon;
            return (
              <div key={report.id} className="bg-white border-2 border-orange-main rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex items-center space-x-3`}>
                    <div className={`${report.color} text-white p-3 rounded-lg`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-orange-main">
                      {report.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleGenerateReport(report.id, 'preview', report.title)}
                    disabled={loading}
                    className="bg-orange-main text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center space-x-2"
                  >
                    <FaEye />
                    <span>Vista Previa</span>
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4 ml-14">
                  {report.description}
                </p>
                
                <div className="flex space-x-2">
                  
                  <button
                    onClick={() => handleGenerateReport(report.id, 'pdf', report.title)}
                    disabled={loading}
                    className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center space-x-2"
                  >
                    <FaFilePdf />
                    <span>PDF</span>
                  </button>
                 
                  <button
                    onClick={() => handleGenerateReport(report.id, 'excel', report.title)}
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

        {reportData.recentGraduates.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-orange-main mb-4">Graduados Recientes</h3>
            <div className="bg-white border-2 border-orange-main rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-orange-main text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">RUT</th>
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">Sexo</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Año de Ingreso</th>
                    <th className="px-4 py-3 text-left">Año de Graduación</th>
                    <th className="px-4 py-3 text-left">Especialización</th>
                    <th className="px-4 py-3 text-left">Lugar de Trabajo</th>
                    <th className="px-4 py-3 text-left">Ocupación</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.recentGraduates.slice(0, 20).map((graduate, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3">{graduate.rut || 'N/A'}</td>
                      <td className="px-4 py-3">{graduate.fullName}</td>
                      <td className="px-4 py-3">{graduate.sex === 'M' ? 'Masculino'
                          : graduate.sex === 'F' ? 'Femenino'
                          : 'N/A'}
                      </td>
                      <td className="px-4 py-3">{graduate.email}</td>
                      <td className="px-4 py-3">{graduate.entry}</td>
                      <td className="px-4 py-3">{graduate.graduationYear || 'N/A'}</td>
                      <td className="px-4 py-3">{graduate.specialization || 'N/A'}</td>
                      <td className="px-4 py-3">{graduate.workPlace || 'N/A'}</td>
                      <td className="px-4 py-3">{graduate.job || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      <PreviewModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setPdfPreviewUrl('');
        }} 
        pdfUrl={pdfPreviewUrl} 
        reportTitle={modalTitle}
      />
    </main>
  );
};

export default Reports;