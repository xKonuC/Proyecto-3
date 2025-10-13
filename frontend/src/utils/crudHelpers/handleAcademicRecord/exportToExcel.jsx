import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// Inicializa el libro y la hoja de trabajo
const initializeWorkbook = () => {
    const workbook = new ExcelJS.Workbook();

    // Agregar la hoja adicional
    const coverSheet = workbook.addWorksheet('Portada', {
        views: [{ showGridLines: false }]
    });

    // Establecer el contenido en la hoja de portada
    const portadaContent = [
        { cell: 'A9', value: 'ANEXO N°11' },
        { cell: 'A11', value: 'NOMBRE DEL PROGRAMA' },
        { cell: 'A14', value: 'Nombre institución' },
        { cell: 'A15', value: 'Año proceso de acreditación' }
    ];

    portadaContent.forEach(item => {
        coverSheet.mergeCells(`${item.cell}:L${item.cell.slice(1)}`); // Merge cells from A to L
        const cell = coverSheet.getCell(item.cell);
        cell.value = item.value;
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = { bold: true };
    });

    // Agregar la hoja 'Ficha Académica' después de la hoja de portada
    const worksheet = workbook.addWorksheet('Ficha Académica', {
        views: [{ showGridLines: false }]
    });

    worksheet.getColumn(1).width = 60; // Columna A
    for (let i = 2; i <= 12; i++) { // Columnas B a L
        worksheet.getColumn(i).width = 50;
    }

    return { workbook, worksheet };
};

// Agregar Información Académica con Estilos Específicos
const addAcademicInfo = (worksheet, academicInfo) => {
    const styleBold = {
        font: { bold: true }
    };
    const styleGrayBackground = {
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'D9D9D9' }
        }
    };
    const borderStyle = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
    };

    const getOtherTitlesInfo = (titles) => {
        return titles
            .filter(title => title.title.type === 'Grado') // Filtrar solo títulos de tipo 'Grado'
            .map(title => {
                return `${title.title.name || ''}, ${title.title.universityName || ''}, ${title.titleYear || ''}, ${title.title.country || ''}`;
            })
            .join('; ');
    };

    const otherTitlesInfo = getOtherTitlesInfo(academicInfo.otherTitles);

    const rowData = [
        ['Ficha académica de los últimos 5 años'],
        [],
        ['1. Ficha académica por cada uno de los integrantes del cuerpo académico (utilizar únicamente este formato) [1]'],
        [],
        ['Nombre del académico o académica', academicInfo.fullName],
        ['Tipo de vínculo (claustro/núcleo o colaborador/a)', academicInfo.bondType],
        ['Título, institución, año de titulación y país', otherTitlesInfo],
        ['Grado académico máximo (especificar área disciplinar), institución, año de graduación y país [2]', `${academicInfo.bestDegreeTitle.name}, ${academicInfo.bestDegreeTitle.universityName}, ${academicInfo.bestDegreeTitleYear}, ${academicInfo.bestDegreeTitle.country}`],
        ['Línea(s) de investigación', academicInfo.investigationLines],
    ];

    rowData.forEach((row, index) => {
        const addedRow = worksheet.addRow(row);
        if (index === 0) {
            // Aplicar estilo de fondo gris y negrita desde A1 hasta I1
            for (let col = 1; col <= 9; col++) { // Asume que I es la novena columna
                addedRow.getCell(col).style = { ...styleBold, ...styleGrayBackground };
            }
        }
        if (index === 2) {
            // Aplicar negrita a la celda A3
            addedRow.getCell(1).style = styleBold;
        }
        if (index >= 4 && index <= 8) {
            addedRow.getCell(1).style = { ...styleGrayBackground, border: borderStyle };
            addedRow.getCell(2).border = borderStyle;
        }

        if (index === 7 && academicInfo.investigationLines.length > 20) {
            addedRow.getCell(1).alignment = { wrapText: true };
        }
    });
    worksheet.addRow([]);
};

// Función para agregar filas de datos a la hoja de trabajo
const addRowsToWorksheet = (worksheet, header, data, fields, title = '') => {
    if (title !== '') {
        worksheet.addRow([title]);
    }
    worksheet.addRow([]);
    // Agrega el encabezado
    const headerRow = worksheet.addRow(header);
    headerRow.eachCell(cell => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D9D9D9' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Centra el contenido
        cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } }
        }; // Agrega bordes a cada celda del encabezado
    });
    headerRow.height = 50;

    const borderStyle = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
    };

    // Agrega los datos
    data.forEach(item => {
        const rowData = fields.map(field => item[field.value]);
        const row = worksheet.addRow(rowData);
        row.eachCell(cell => {
            cell.border = borderStyle; // Aplica el borde a cada celda de datos
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; // Centra el contenido
        });
    });
    worksheet.addRow([]);
};

const addTitle = (worksheet, title) => {
    const titleRow = worksheet.addRow([title]);
    titleRow.eachCell(cell => {
        cell.font = { bold: true }; // Aplica negrita al título
    });
}

const addFooter = (worksheet) => {
    worksheet.addRow([]);
    const titleRow = worksheet.addRow(['Notas']);
    titleRow.eachCell(cell => {
        cell.font = { bold: true }; // Aplica negrita al título
    });
    worksheet.addRow(['[1] No es obligatorio incluir fichas de académicos visitantes.']);
    worksheet.addRow(['[2] Si se estima necesario, indicar todos los grados académicos obtenidos o equivalentes.']);
    worksheet.addRow(['[3] Para efectos de contabilizar la productividad académica de mujeres en claustros/núcleos, se tendrá en consideración los períodos de licencia por descanso de maternidad (pre y post-natal), adopción o tuición legal según lo detallado en Resolución Exenta DJ N°233-4 del 13 de enero de 2021.']);
}

// Ajustar Columnas y Guardar Archivo
const adjustColumnsAndSave = async (workbook, filename) => {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, filename);
};

// Función principal para exportar a Excel
export const exportToExcel = async (data) => {
    const { workbook, worksheet } = initializeWorkbook();

    if (data.academicInfo && data.academicInfo.length > 0) {
        addAcademicInfo(worksheet, data.academicInfo[0]);
    } else {
        console.error('No se encontraron datos de academicInfo.');
        return;
    }

    const currentYear = new Date().getFullYear();
    const lastFiveYears = currentYear - 5;

    const filterLastFiveYears = (item) => {
        const applicationYear = new Date(item.applicationDate).getFullYear();
        return item.year >= lastFiveYears || item.grantYear >= lastFiveYears || applicationYear >= lastFiveYears;
    };

    const formatToDDMMYYYY = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    if (data.guidedThesis && data.guidedThesis.result.length > 0) {
        addTitle(worksheet, '2. Tesis de magister dirigidas en los últimos 5 años (finalizadas)')

        // Define el encabezado para las tesis dirigidas y Co-Dirigidas
        const header = ['Autor', 'Año', 'Título de la Tesis', 'Nombre del programa', 'Institución', '¿La tesis fue dirigida en el mismo programa? Si/No', 'Link de acceso o medio de verificación electrónico'];

        // Obtén los datos para las tesis dirigidas y Co-Dirigidas
        const data1 = data.guidedThesis.result.filter(item => filterLastFiveYears(item) && item.role === 'Guía' && item.type === 'Magíster');
        const data2 = data.guidedThesis.result.filter(item => filterLastFiveYears(item) && item.role === 'Co-Guía' && item.type === 'Magíster');

        //Valores 
        const fields = [
            { value: 'author' },
            { value: 'year' },
            { value: 'title' },
            { value: 'program' },
            { value: 'institution' },
            { value: 'sameProgram' },
            { value: 'accessURL' },
        ];

        // Agrega las filas de tesis dirigidas y Co-Dirigidas
        addRowsToWorksheet(worksheet, header, data1, fields, '2.1. Como Guía de tesis');
        addRowsToWorksheet(worksheet, header, data2, fields, '2.2. Como co-Guía de tesis');
    }

    if (data.guidedThesis && data.guidedThesis.result.length > 0) {
        addTitle(worksheet, '3. Tesis de doctorado dirigidas en los últimos 5 años (finalizadas)')

        // Define el encabezado para las tesis dirigidas y Co-Dirigidas
        const header = ['Autor', 'Año', 'Título de la Tesis', 'Nombre del programa', 'Institución', 'Link de acceso o medio de verificación electrónico'];

        // Obtén los datos para las tesis dirigidas y Co-Dirigidas
        const data1 = data.guidedThesis.result.filter(item => filterLastFiveYears(item) && item.role === 'Guía' && item.type === 'Doctorado');
        const data2 = data.guidedThesis.result.filter(item => filterLastFiveYears(item) && item.role === 'Co-Guía' && item.type === 'Doctorado');

        //Valores 
        const fields = [
            { value: 'author' },
            { value: 'year' },
            { value: 'title' },
            { value: 'program' },
            { value: 'institution' },
            { value: 'accessURL' },
        ];

        // Agrega las filas de tesis dirigidas y Co-Dirigidas
        addRowsToWorksheet(worksheet, header, data1, fields, '3.1. Como Guía de tesis');
        addRowsToWorksheet(worksheet, header, data2, fields, '3.2. Como Co-Guía de tesis');
    }

    if ((data.publication && data.publication.result.length > 0) || (data.bookChapter && data.bookChapter.result.length > 0) || (data.patent && data.patent.result.length > 0)) {
        addTitle(worksheet, '4. Listado de publicaciones en los últimos 5 años. En caso de publicaciones con más de un autor, indicar el autor/a principal [3]')

        // Define el encabezado para las tesis dirigidas y Co-Dirigidas
        const header = ['Autor(es)', 'Autor/a principal', 'Año', 'Título del artículo', 'Nombre revista', 'Estado', 'ISSN', 'Link de acceso o medio de verificación electrónico'];
        const header2 = ['Autor(es)', 'Autor/a principal', 'Año', 'Nombre libro', 'Lugar', 'Editorial', 'Estado', 'Link de acceso o medio de verificación electrónico'];
        const header3 = ['Autor(es)', 'Autor/a principal', 'Año', 'Nombre libro', 'Nombre del capítulo', 'Lugar', 'Editorial', 'Estado', 'Link de acceso o medio de verificación electrónico'];
        const header4 = ['Inventor(es)', 'Nombre patente', 'Fecha de solicitud', 'Fecha de publicación', 'N° de registro', 'Estado', 'Link de acceso o medio de verificación electrónico'];
        const header5 = ['Tipo de Indexación', 'Autor(es)', 'Autor/a principal', 'Año', 'Título del artículo', 'Nombre revista', 'Estado', 'ISSN', 'Link de acceso o medio de verificación electrónico'];

        // Obtén los datos para las tesis dirigidas y Co-Dirigidas
        const data1 = data.publication.result.filter(item => filterLastFiveYears(item) && item.type === 'WoS');
        const data2 = data.publication.result.filter(item => filterLastFiveYears(item) && item.type === 'SCOPUS');
        const data3 = data.publication.result.filter(item => filterLastFiveYears(item) && item.type === 'SCIELO');
        const data4 = data.publication.result.filter(item => filterLastFiveYears(item) &&
            item.isIndexed === 1 && item.type !== 'WoS' && item.type !== 'SCOPUS' && item.type !== 'SCIELO');
        const data5 = data.bookChapter.result.filter(item => filterLastFiveYears(item) && item.type === 'Libro');
        const data6 = data.bookChapter.result.filter(item => filterLastFiveYears(item) && item.type === 'Capitulo de Libro');
        const data7 = data.publication.result.filter(item => filterLastFiveYears(item) && item.isIndexed === 0);
        const data8 = data.patent.result
            .filter(item => filterLastFiveYears(item))
            .map(item => {
                return {
                    ...item,
                    applicationDate: formatToDDMMYYYY(item.applicationDate),
                    publicationDate: formatToDDMMYYYY(item.publicationDate)
                };
            });

        //Valores 
        const fields = [
            { value: 'authors' },
            { value: 'leadAuthor' },
            { value: 'year' },
            { value: 'title' },
            { value: 'journal' },
            { value: 'status' },
            { value: 'ISSN' },
            { value: 'accessURL' },
        ];

        const fields2 = [
            { value: 'authors' },
            { value: 'leadAuthor' },
            { value: 'year' },
            { value: 'bookName' },
            { value: 'place' },
            { value: 'editorial' },
            { value: 'status' },
            { value: 'accessURL' },
        ];

        const fields3 = [
            { value: 'authors' },
            { value: 'leadAuthor' },
            { value: 'year' },
            { value: 'bookName' },
            { value: 'chapterName' },
            { value: 'place' },
            { value: 'editorial' },
            { value: 'status' },
            { value: 'accessURL' },
        ];

        const fields4 = [
            { value: 'inventors' },
            { value: 'patentName' },
            { value: 'applicationDate' },
            { value: 'publicationDate' },
            { value: 'registrationNumber' },
            { value: 'status' },
            { value: 'accessURL' },
        ];

        const fields5 = [
            { value: 'type' },
            { value: 'authors' },
            { value: 'leadAuthor' },
            { value: 'year' },
            { value: 'title' },
            { value: 'journal' },
            { value: 'status' },
            { value: 'ISSN' },
            { value: 'accessURL' },
        ];

        // Agrega las filas de tesis dirigidas y Co-Dirigidas
        addRowsToWorksheet(worksheet, header, data1, fields, '4.1. Publicaciones indexadas WoS');
        addRowsToWorksheet(worksheet, header, data2, fields, '4.2. Publicaciones indexadas SCOPUS');
        addRowsToWorksheet(worksheet, header, data3, fields, '4.3. Publicaciones indexadas SCIELO');
        addRowsToWorksheet(worksheet, header5, data4, fields5, '4.4. Otras publicaciones indexadas (identificar tipo de indexación: LATINDEX u otra)');
        addRowsToWorksheet(worksheet, header2, data5, fields2, '4.5. Publicaciones no indexadas LIBRO');
        addRowsToWorksheet(worksheet, header3, data6, fields3, '4.6. Publicaciones no indexadas CAPÍTULOS DE LIBRO');
        addRowsToWorksheet(worksheet, header, data7, fields, '4.7. Otras publicaciones no indexadas (identificar tipo, revistas con referato u otro)');
        addRowsToWorksheet(worksheet, header4, data8, fields4, '4.8. Patentes');
    }

    if (data.project && data.project.result.length > 0) {
        addTitle(worksheet, '5. Listado de proyectos de investigación, últimos 5 años')

        // Define el encabezado para las tesis dirigidas y Co-Dirigidas
        const header = ['Título', 'Fuente de financiamiento', 'Año de adjudicación', 'Período de ejecución', 'Rol en el proyecto: investigador responsable/director, co-investigador, etc.', 'Link de acceso o medio de verificación electrónico'];

        // Obtén los datos para las tesis dirigidas y Co-Dirigidas
        const data1 = data.project.result.filter(item => filterLastFiveYears(item) && item.type === 'Investigación');

        //Valores 
        const fields = [
            { value: 'title' },
            { value: 'fundingSource' },
            { value: 'grantYear' },
            { value: 'executionPeriod' },
            { value: 'role' },
            { value: 'accessURL' },
        ];

        // Agrega las filas de tesis dirigidas y Co-Dirigidas
        addRowsToWorksheet(worksheet, header, data1, fields);
    }

    if (data.project && data.project.result.length > 0) {
        addTitle(worksheet, '6. Listado de proyectos de intervención, innovación y/o desarrollo tecnológico, últimos 5 años')

        // Define el encabezado para las tesis dirigidas y Co-Dirigidas
        const header = ['Título', 'Fuente de financiamiento', 'Año de adjudicación', 'Período de ejecución', 'Rol en el proyecto: investigador responsable/director, co-investigador, etc.', 'Link de acceso o medio de verificación electrónico'];

        // Obtén los datos para las tesis dirigidas y Co-Dirigidas
        const data1 = data.project.result.filter(item => filterLastFiveYears(item) && item.type !== 'Investigación');

        //Valores 
        const fields = [
            { value: 'title' },
            { value: 'fundingSource' },
            { value: 'grantYear' },
            { value: 'executionPeriod' },
            { value: 'role' },
            { value: 'accessURL' },
        ];

        // Agrega las filas de tesis dirigidas y Co-Dirigidas
        addRowsToWorksheet(worksheet, header, data1, fields);
    }

    if (data.consultancy && data.consultancy.result.length > 0) {
        addTitle(worksheet, '7. Listado de consultorías y/o asistencias técnicas, en calidad de responsable, últimos 5 años')

        // Define el encabezado para las tesis dirigidas y Co-Dirigidas
        const header = ['Título', 'Institución contratante', 'Año de adjudicación', 'Período de ejecución', 'Objetivo', 'Link de acceso o medio de verificación electrónico'];

        // Obtén los datos para las tesis dirigidas y Co-Dirigidas
        const data1 = data.consultancy.result;

        //Valores 
        const fields = [
            { value: 'title' },
            { value: 'contractingInstitution' },
            { value: 'grantYear' },
            { value: 'executionPeriod' },
            { value: 'objective' },
            { value: 'accessURL' },
        ];

        // Agrega las filas de tesis dirigidas y Co-Dirigidas
        addRowsToWorksheet(worksheet, header, data1, fields);
    }

    addFooter(worksheet);
    await adjustColumnsAndSave(workbook, 'ficha_academica.xlsx');
};
