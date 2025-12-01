import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


export const getExportData = (reportId, reportData) => {
    switch (reportId) {
        case 'graduates-summary':
        case 'classifications-report':
            return reportData.recentGraduates.map(g => ({
                RUT: g.rut,
                Nombre: g.fullName,
                Sexo: g.sex === 'M' ? 'Masculino'
                    : g.sex === 'F' ? 'Femenino'
                    : 'N/A',
                Email: g.email,
                'Año Ingreso': g.entry,
                Especialización: g.specialization || 'N/A',
                'Lugar de trabajo': g.workPlace || 'N/A',
                Ocupación: g.job || 'N/A'
            }));
        case 'graduates-by-year':
            return reportData.graduatesByYear.map(item => ({ Año: item.year, Graduados: item.count }));
        case 'graduates-by-specialization':
            return reportData.graduatesBySpecialization.map(item => ({ Especialización: item.specialization, Graduados: item.count }));
        case 'acreditacion-report':
            return getAccreditationExportData(reportData);
        default:
            return [];
    }
};

// DATOS PARA REPORTE DE ACREDITACION
const getAccreditationExportData = (reportData) => {
    const graduates =
    reportData.accreditationGraduates ||
    reportData.graduates ||
    reportData.recentGraduates ||
    [];

    return graduates.map((g) => ({
        'Identificador (RUT)': g.rut,
        'Sexo': g.sex === 'M' ? 'Masculino' : g.sex === 'F' ? 'Femenino' : 'No disponible',

        'Año de graduación': g.graduationYear || 'No disponible',

        // PRE MAGÍSTER (
        'Situación ocupacional (pre magíster)': 'No disponible',
        'Cargo (pre magíster)': 'No disponible',                 
        'Lugar de trabajo (pre magíster)': 'No disponible',      

        // POST MAGÍSTER 
        'Situación ocupacional (post magíster)': 'No disponible',
        'Cargo (post magíster)': g.job || 'No disponible',
        'Lugar de trabajo (post magíster)': g.workplace || g.workPlace || 'No disponible',
    }));
};

export const exportToExcel = (data, fileName) => {
    if (!data || data.length === 0) {
        alert("No hay datos para exportar a Excel.");
        return;
    }
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' 
    });
    saveAs(dataBlob, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
};

const createPdfContentElement = (reportTitle, exportData) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.backgroundColor = 'rgb(255, 255, 255)'; 
    container.style.width = '190mm';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.color = '#333';

    container.innerHTML = `
        <h1 style="color: #F97316; font-size: 28px; margin-bottom: 10px; text-align: center;">
            ${reportTitle}
        </h1>
        <p style="color: #4B5563; margin-bottom: 20px; text-align: center; font-size: 14px;">
            Reporte generado el ${new Date().toLocaleDateString()}.
        </p>
    `;

    if (exportData.length > 0) {
        const headers = Object.keys(exportData[0]);
        let tableHTML = `
            <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-top: 20px;">
                <thead>
                    <tr style="background-color: #F97316; color: white;">
                        ${headers.map(h => `<th style="padding: 10px; border: 1px solid #ddd; text-align: left;">${h}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${exportData.map((row, index) => `
                        <tr style="background-color: ${index % 2 === 0 ? '#f3f4f6' : '#ffffff'};">
                            ${headers.map(h => `<td style="padding: 10px; border: 1px solid #ddd;">${row[h]}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        const tableWrapper = document.createElement('div');
        tableWrapper.innerHTML = tableHTML;
        container.appendChild(tableWrapper);
    } else {
        const noData = document.createElement('p');
        noData.style.color = '#EF4444';
        noData.style.textAlign = 'center';
        noData.innerText = "No hay datos disponibles para este reporte.";
        container.appendChild(noData);
    }

    return container;
};

export const generatePDFFromData = async (reportTitle, exportData, isPreview = false) => {
    const input = createPdfContentElement(reportTitle, exportData);

    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);

    try {
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const heightLeft = (canvas.height * pdfWidth) / canvas.width;
    
        const textWatermark = "VISTA PREVIA";
        const fontSize = 70; 

        pdf.setFontSize(fontSize);
        const textWidth = pdf.getStringUnitWidth(textWatermark) * fontSize / pdf.internal.scaleFactor;
        
        const xPos = (pdfWidth - textWidth) / 2;
        const yPos = pdfHeight / 4; 

        const addWatermark = (shouldDraw) => {
            if (!shouldDraw) return;

            pdf.saveGraphicsState();

            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(200, 200, 200); 
            pdf.setFontSize(fontSize);
            const gState = pdf.GState({ opacity: 0.3 });
            pdf.setGState(gState)
            
            pdf.text(textWatermark, xPos, yPos, { angle: -45 });
            
            pdf.restoreGraphicsState();
        };

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, heightLeft); 
        
        addWatermark(isPreview); 

        let currentPageOffset = pdfHeight;
        while (heightLeft - currentPageOffset > 0) {
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, -currentPageOffset, pdfWidth, heightLeft);
            
            addWatermark(isPreview); 
            currentPageOffset += pdfHeight;
        }
       
        if (isPreview) {
            return pdf.output('bloburl');
        } else {
            pdf.save(`${reportTitle}_${new Date().toISOString().split('T')[0]}.pdf`);
            return true;
        }
    } catch (error) {
        console.error("Error CRÍTICO al generar PDF. El proceso fue interrumpido:", error);
        alert("Ocurrió un error al generar el PDF. Revisa la consola para más detalles.");
        return null;
    } finally {
        document.body.removeChild(input);
    }
};