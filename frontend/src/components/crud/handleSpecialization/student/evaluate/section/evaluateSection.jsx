import React from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

import IconOnlyAlert from '../../../../../alert/iconOnlyAlert'
import StyledButton from '../../../../../button/styledButton';
import StyledLinkButton from '../../../../../button/variation/StyledLinkButton';
import { LateIndicator } from '../../../../../shared/lateIndicator';
import ReviewCRUD from '../review/reviewCRUD';

const EvaluateSection = ({ urls, items, handleEdit, isLoading }) => {
    const { evaluationTypeID } = useParams();
    const evaluationTypeIDAsNumber = parseInt(evaluationTypeID, 10);
    const minNumber = 1;

    return (
        <div className="bg-white text-gray-100 w-full">
            {isLoading ?
                <>
                    <div className="flex items-center justify-center h-96">
                        <IconOnlyAlert />
                    </div>
                </> :
                <>
                    {
                        items.map((item) => (
                            <div key={item.evaluationID} className="container py-6 rounded-lg bg-white">
                                <div className="flex flex-col sm:flex-row gap-2 item-center justify-center sm:justify-end">
                                    <LateIndicator lateMinutes={item.lateMinutes} />
                                    <div className="px-2 py-1 text-center font-bold rounded bg-orange-main text-white">
                                        {item.evaluationStatus.name}
                                    </div>
                                </div>
                                <div className="my-2">
                                    <div className="text-xl text-center sm:text-start font-bold md:text-3xl text-orange-main">{item.specialization.name} - {evaluationTypeIDAsNumber === 1 ? 'Anteproyecto' : 'Tesis'}</div>
                                </div>
                                {item.thesis_grades &&
                                    <span className="break-words text-xs sm:text-base text-gray-500">
                                        Notas {(item?.thesis_grades?.grade1?.toFixed(1) ?? minNumber.toFixed(1))} -
                                        {(item?.thesis_grades?.grade2?.toFixed(1) ?? minNumber.toFixed(1))} -
                                        {(item?.thesis_grades?.grade3?.toFixed(1) ?? minNumber.toFixed(1))}
                                    </span>
                                }
                                <div className='flex flex-col sm:flex-row justify-start item-center space-x-2 break-words text-xs sm:text-base text-gray-500'>
                                    <span>
                                        {evaluationTypeIDAsNumber === 1 ? 'Anteproyecto Subido: ' : 'Tesis Subida: '}
                                        {format(new Date(item.creationDate), 'dd/MM/yyyy')}
                                        {' a las '}
                                        {format(new Date(new Date(item.creationDate).setHours(new Date(item.creationDate).getHours() + 4)), 'HH:mm')}
                                    </span>
                                    {item.updateDate && (
                                        <span>
                                            Última Actualización de {evaluationTypeIDAsNumber === 1 ? 'Anteproyecto: ' : 'Tesis: '}
                                            {format(new Date(item.updateDate), 'dd/MM/yyyy')}
                                        {' a las '}
                                        {format(new Date(new Date(item.updateDate).setHours(new Date(item.updateDate).getHours() + 4)), 'HH:mm')}
                                        </span>
                                    )}
                                </div>
                                <span className="break-words text-xs sm:text-base text-gray-500">
                                    {item.evaluationStatus.description}
                                </span>
                                <div className="items-center justify-between mt-2 sm:mt-4 space-y-4 sm:space-y-0">
                                    <div className='flex flex-col sm:flex-row gap-2'>
                                        <div className="flex-1">
                                            <StyledLinkButton url={item.projectURL}>
                                                Ver {evaluationTypeIDAsNumber === 1 ? 'Anteproyecto' : 'Tesis'}
                                            </StyledLinkButton>
                                        </div>
                                        <div className="flex-1">
                                            <StyledButton onClick={() => handleEdit(item)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                                Modificar
                                            </StyledButton>
                                        </div>
                                    </div>
                                </div>
                                {evaluationTypeIDAsNumber === 1 &&
                                    <div className='flex flex-col sm:flex-row sm:col-span-2 col-span-full gap-2 my-2'>
                                        <div className="flex-1">
                                            <ReviewCRUD evaluatorCategoryID={2} item={item} url={urls[2]} />
                                        </div>
                                        <div className="flex-1">
                                            <ReviewCRUD evaluatorCategoryID={3} item={item} url={urls[2]} />
                                        </div>
                                    </div>
                                }
                            </div>
                        ))
                    }
                </>}
        </div>
    );
};

export default EvaluateSection;
