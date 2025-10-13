import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Navbar from '../navbar';
import { FaFilePdf } from 'react-icons/fa';

import useModal from '../../modal/useModal';
import ModalFile from '../../modal/modalFile';
import { PDFViewer } from '@react-pdf/renderer';
import ExportEvaluationPDF from '../../crud/handleRubric/exportPDF/ExportEvaluationPDF';
import ConfirmationDoubleModal from '../../modal/confirmation/confirmationDoubleModal';

const TemplateManagement = ({ items, itemsCopy, setItems, handleSaveChanges }) => {

    const dispatch = useDispatch();

    const handleClearTemplate = () => {
        // Verificar si rubric es un objeto válido
        if (items && typeof items === 'object') {
            // Crear una copia del objeto rubric
            const modifiedTemplate = { ...items };
            // Eliminar la propiedad sections y templateID del objeto modificado
            modifiedTemplate.sections = [];
            modifiedTemplate.templateID = null;
            // Devolver el objeto modificado
            dispatch(setItems.setItems(modifiedTemplate));
        } else {
            // Si rubric no es un objeto válido, devolver un objeto vacío
            dispatch(setItems.setItems({}));
        }
    };

    const resetTemplateToInitialState = () => {
        // Verificar si rubric es un objeto válido
        if (itemsCopy && typeof itemsCopy === 'object') {
            // Crear una copia del objeto itemsCopy que contiene la información cuando se realizo la petición inicial
            const modifiedTemplate = { ...itemsCopy };
            dispatch(setItems.setItems(modifiedTemplate));
        } else {
            // Si rubric no es un objeto válido, devolver un objeto vacío
            dispatch(setItems.setItems({}));
        }
    };

    const handleExportPDF = () => {
        openModalFile();
    };

    const { modalOpen: modalOpenFile, openModal: openModalFile, closeModal: closeModalFile } = useModal();

    const [eventType, setEventType] = useState(0);

    const handleSuccess = () => {
        if (eventType === 1) {
            handleSaveChanges();
        } else if (eventType === 2) {
            resetTemplateToInitialState();
        } else if (eventType === 3) {
            handleClearTemplate();
        }
        if (showAgain) {
            setHideMessageForever(true);
        }
        closeModalWarning();
    };

    const [ModalOpenWarning, setModalOpenWarning] = useState(false);
    const [showAgain, setShowAgain] = useState(false);
    const [hideMessageForever, setHideMessageForever] = useState(false);

    const openModalWarning = (eventType) => {
        setEventType(eventType);
        if (hideMessageForever) {
            handleSuccess();
        }
        else {
            setModalOpenWarning(true);
        }
    };
    const closeModalWarning = () => {
        setModalOpenWarning(false);
    };

    return (
        <>
            {/* Modal para el Archivo PDF */}
            <ModalFile isOpen={modalOpenFile} onClose={closeModalFile}>
                <div className="w-full h-screen">
                    <PDFViewer width="100%" height="100%">
                        <ExportEvaluationPDF rubric={items} />
                    </PDFViewer>
                </div>
            </ModalFile>

            {!hideMessageForever &&
                <ConfirmationDoubleModal eventType={eventType} ModalOpenWarning={ModalOpenWarning} showAgain={showAgain} setShowAgain={setShowAgain} handleSuccess={handleSuccess} closeModalWarning={closeModalWarning} />
            }

            {/* Navbar con botones */}
            <Navbar
                primaryButtons={[
                    {
                        id: 1,
                        label: "Visualizar",
                        onClick: handleExportPDF,
                        svg: <FaFilePdf size={20} />
                    },
                    {
                        id: 2,
                        label: "Guardar Cambios",
                        onClick: () => openModalWarning(1),
                        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                        </svg>

                    },
                    {
                        id: 3,
                        label: "Restablecer a Último Guardado",
                        onClick: () => openModalWarning(2),
                        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                    },
                    {
                        id: 4,
                        label: "Limpiar Todo",
                        onClick: () => openModalWarning(3),
                        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                    },
                ]}
                secondaryButtons={[]}
            />
        </>
    );
};

export default TemplateManagement;
