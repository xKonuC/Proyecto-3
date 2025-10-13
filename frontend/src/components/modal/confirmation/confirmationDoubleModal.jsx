import React from 'react';

// Componentes personalizados
import Checkbox from '../../input/checkbox';
import ModalCRUD from '../modalCRUD';
import StyledButton from '../../button/styledButton';

const ConfirmationDoubleModal = ({ eventType, ModalOpenWarning, showAgain, setShowAgain, handleSuccess, closeModalWarning }) => {

    const getTitleText = () => {
        switch (eventType) {
            case 1:
                return '¿Estás seguro de que deseas guardar los cambios?';
            case 2:
                return '¿Estás seguro de que deseas restablecer al último estado de guardado?';
            case 3:
                return '¿Estás seguro de que deseas limpiar todo?';
            default:
                return '';
        }
    };

    const getBodyText = () => {
        switch (eventType) {
            case 1:
                return 'Al hacer clic en "Continuar", se actualizarán y guardarán los cambios realizados. ¿Estás seguro de continuar?';
            case 2:
                return 'Al hacer clic en "Continuar", se restablecerá la rubrica actual al último estado de guardado que tenía al momento de cargar esta página. ¿Estás seguro de que deseas proceder?';
            case 3:
                return 'Al hacer clic en "Continuar", se eliminarán todos los datos y cambios realizados hasta el momento. ¿Estás seguro de que deseas limpiar todo?';
            default:
                return '';
        }
    };

    return (
        <ModalCRUD isOpen={ModalOpenWarning}>
            <div className="flex flex-col max-w-xl gap-2 p-6 rounded-md shadow-md bg-white text-orange-main">
                <h2 className="text-2xl text-center sm:text-start font-bold text-orange-main">
                    {getTitleText()}
                </h2>
                <p className="flex-1 text-justify sm:text-start text-gray-400">
                    {getBodyText()}
                </p>
                <div className="grid grid-cols-3 gap-2 sm:mt-4 sm:flex-row">
                    <div className="col-span-full sm:col-span-1 flex items-center justify-center space-x-2">
                        <Checkbox
                            id={`showAgain`}
                            name={`showAgain`}
                            checked={showAgain}
                            onChange={(e) => setShowAgain(e.target.checked)}
                        />
                        <p className="text-sm cursor-pointer text-gray-400">No vuelvas a mostrar este mensaje</p>
                    </div>
                    <div className="grid grid-cols-2 col-span-full sm:col-span-2 flex-col gap-1 sm:flex-row">
                        <div className='col-span-full sm:col-span-1'>
                            <StyledButton
                                onClick={handleSuccess}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Continuar
                            </StyledButton>
                        </div>
                        <div className='col-span-full sm:col-span-1'>
                            <StyledButton
                                onClick={closeModalWarning}
                                color='red'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Cancelar
                            </StyledButton>
                        </div>
                    </div>
                </div>
            </div>
        </ModalCRUD>
    );
};

export default ConfirmationDoubleModal;
