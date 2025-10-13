import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNewStudentHasSpecialization, setNewStudentHasSpecialization } from '../../../../../../redux/slice/handleSpecialization/student/studentHasSpecialization/studentHasSpecializationSlice';

import UpdateService from '../../../../../../utils/crudHelpers/service/baseService/updateService';
import CreateService from '../../../../../../utils/crudHelpers/service/baseService/createService';
import StudentHasSpecializationForm from '../form/studentHasSpecializationForm'
import StyledButton from '../../../../../button/styledButton';
import FormButtons from '../../../../../button/form/formButtons';

import TimeIndicator from '../../../../../shared/timeIndicator';

const SpecializationSection = memo(({ items, url, itemName, permission, isLoading, showAlert, responseHandler }) => {

    const dispatch = useDispatch();
    const { newStudentHasSpecialization } = useSelector((state) => state.handleSpecialization.student.studentHasSpecialization);
    const [updateId, setUpdateId] = useState(null);
    
    // Función para manejar la edición de un elemento
    const handleEdit = (item) => {
        setUpdateId(item.studentHasSpecializationID);
        dispatch(setNewStudentHasSpecialization({
            specializationID: item.specializationID,
            semesterID: item.entrySemester.semesterID,
        }));
    };

    // Función para limpiar el elemento en edición
    const clearItem = () => {
        dispatch(clearNewStudentHasSpecialization());
        setUpdateId(null);
    };

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ studentHasSpecializationID: updateId, ...newStudentHasSpecialization });
            clearItem();
        } else {
            const createService = new CreateService(url, itemName, showAlert, responseHandler);
            await createService.execute(
                { ...newStudentHasSpecialization }
            );
        }
    };

    return (
        <section className="mx-auto max-w-5xl bg-white text-orange-main">
            <TimeIndicator permission={permission[0]} />
            <div className="container flex flex-col">
                <div className="divide-y divide-orange-second">
                    {!updateId && (
                        <div className={`${isLoading ? 'animate-pulse' : ''} relative grid justify-center grid-cols-5 py-2 sm:py-4 mx-auto sm:space-y-4 space-y-0`}>
                            <div className="flex items-center justify-center sm:col-span-1 col-span-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 sm:w-28 h-32 sm:h-28">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                </svg>

                            </div>
                            <div className="flex flex-col justify-center max-w-4xl text-center col-span-full sm:col-span-4 sm:text-left">
                                <div className='my-2 space-y-2'>
                                    <StudentHasSpecializationForm />
                                </div>
                                <div className="flex-1 w-full">
                                    <StyledButton
                                        onClick={handleSubmit}
                                        type="submit"
                                    >
                                        {!updateId && (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}

                                        {updateId && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                        )}
                                        {updateId ? `Modificar ${itemName}` : `Seleccionar ${itemName}`}
                                    </StyledButton>
                                </div>
                            </div>
                        </div>
                    )}
                    {isLoading ?
                        <>
                            <div className="animate-pulse mb-12 sm:mb-2 relative grid justify-center grid-cols-5 py-2 sm:py-4 mx-auto sm:space-y-4 space-y-0">
                                <div className="flex items-center justify-center sm:col-span-1 col-span-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 sm:w-28 h-32 sm:h-28">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                    </svg>
                                </div>
                                <div className="space-y-2 w-full flex flex-col justify-center text-center col-span-full sm:col-span-4 sm:text-left">
                                    <span className="px-2 w-3/5 h-6 rounded-lg bg-gray-100"></span>

                                    <span className="px-2 w-2/5 h-9 rounded-lg bg-gray-100"></span>
                                    <span className="px-2 w-full h-5 rounded-lg bg-gray-100"></span>
                                    <div className="h-10">
                                        <div className='w-full'>
                                            <StyledButton >
                                            </StyledButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> :
                        <>
                            {items.map((item) => (
                                <div key={item.studentHasSpecializationID}
                                    className={`${(updateId && updateId === item.studentHasSpecializationID) ? ' mb-1 sm:mb-2' : 'mb-12 sm:mb-2'} relative grid justify-center grid-cols-5 py-2 sm:py-4 mx-auto sm:space-y-4 space-y-0`}>
                                    <div className="flex items-center justify-center sm:col-span-1 col-span-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 sm:w-28 h-32 sm:h-28">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col justify-center max-w-4xl text-center col-span-full sm:col-span-4 sm:text-left">
                                        <span className="text-sm sm:text-base font-normal text-orange-main">
                                            {item.entrySemester.year} - {item.entrySemester.semesterNumber === 1 ? 'Primer' : 'Segundo'} Semestre

                                            {item.completionSemester.semesterNumber ? (
                                                <>
                                                    {' '} a {item.completionSemester.year} - {item.completionSemester.semesterNumber === 1 ? 'Primer' : 'Segundo'} Semestre
                                                </>
                                            ) : null}
                                        </span>

                                        <span className={`${(updateId && updateId === item.studentHasSpecializationID) ? 'hidden' : 'flex justify-center sm:justify-start'} text-2xl md:text-3xl font-bold`}>{item.specialization.name}</span>
                                        {(updateId && updateId === item.studentHasSpecializationID) && (
                                            <div className='my-2 space-y-2'>
                                                <StudentHasSpecializationForm />
                                            </div>
                                        )}
                                        <span className="break-words my-1 text-sm sm:text-base text-gray-500">
                                            {item.semesterStatus.description}
                                        </span>
                                        {(updateId && updateId === item.studentHasSpecializationID) && (
                                            <FormButtons
                                                handleSubmit={handleSubmit}
                                                updateId={updateId}
                                                itemName={itemName}
                                                closeModal={clearItem}
                                                isExpired={new Date() > new Date(permission[0].dueDate)}
                                            />
                                        )}
                                        <div className={`${(updateId && updateId === item.studentHasSpecializationID) ? 'hidden' : 'flex'} flex flex-col sm:flex-row gap-1 sm:gap-2 h-10`}>
                                            {(new Date() > new Date(permission[0].dueDate)) ? 
                                                <>
                                                    <div className='flex-1'>
                                                        <StyledButton >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />                                                </svg>
                                                                Periodo de Elección de Linea de Formación Finalizado
                                                        </StyledButton>
                                                    </div>
                                                </>:<>
                                                <div className='flex-1'>
                                                    <StyledButton onClick={() => handleEdit(item)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                        Modificar
                                                    </StyledButton>
                                                </div>
                                            </> }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </div>
            </div>
        </section>
    );
});

export default SpecializationSection;
