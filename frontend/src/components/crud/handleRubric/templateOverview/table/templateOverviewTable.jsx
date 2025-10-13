import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Acciones de Redux para gestionar el estado global de las rúbricas
import {
    setItems,
} from '../../../../../redux/slice/handleRubric/templateOverview/templateOverviewSlice';

import SearchSelect from '../../../../input/searchSelect';
import StyledButton from '../../../../button/styledButton';
import { handleAddQuestion, handleDeleteQuestion, handleDeleteSection, moveQuestion, moveSection } from '../../../../../utils/crudHelpers/handleRubric/templateUtils';
import useModal from '../../../../modal/useModal';
import ModalCRUD from '../../../../modal/modalCRUD';
import CreateIcon from '../../../../icon/crud/createIcon';
import Checkbox from '../../../../input/checkbox';
import DeleteIcon from '../../../../icon/crud/deleteIcon';
import FormContainerNotUpdate from '../../../../forms/body/formContainerNotUpdate';

const TemplateOverviewTable = ({ questionSelect }) => {

    const dispatch = useDispatch(); // Hook de Redux para despachar acciones al store
    const { items: template } = useSelector((state) => state.handleRubric.templateOverview);
    // Estados locales para almacenar datos de nuevas secciones y preguntas
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [sectionID, setSectionID] = useState(null);
    const { modalOpen, openModal, closeModal } = useModal(
        false,
        {
            onClose: () => {
                setSectionID(null);
                setSelectedQuestion(null);
            }
        }
    );

    const openModalQuestion = (sectionID) => {
        setSectionID(sectionID);
        openModal();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddQuestion(selectedQuestion, sectionID, template, dispatch, setItems)
        closeModal();
    };

    return (
        <>

            <ModalCRUD isOpen={modalOpen}>
                <FormContainerNotUpdate
                    message="Agregar Pregunta"
                    secondaryMessage=""
                    messageButton="Agregar Pregunta"
                    customPath={<CreateIcon />}
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                >
                    <SearchSelect
                        options={questionSelect}
                        value={selectedQuestion}
                        onChange={setSelectedQuestion}
                        placeholder="Selecciona una pregunta"
                        selectId={`${sectionID}`}
                    />
                </FormContainerNotUpdate>
            </ModalCRUD>

            <div>
                {template.templateID && (
                    <div key={template.templateID} className="mt-5">
                        {template.sections.map((section) => (
                            <div key={section.sectionID} className="overflow-x-auto my-2 space-y-2">
                                <div className="grid grid-cols-11 space-y-2 sm:space-y-0">
                                    <h3 className="text-2xl font-semibold block col-span-full sm:col-span-8 text-center sm:text-start">{section.name}</h3>
                                    <div className="col-span-full sm:col-span-3 flex space-x-1">
                                        <StyledButton
                                            onClick={() => moveSection('up', section.sectionID, template, dispatch, setItems)}
                                            height="10"
                                            paddingX="1"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={"w-6 h-6 transition-transform transform"}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </StyledButton>
                                        <StyledButton
                                            onClick={() => moveSection('down', section.sectionID, template, dispatch, setItems)}
                                            height="10"
                                            paddingX="1"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={"w-6 h-6 transition-transform transform rotate-180"}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </StyledButton>
                                        <StyledButton
                                            onClick={() => openModalQuestion(section.sectionID)}
                                            height='10'
                                            paddingX='1'
                                        >
                                            <CreateIcon />
                                        </StyledButton>
                                        <StyledButton
                                            onClick={() => handleDeleteSection(section.sectionID, template, dispatch, setItems)}
                                            color="red"
                                            height='10'
                                            paddingX='1'
                                        >
                                            <DeleteIcon />
                                        </StyledButton>
                                    </div>
                                </div>
                                <table className="min-w-full text-sm rounded-lg">
                                    <thead className="bg-gray-800 text-gray-100 border border-gray-700">
                                        <tr>
                                            <th className="w-1/12">Ordenar</th>
                                            <th className="w-5/12">Preguntas</th>
                                            <th className="w-1/12">Excelente</th>
                                            <th className="w-1/12">Bien</th>
                                            <th className="w-1/12">Aceptable</th>
                                            <th className="w-1/12">Insuficiente</th>
                                            <th className="w-1/12">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.questions.map((question) => (
                                            <tr key={question.questionID} className="border border-opacity-20 border-gray-700 bg-white">
                                                <td className="space-y-0.5 px-3 py-1.5 border border-opacity-20 border-gray-700">
                                                    <StyledButton
                                                        onClick={() => moveQuestion('up', section.sectionID, question.questionID, template, dispatch, setItems)}
                                                        height="10"
                                                        paddingX="1"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className={"w-6 h-6 transition-transform transform"}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </StyledButton>
                                                    <StyledButton
                                                        onClick={() => moveQuestion('down', section.sectionID, question.questionID, template, dispatch, setItems)}
                                                        height="10"
                                                        paddingX="1"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className={"w-6 h-6 transition-transform transform rotate-180"}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </StyledButton>
                                                </td>
                                                <td className="p-3 text-center border border-opacity-20 border-gray-700">
                                                    {question.question}
                                                </td>
                                                <td className="text-center">
                                                    <Checkbox
                                                        id={`Excelente-${section.sectionID}-${question.questionID}`}
                                                        name={`Excelente-${section.sectionID}-${question.questionID}`}
                                                        checked={question.answer === 'Excelente'}
                                                        onChange={(e) => e.preventDefault()} />
                                                </td>
                                                <td className="text-center">
                                                    <Checkbox
                                                        id={`Bien-${section.sectionID}-${question.questionID}`}
                                                        name={`Bien-${section.sectionID}-${question.questionID}`}
                                                        checked={question.answer === 'Bien'}
                                                        onChange={(e) => e.preventDefault()} />
                                                </td>
                                                <td className="text-center">
                                                    <Checkbox
                                                        id={`Aceptable-${section.sectionID}-${question.questionID}`}
                                                        name={`Aceptable-${section.sectionID}-${question.questionID}`}
                                                        checked={question.answer === 'Aceptable'}
                                                        onChange={(e) => e.preventDefault()} />
                                                </td>
                                                <td className="text-center">
                                                    <Checkbox
                                                        id={`Insuficiente-${section.sectionID}-${question.questionID}`}
                                                        name={`Insuficiente-${section.sectionID}-${question.questionID}`}
                                                        checked={question.answer === 'Insuficiente'}
                                                        onChange={(e) => e.preventDefault()} />
                                                </td>
                                                <td className="p-3 text-center border border-opacity-20 border-gray-700">
                                                    <StyledButton
                                                        onClick={() => handleDeleteQuestion(section.sectionID, question.questionID, template, dispatch, setItems)}
                                                        color="red"
                                                        height='10'
                                                        paddingX='1'
                                                    >
                                                        <DeleteIcon />
                                                    </StyledButton>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default TemplateOverviewTable;
