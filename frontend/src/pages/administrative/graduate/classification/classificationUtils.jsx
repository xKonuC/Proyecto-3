// frontend/src/pages/administrative/graduate/classification/classificationUtils.jsx
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';

const formatCriteriaList = (criteria) => {
    if (!criteria) return 'No se definieron criterios.';
    
    const criteriaLabels = {
        'minAverage': 'Promedio mínimo', 'academicExcellence': 'Excelencia académica', 'publications': 'Publicaciones', 
        'researchFocus': 'Enfoque en investigación', 'leadership': 'Liderazgo', 'management': 'Gestión', 
        'promedio': 'Promedio', 'especializacion': 'Especialización', 'cargo': 'Cargo', 'experiencia': 'Experiencia', 
        'publicaciones': 'Publicaciones', 'tipo': 'Tipo', 'groups': 'Grupos', 'entryYears': 'Años de ingreso', 
        'articulations': 'Articulaciones', 'specializations': 'Especializaciones', 'workPlaces': 'Lugares de trabajo', 
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
        }
        
        return `${label}: ${displayValue}`;
    }).join('; ');
};

export const prepareClassificationExportData = (data, dateFormatter) => {
    if (!data || data.length === 0) return [];
    
    return data.map(g => ({
        'Graduado': g.fullName, 
        'Email': g.email,
        'Año de Ingreso': g.entry,
        'Lugar de Trabajo': g.workPlace || 'N/E',
        'Clasificado': dateFormatter(g.classifiedAt)
    }));
};

// --- EXPORTACIÓN A EXCEL ---
export const exportClassificationToExcel = (data, classification) => {
    if (!data || data.length === 0) {
        alert("No hay datos para exportar a Excel.");
        return;
    }
    
    const classificationName =
        classification?.name ||
        classification?.classificationName ||
        'Clasificación sin nombre';

    const totalGraduates = classification?.graduates?.length || 0;
    const criteriaList = formatCriteriaList(classification?.criteria);

    // 1. Filas de resumen para Excel
    const aoaSummary = [
        ['Reporte de Clasificación:', classificationName],
        ['Reporte generado el:', new Date().toLocaleDateString('es-ES')],
        [], 
        ['Información de la Clasificación'],
        ['Total de Graduados:', totalGraduates],
        ['Criterios de Clasificación'],
        [criteriaList],
        [], 
        Object.keys(data[0]) 
    ];

    const ws = XLSX.utils.aoa_to_sheet(aoaSummary);

    XLSX.utils.sheet_add_json(ws, data, { skipHeader: true, origin: "A10" });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clasificación");

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob(
        [excelBuffer],
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
    );
    
    const safeFilename = `Clasificacion_${classificationName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
    saveAs(dataBlob, safeFilename);
};


// --- LÓGICA DE GENERACIÓN DE PDF ---

const formatCriteriaForPdf = (criteria) => {
    if (!criteria) return '';
    
    const criteriaLabels = {
        'minAverage': 'Promedio mínimo', 'academicExcellence': 'Excelencia académica', 'publications': 'Publicaciones', 
        'researchFocus': 'Enfoque en investigación', 'leadership': 'Liderazgo', 'management': 'Gestión', 
        'promedio': 'Promedio', 'especializacion': 'Especialización', 'cargo': 'Cargo', 'experiencia': 'Experiencia', 
        'publicaciones': 'Publicaciones', 'tipo': 'Tipo', 'groups': 'Grupos', 'entryYears': 'Años de ingreso', 
        'articulations': 'Articulaciones', 'specializations': 'Especializaciones', 'workPlaces': 'Lugares de trabajo', 
        'jobs': 'Cargos'
    };

    const items = Object.entries(criteria).map(([key, value]) => {
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
        
        return `<span style="background-color: #F97316; color: white; padding: 4px 8px; border-radius: 12px; font-size: 10px; margin-right: 6px; margin-bottom: 6px; display: inline-block;">
                    ${label}: ${displayValue}
                </span>`;
    }).join('');

    return `<div style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 10px;">
                <p style="font-weight: bold; color: #333; margin-bottom: 8px; font-size: 12px;">Criterios de Clasificación:</p>
                <div style="display: flex; flex-wrap: wrap;">${items}</div>
            </div>`;
};

const createPdfContentElement = (classificationName, totalGraduates, criteria, exportData) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.backgroundColor = 'rgb(255, 255, 255)'; 
    container.style.width = '190mm';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.color = '#333';

    container.innerHTML = `
        <h1 style="color: #F97316; font-size: 28px; margin-bottom: 10px; text-align: center;">
            REPORTE DE CLASIFICACIÓN: ${classificationName}
        </h1>
        <p style="color: #4B5563; margin-bottom: 20px; text-align: center; font-size: 14px;">
            Reporte generado el ${new Date().toLocaleDateString('es-ES')}.
        </p>
    `;

    const summaryBlock = document.createElement('div');
    summaryBlock.style.marginBottom = '30px';
    summaryBlock.innerHTML = `
        <h3 style="font-weight: bold; color: #333; margin-bottom: 10px; font-size: 18px;">Información de la Clasificación</h3>
        
        <p style="font-weight: bold; color: #333; font-size: 14px; margin-bottom: 10px;">Total de Graduados: <span style="font-size: 18px; color: #F97316;">${totalGraduates}</span></p>

        <h4 style="font-weight: bold; color: #333; margin-top: 15px; margin-bottom: 5px; font-size: 14px;">Criterios de Clasificación</h4>
        ${formatCriteriaForPdf(criteria)}
    `;
    container.appendChild(summaryBlock);

    const graduatesTitle = document.createElement('h3');
    graduatesTitle.innerText = `Graduados (${exportData.length})`;
    graduatesTitle.style.fontWeight = 'bold';
    graduatesTitle.style.color = '#333';
    graduatesTitle.style.fontSize = '18px';
    graduatesTitle.style.marginTop = '25px';
    graduatesTitle.style.marginBottom = '10px';
    container.appendChild(graduatesTitle);

    if (exportData.length > 0) {
        const headers = Object.keys(exportData[0]);
        let tableHTML = `
            <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-top: 10px;">
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
        noData.innerText = "No hay graduados que cumplan con los criterios de esta clasificación.";
        container.appendChild(noData);
    }

    return container;
};

const generatePDFFromData = async (classificationName, totalGraduates, criteria, exportData, isPreview = false) => {
    const safeClassificationName = (classificationName || 'Clasificación sin nombre').toString();
    
    const input = createPdfContentElement(safeClassificationName, totalGraduates, criteria, exportData);

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

            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(150, 150, 150); 
            pdf.setFontSize(fontSize);
            
            const gState = pdf.GState({ opacity: 0.3 }); 
            pdf.setGState(gState);
            
            pdf.saveGraphicsState();
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
            pdf.save(`Clasificacion_${safeClassificationName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
            return true;
        }
    } catch (error) {
        console.error("Error CRÍTICO al generar PDF:", error);
        alert("Ocurrió un error al generar el PDF. Revisa la consola para más detalles.");
        return null;
    } finally {
        document.body.removeChild(input);
    }
};

export const exportClassificationToPDF = async (data, classificationName, criteria, totalGraduates) => {
    if (!data || data.length === 0) {
        alert("No hay datos para exportar a PDF.");
        return;
    }
    
    await generatePDFFromData(classificationName, totalGraduates, criteria, data, false); 
};
