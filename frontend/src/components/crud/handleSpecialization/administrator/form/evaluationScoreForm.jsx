import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleSpecialization/administrative/scoresAndEvaluatorSlice';

// Componentes
import FormContainerNotUpdate from '../../../../forms/body/formContainerNotUpdate';
import ModalCRUD from '../../../../modal/modalCRUD';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

// Estilos
import EditIcon from '../../../../icon/crud/editIcon';

const EvaluationScoreForm = memo(({ url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleSpecialization.administrative.scoresAndEvaluator);

    // Estado local para las notas
    const [grades, setGrades] = useState([]);

    // Inicializa las notas al cargar el componente
    useEffect(() => {
        setGrades([
            { label: 'Evaluador A', grade: newItem.grade1 },
            { label: 'Evaluador B', grade: newItem.grade2 },
            { label: 'Director', grade: newItem.grade3 },
            { label: 'Codirector', grade: newItem.grade4 !== null ? newItem.grade4 : null },
            { label: 'Director de Programa', grade: newItem.grade5 },
        ]);
    }, [newItem]);

    // Función para manejar cambios en las notas y actualizar el estado local
    const handleGradeChange = (index, value) => {
        const newGrades = [...grades];
        const gradeValue = value || ''; // Si no se puede convertir a número, se establece 0
        newGrades[index].grade = gradeValue;
        setGrades(newGrades);
    };

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
        await updateService.execute({
            ...newItem,
            grade1: parseFloat(grades[0].grade).toFixed(1),
            grade2: parseFloat(grades[1].grade).toFixed(1),
            grade3: parseFloat(grades[2].grade).toFixed(1),
            grade4: grades[3].grade !== null ? parseFloat(grades[3].grade).toFixed(1) : null,
            grade5: parseFloat(grades[4].grade).toFixed(1),
        });
        // Actualiza el estado de Redux con las notas
        dispatch(setNewItem({
            ...newItem,
            grade1: grades[0].grade,
            grade2: grades[1].grade,
            grade3: grades[2].grade,
            grade4: grades[3].grade !== null ? grades[3].grade : null,
            grade5: grades[4].grade,
        }));
    };

    // Función para calcular el promedio de las notas
    const calculateAverage = () => {
        const validGrades = grades
            .filter(item => item.grade !== null)  // Filtrar grades que no sean null
            .map(item => parseFloat(item.grade));
        const sum = validGrades.reduce((acc, grade) => acc + grade, 0);
        return sum / validGrades.length;
    };

    return (
        <ModalCRUD isOpen={modalOpen}>
            <FormContainerNotUpdate
                message={'Asignación de Notas para Defensa Oral'}
                secondaryMessage={''}
                messageButton={'Asignar Notas'}
                handleSubmit={handleSubmit}
                closeModal={closeModal}
                customPath={<EditIcon />}
            >
                <div className="overflow-auto h-96 space-y-2">
                    {grades.map((item, index) => (
                        <div key={index}>
                            {item.grade !== null && (
                                <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-3 transition duration-100 hover:bg-gray-100">
                                    <div className="space-y-2 w-full">
                                        <strong className="block text-start font-medium text-gray-900">{item.label}</strong>
                                        <div className="w-full">
                                            <div className="relative text-gray-500 transition duration-150
     rounded-lg border border-gray-500
     hover:ring-orange-main hover:border-transparent hover:ring-1 hover:text-orange-main
      focus-within:text-orange-main
     ">
                                                <input
                                                    type="text"
                                                    id={`grade-${index}`}
                                                    value={item.grade}
                                                    onChange={(e) => handleGradeChange(index, e.target.value)}
                                                    placeholder={`Ingresar nota del ${item.label}`}
                                                    className="w-full h-8 sm:h-9 pl-10 pr-2.5 py-2
            text-xs sm:text-sm border rounded-lg border-transparent 
            focus:border-b-orange-main focus:border-transparent focus:outline-none 
            focus:ring-2 focus:ring-orange-main focus:text-gray-600"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Campo para mostrar el promedio */}
                    <div className="flex items-center justify-between">
                        <div>Promedio: {calculateAverage().toFixed(1)}</div>
                    </div>
                </div>
            </FormContainerNotUpdate>
        </ModalCRUD>
    );
});

export default EvaluationScoreForm;
