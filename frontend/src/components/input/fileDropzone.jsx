import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const colorClasses = {
    gray: "border-gray-400 text-gray-400",
    white: "border-white text-white",
};

const FileDropzone = ({
    onFileChange,
    color = "gray",
    allowedFileTypes = ['.png', '.jpg', '.doc','.docx', '.pdf', '.xls'],
}) => {
    // Función para manejar el evento de "drop" de archivos
    const handleDrop = useCallback(
        (acceptedFiles) => {
            // Filtrar los archivos para eliminar cualquier valor "undefined"
            const validFiles = acceptedFiles.filter((file) => file);

            // Procesar los archivos aceptados (puedes agregar validaciones u otras operaciones aquí)
            if (validFiles.length > 0) {
                // Asignar el primer archivo válido a "fileValue" o "null" si no hay archivos válidos
                const fileValue = validFiles[0] || null;
                // Llamar a la función "onFileChange" y pasarle el archivo seleccionado
                onFileChange(fileValue);
            }
        },
        [onFileChange, allowedFileTypes]
    );

    // Obtener las propiedades necesarias para el área de "dropzone" mediante el hook "useDropzone"
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

    const className = `
        group flex items-center justify-center text-center 
        w-full h-full
        border-2 border-dashed rounded-lg cursor-pointer transition duration-300
        bg-transparent  ${colorClasses[color]} 
        hover:text-orange-main hover:border-orange-main
    `;

    return (
        <label {...getRootProps()} htmlFor="dropzone-file" className={className}>
            <div className="flex flex-col items-center justify-center pt-5 py-6">
                <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>

                <input {...getInputProps()} id="dropzone-file" className="hidden" />

                {isDragActive ? (
                    <p className="text-xs sm:text-sm">
                        <span className="font-semibold">Arrastra el archivo aquí...</span>
                    </p>
                ) : (
                    <p className="text-xs sm:text-sm">
                        <span className="font-semibold">Arrastra un archivo aquí o haz clic para seleccionarlo.</span>
                    </p>
                )}
                <p className="text-xs">
                    Solo se permiten los siguientes tipos de archivos:
                </p>
                <ul className="text-start list-disc pl-4 text-xs">
                    {allowedFileTypes.map((type, index) => (
                        <li key={index}>{type}</li>
                    ))}
                </ul>
            </div>
        </label>
    );
};

export default FileDropzone;
