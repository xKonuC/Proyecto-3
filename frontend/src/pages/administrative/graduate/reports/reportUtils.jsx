// reportUtils.jsx
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/* ======================================================
   CONFIGURACIÓN GENERAL
====================================================== */
const LOGO_SRC = '/logo-magister.png';

// Márgenes (tú ajustarás después)
const MARGIN_SIDES = 15;
const MARGIN_TOP = 20;
const MARGIN_BOTTOM = 20;

// Reservas visuales (header/footer dentro de los márgenes)
const HEADER_HEIGHT = 18; // espacio para logo
const FOOTER_HEIGHT = 16; // espacio para footer

/* ======================================================
   HELPERS
====================================================== */
const formatSex = (sex) =>
  sex === 'M' ? 'Masculino' : sex === 'F' ? 'Femenino' : 'N/A';

const safe = (v, fallback = 'N/A') =>
  v === null || v === undefined || v === '' ? fallback : v;

// Carga logo como dataURL para que jsPDF no falle
const loadImageAsDataUrl = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo cargar el logo (${res.status})`);
  const blob = await res.blob();

  return await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
};

const getImageTypeFromDataUrl = (dataUrl) => {
  if (!dataUrl || typeof dataUrl !== 'string') return null;
  if (dataUrl.startsWith('data:image/png')) return 'PNG';
  if (dataUrl.startsWith('data:image/jpeg') || dataUrl.startsWith('data:image/jpg')) return 'JPEG';
  return null;
};

// ✅ Tamaño de letra por reporte (si quieres diferenciar)
const getTableFontSize = (reportTitle) => {
  const t = reportTitle?.toLowerCase() || '';
  if (t.includes('graduados por año')) return 20;
  if (t.includes('graduados por especialización')) return 20;
  return 18; // default
};

// ✅ Reglas de filas por página según reporte (usamos el título)
// - Resumen: pág 1 = 12, pág 2+ = 14
// - Clasificaciones: pág 1 = 11, pág 2+ = 14
const getRowsForPage = (reportTitle, pageIndex) => {
  const t = reportTitle?.toLowerCase() || '';
  const isSummary = t.includes('resumen de graduados');
  const isClassifications = t.includes('reporte de clasificaciones');

  if (isSummary) return pageIndex === 1 ? 12 : 14;
  if (isClassifications) return pageIndex === 1 ? 11 : 14;

  // Default para otros reportes:
  return pageIndex === 1 ? 12 : 15;
};

// Parte el arreglo por páginas usando reglas variables (pág 1 distinta)
const splitByPages = (rows, reportTitle) => {
  const pages = [];
  let index = 0;
  let page = 1;

  while (index < rows.length) {
    const take = getRowsForPage(reportTitle, page);
    pages.push(rows.slice(index, index + take));
    index += take;
    page++;
  }

  return pages.length ? pages : [[]];
};

/* ======================================================
   EXPORT DATA
====================================================== */
export const getExportData = (reportId, reportData) => {
  switch (reportId) {
    case 'graduates-summary':
    case 'classifications-report':
      return (reportData?.recentGraduates || []).map((g) => ({
        RUT: safe(g.rut, 'N/A'),
        Nombre: safe(g.fullName, 'N/A'),
        Sexo: formatSex(g.sex),
        Email: safe(g.email, 'N/A'),
        'Año Ingreso': safe(g.entry, 'N/A'),
        Especialización: safe(g.specialization, 'N/A'),
        'Lugar de trabajo': safe(g.workPlace || g.workplace, 'N/A'),
        Ocupación: safe(g.job, 'N/A'),
      }));

    case 'graduates-by-year':
      return (reportData?.graduatesByYear || []).map((i) => ({
        Año: i.year,
        Graduados: i.count,
      }));

    case 'graduates-by-specialization':
      return (reportData?.graduatesBySpecialization || []).map((i) => ({
        Especialización: i.specialization,
        Graduados: i.count,
      }));

    case 'acreditacion-report':
      return getAccreditationExportData(reportData);

    default:
      return [];
  }
};

const getAccreditationExportData = (reportData) => {
  const graduates =
    reportData?.accreditationGraduates ||
    reportData?.graduates ||
    reportData?.recentGraduates ||
    [];

  return graduates.map((g) => ({
    'Identificador (RUT)': safe(g.rut, 'N/A'),
    Sexo: formatSex(g.sex),
    'Año de graduación': safe(g.graduationYear, 'No disponible'),

    'Situación ocupacional (pre magíster)': 'No disponible',
    'Cargo (pre magíster)': 'No disponible',
    'Lugar de trabajo (pre magíster)': 'No disponible',

    'Situación ocupacional (post magíster)': 'No disponible',
    'Cargo (post magíster)': safe(g.job, 'No disponible'),
    'Lugar de trabajo (post magíster)': safe(g.workplace || g.workPlace, 'No disponible'),
  }));
};

/* ======================================================
   EXCEL
====================================================== */
export const exportToExcel = (data, fileName) => {
  if (!data || !data.length) {
    alert('No hay datos para exportar.');
    return;
  }

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Reporte');

  const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([buffer]), `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
};

/* ======================================================
   HTML PARA PDF (POR PÁGINA)
   PÁGINA 1: con título + descripción
   PÁGINA 2+: sin título (solo tabla)
====================================================== */
const createPdfPageElement = ({ reportTitle, pageRows, headers, pageIndex }) => {
  const container = document.createElement('div');

  container.style.width = '1100px';
  container.style.background = '#fff';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.color = '#333';
  container.style.boxSizing = 'border-box';
  container.style.padding = '0';
  container.style.margin = '0';

  const showTitleBlock = pageIndex === 1;
  const tableFontSize = getTableFontSize(reportTitle);

  container.innerHTML = `
    ${
      showTitleBlock
        ? `
          <div style="padding: 18px 20px 10px 20px; box-sizing:border-box;">
            <h1 style="
              text-align:center;
              color:#F97316;
              font-size:40px;
              font-weight:800;
              margin:8px 0 10px 0;
            ">
              ${reportTitle}
            </h1>
            <p style="
              text-align:center;
              font-size:20px;
              color:#555;
              margin:0 0 14px 0;
            ">
              Reporte generado el ${new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        `
        : `
          <div style="height: 10px;"></div>
        `
    }

    <div style="padding: 0 20px 20px 20px; box-sizing:border-box;">
      <table style="
        width:100%;
        border-collapse:collapse;
        font-size:${tableFontSize}px;
        font-family: Arial, sans-serif;
        line-height:1.25;
        table-layout: fixed;
      ">
        <thead>
          <tr style="background:#F97316; color:white;">
            ${headers
              .map(
                (h) => `
              <th style="
                padding:12px;
                border:1px solid #ddd;
                text-align:left;
                font-weight:700;
                word-break: break-word;
              ">${h}</th>
            `
              )
              .join('')}
          </tr>
        </thead>
        <tbody>
          ${
            pageRows.length
              ? pageRows
                  .map(
                    (row, i) => `
                <tr style="background:${i % 2 === 0 ? '#f3f4f6' : '#fff'};">
                  ${headers
                    .map(
                      (h) => `
                    <td style="
                      padding:12px;
                      border:1px solid #ddd;
                      vertical-align:top;
                      word-break: break-word;
                      overflow-wrap: anywhere;
                      white-space: normal;
                    ">${safe(row[h], '')}</td>
                  `
                    )
                    .join('')}
                </tr>
              `
                  )
                  .join('')
              : `
                <tr>
                  <td colspan="${headers.length}" style="padding:18px; text-align:center; color:#999; font-size:${tableFontSize}px;">
                    No hay datos para este reporte.
                  </td>
                </tr>
              `
          }
        </tbody>
      </table>
    </div>
  `;

  return container;
};

/* ======================================================
   PDF GENERATOR (PÁGINAS POR FILAS)
====================================================== */
export const generatePDFFromData = async (reportTitle, exportData, isPreview = false) => {
  const headers = exportData?.length ? Object.keys(exportData[0]) : [];
  const pages = splitByPages(exportData || [], reportTitle);
  const totalPages = pages.length;

  let logoDataUrl = null;
  let logoType = null;

  try {
    logoDataUrl = await loadImageAsDataUrl(LOGO_SRC);
    logoType = getImageTypeFromDataUrl(logoDataUrl);
    if (!logoType) logoDataUrl = null;
  } catch (e) {
    console.warn('Logo no disponible:', e?.message || e);
  }

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const usableWidth = pageWidth - MARGIN_SIDES * 2;
  const contentTopY = MARGIN_TOP + HEADER_HEIGHT; // aquí ajustas “margen superior real”
  const contentBottomY = pageHeight - MARGIN_BOTTOM - FOOTER_HEIGHT;
  const usableHeight = contentBottomY - contentTopY;

  const drawHeader = () => {
    if (logoDataUrl && logoType) {
      const logoW = 32;
      const logoH = 12;
      pdf.addImage(logoDataUrl, logoType, MARGIN_SIDES, MARGIN_TOP - 10, logoW, logoH);
    }
  };

  const drawFooter = (pageNumber) => {
    pdf.setTextColor(120);
    pdf.setFont('helvetica', 'normal');

    pdf.setFontSize(15);
    pdf.text('Sistema de Gestión', pageWidth / 2, pageHeight - 10, { align: 'center' });

    pdf.setFontSize(13);
    pdf.text(String(pageNumber), pageWidth - MARGIN_SIDES, pageHeight - 10, { align: 'right' });
  };

  const drawWatermark = () => {
    if (!isPreview) return;

    const text = 'VISTA PREVIA';
    const fontSize = 60;

    pdf.saveGraphicsState();
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(fontSize);
    pdf.setTextColor(200, 200, 200);

    const gState = pdf.GState({ opacity: 0.20 });
    pdf.setGState(gState);

    pdf.text(text, pageWidth / 2, pageHeight / 2, { align: 'center', angle: -35 });
    pdf.restoreGraphicsState();
  };

  for (let i = 0; i < totalPages; i++) {
    if (i > 0) pdf.addPage();

    const pageEl = createPdfPageElement({
      reportTitle,
      pageRows: pages[i],
      headers,
      pageIndex: i + 1, // para ocultar título desde pág 2
    });

    pageEl.style.position = 'absolute';
    pageEl.style.left = '-99999px';
    pageEl.style.top = '0';
    document.body.appendChild(pageEl);

    try {
      const canvas = await html2canvas(pageEl, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      const imgHeight = (canvas.height * usableWidth) / canvas.width;

      // Si por alguna razón excede usableHeight, lo escalamos (para no pisar footer)
      const drawW = usableWidth;
      let drawH = imgHeight;

      if (drawH > usableHeight) {drawH = usableHeight;} 

      // ✅ Margen lateral uniforme en todas las páginas (igual que pág 1)
      const x = MARGIN_SIDES;

      drawHeader();
      pdf.addImage(imgData, 'JPEG', x, contentTopY, drawW, drawH);
      drawWatermark();
      drawFooter(i + 1);
    } finally {
      document.body.removeChild(pageEl);
    }
  }

  if (isPreview) return pdf.output('bloburl');

  pdf.save(`${reportTitle}_${new Date().toISOString().split('T')[0]}.pdf`);
  return true;
};
