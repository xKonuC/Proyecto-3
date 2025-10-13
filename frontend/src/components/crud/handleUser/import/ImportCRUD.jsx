/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as XLSX from "xlsx";

// Componentes personalizados
import CreateFileService from '../../../../utils/crudHelpers/service/fileService/createFileService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler'
import FileDropzone from '../../../input/fileDropzone';
import StyledButton from '../../../button/styledButton';

//Estilos
import ImportIcon from '../../../icon/handle/importIcon';
import FetchService from '../../../../utils/crudHelpers/service/baseService/fetchService';

const ImportCRUD = ({ acceptedFiles, name, label = '', urls, setItems, toggleDrawer, showAlert }) => {
  // Estado local del componente
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  // -------------------------------Funciones Para CRUD-------------------------------
  const handleFileChange = async (file) => {
    // Verificar si el archivo es un XLSX
    if (!file.name.endsWith('.xlsx')) {
      showAlert({
        type: 'error',
        content: 'El archivo debe tener formato XLSX.',
      });
      return;
    }

    // Leer el archivo XLSX
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Obtener la primera hoja del libro de trabajo
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Obtener los nombres de las columnas
        const headers = [];

        // Verificar si el nombre del encabezado está vacío antes de agregarlo a la lista de headers
        // Iterar sobre las columnas para obtener sus nombres
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        // Verificar si el nombre del encabezado está vacío antes de agregarlo a la lista de headers
        for (let c = range.s.c; c <= range.e.c; c++) {
          const cellAddress = XLSX.utils.encode_cell({ r: 0, c });
          const cell = worksheet[cellAddress];
          // Manejar el caso del nombre de encabezado vacío
          if (cell.v.trim() === '') {
            showAlert({
              type: 'warning',
              content: `El nombre de un encabezado está vacío en la columna ${XLSX.utils.encode_col(c + 1)}.`,
            });
            // Realizar alguna acción adicional, como continuar o salir del proceso
            return; // O return; dependiendo de la acción que desees tomar
          }

          let header = cell.v.trim(); // Obtener el nombre del encabezado y eliminar espacios en blanco
          // Verificar si el nombre del encabezado es similar al valor `label` de algún elemento en `acceptedFiles`
          const matchingLabel = acceptedFiles.find(option => option.label.toLowerCase() === header.toLowerCase());
          if (matchingLabel) {
            // Cambiar el nombre del encabezado a `value`
            header = matchingLabel.value;
          }

          headers.push(header); // Agregar el nombre del encabezado a la lista de headers
        }

        // Verificar si hay columnas duplicadas y encontrar las columnas que sobran
        const columnCounts = {};
        const extraColumns = [];
        headers.forEach(column => {
          columnCounts[column] = (columnCounts[column] || 0) + 1;
          if (!acceptedFiles.find(option => option.value === column)) {
            extraColumns.push(column);
          }
        });

        const duplicateColumns = Object.entries(columnCounts)
          .filter(([column, count]) => count > 1)
          .map(([column, count]) => column);

        if (duplicateColumns.length > 0) {
          showAlert({
            type: 'error',
            content: `El archivo no puede tener columnas duplicadas. Las siguientes columnas están duplicadas: ${duplicateColumns.join(', ')}`,
          });
          return;
        }

        if (extraColumns.length > 0) {
          showAlert({
            type: 'error',
            content: `El archivo contiene columnas no requeridas. Las siguientes columnas no son necesarias: ${extraColumns.join(', ')}`,
          });
          return;
        }

        // Verificar si el archivo tiene todas las columnas requeridas
        const requiredColumns = acceptedFiles.map(option => option.value);
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
        if (missingColumns.length > 0) {
          showAlert({
            type: 'error',
            content: `El archivo no contiene todas las columnas requeridas. Faltan las siguientes columnas: ${missingColumns.join(', ')}`,
          });
          return;
        }

        // Convertir los datos a los tipos esperados y verificar errores
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Obtener los nombres de las columnas a partir de la primera fila
        const columnNames = rows[0];
        const errors = [];

        // Iterar sobre las filas, comenzando desde la segunda fila (índice 1)
        for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
          const row = rows[rowIndex];

          // Verificar si la fila está vacía
          if (row.length === 0) {
            continue; // Omitir esta fila y pasar a la siguiente
          }
          for (let colIndex = 0; colIndex < columnNames.length; colIndex++) {
            const header = columnNames[colIndex]; // Obtener el nombre de la columna de la primera fila
            const acceptedFile = acceptedFiles.find(option => option.value === header || option.label.toLowerCase() === header.toLowerCase());
            if (!header || !acceptedFile) {
              // Si el encabezado no está en las columnas aceptadas, no hacer nada
              continue;
            }

            const expectedType = acceptedFile.type;
            const defaultValue = acceptedFile.default;
            const value = row[colIndex];
            // Verificar si el valor de la columna pertenece a la categoría especificada
            const category = acceptedFile.category;
            if (category && !category.includes(value)) {
              showAlert({
                type: 'error',
                content: `El valor "${value}" en la columna "${header}" no pertenece a la categoría especificada los cuales son ${category}.`,
              });
              return; // Puedes decidir cómo manejar esta situación, aquí se retorna para detener el proceso
            }
            try {
              // Si el valor es null o undefined o cadena vacía, usar el valor por defecto si está definido
              if (value == null || value == undefined || value == '') {
                if (defaultValue != undefined && defaultValue != null) {
                  row[colIndex] = defaultValue;
                } else {
                  showAlert({
                    type: 'error',
                    content: `El campo "${header}" está vacío en la fila ${rowIndex + 1} y no se ha proporcionado un valor por defecto.`,
                  });
                  return;
                }
              }

              switch (expectedType) {
                case 'string':
                  if (!isNaN(Number(value))) {
                    const stringValue = value.toString();
                    row[colIndex] = stringValue; // Reemplazar con el valor convertido a string
                  }
                  break;
                case 'int':
                  const intValue = parseInt(value, 10);
                  if (isNaN(intValue)) throw new Error(`No se pudo convertir a entero: ${value}`);
                  row[colIndex] = intValue; // Reemplazar con el valor convertido a entero
                  break;
                case 'year':
                  if (typeof value === 'string' || typeof value === 'number') {
                    const yearValue = String(value);
                    row[colIndex] = yearValue; // Reemplazar con el valor convertido a tipo "year"
                  }
                  break;
                case 'date':
                  if (typeof value === 'number') {
                    // Convertir número de serie de fecha a objeto Date
                    const msPerDay = 24 * 60 * 60 * 1000; // Milisegundos por día
                    const epochStart = Date.UTC(1900, 0, 1); // Fecha de inicio del número de serie
                    const dateValue = new Date(epochStart + value * msPerDay);

                    if (isNaN(dateValue.getTime())) {
                      throw new Error(`No se pudo convertir a fecha: ${value}`);
                    }

                    row[colIndex] = dateValue; // Reemplazar con el valor convertido a tipo "date"
                  } else if (typeof value === 'string') {
                    // Convertir cadena a objeto Date
                    const dateValue = new Date(value);

                    if (isNaN(dateValue.getTime())) {
                      throw new Error(`No se pudo convertir a fecha: ${value}`);
                    }

                    row[colIndex] = dateValue; // Reemplazar con el valor convertido a tipo "date"
                    console.log(row[colIndex]);
                  } else {
                    throw new Error(`No se pudo convertir a fecha: ${value}`);
                  }
                  break;
                default:
                  throw new Error(`Tipo de dato no soportado: ${expectedType}`);
              }


            } catch (conversionError) {
              errors.push(`Error en la fila ${rowIndex + 1} (celda ${XLSX.utils.encode_cell({ r: rowIndex, c: colIndex })}): ${conversionError.message}`);
            }
          }
        }

        // Si hay errores, mostrarlos
        if (errors.length > 0) {
          showAlert({
            type: 'error',
            content: `Se encontraron errores al procesar el archivo: ${errors.join('; ')}`,
          });
          return;
        }

        // Actualizar el objeto de hoja de cálculo con los datos modificados
        const updatedWorksheet = XLSX.utils.aoa_to_sheet(rows);
        workbook.Sheets[sheetName] = updatedWorksheet;

        // Convertir el libro de trabajo modificado a un nuevo archivo XLSX en memoria
        const updatedData = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

        // Crear un Blob con los datos actualizados (sin generar el enlace de descarga)
        const updatedBlob = new Blob([updatedData], { type: 'application/octet-stream' });

        // Crear un nuevo objeto File con los datos actualizados
        const updatedFile = new File([updatedBlob], file.name, { type: 'application/octet-stream' });

        // Actualizar la variable file
        setSelectedFile(updatedFile);
        showAlert({
          type: 'verification',
          content: 'Se ha cargado y procesado el archivo correctamente.',
        });

      } catch (error) {
        console.error('Error al leer el archivo XLSX:', error);
        showAlert({
          type: 'error',
          content: 'Ocurrió un error al leer el archivo XLSX. Por favor, intenta nuevamente.',
        });
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const url = import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/roleAssignment/importUsers/';
    const createService = new CreateFileService(url, name, showAlert, responseHandler);
    await createService.execute(
      {}, selectedFile,
    );
  };

  // Función para manejar los datos obtenidos
  const handleData = (data) => {
    dispatch(setItems.setItems(data));
    toggleDrawer();
  };

  // Función para manejar la verificación
  const handleVerification = async (message) => {
    showAlert({
      type: 'verification',
      content: message,
    });
    const fetchService = new FetchService(urls[1], name, showAlert, responseHandler);
    await fetchService.execute({});
  };

  // Función para manejar la renovación
  const handleRenewal = async (message) => {
    showAlert({
      type: 'verification',
      content: message,
    });
  };

  // Función para manejar las respuestas de los servicios
  const responseHandler = (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onData: handleData,
      onVerification: handleVerification,
      onRenewal: handleRenewal,
    });
  };

  return (
    <>
      <div className="flex-col items-center h-full">
        <FileDropzone onFileChange={handleFileChange} color="white" heightSM="3/4" />
        <div className="flex-1 w-full mt-2">
          <StyledButton
            onClick={handleCreate}
            type="submit"
            heightSM="12"
            height="10"
          >
            <ImportIcon />
            {label}
          </StyledButton>
        </div>
      </div>
    </>
  );
};

export default ImportCRUD;