import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

// Componentes
import FormContainerNotUpdate from '../../../../forms/body/formContainerNotUpdate';
import ModalCRUD from '../../../../modal/modalCRUD';
import UpdateBatchService from '../../../../../utils/crudHelpers/service/batchService/updateBatchService';
import SimpleTable from '../../../../table/simpleTable';
import TbodyContent from '../../../../table/tableComponent/bodyContent';
import { ItemCell } from '../../../../table/tableComponent/tableComponent';

// Estilos
import EditIcon from '../../../../icon/crud/editIcon';
import { theadContentTr, theadContentDiv, tbodyContentTr } from '../../../../../utils/style/crud/classes';

// Utilidades
import { MAX_LENGTH_ARRAY_DATA } from '../../../../../utils/crudHelpers/constants';
import { formatDateValue } from '../../../../../utils/crudHelpers/utils';

const options_evaluationTypeID_1 = [
    { label: `Nombre del Estudiante`, value: 'fullName' },
    { label: `Estado de la Revisión`, value: 'preproject_status' },
    { label: `Evaluación del Académico A`, value: 'academicA_status' },
    { label: `Evaluación del Académico B`, value: 'academicB_status' },
];

const options_evaluationTypeID_2 = [
    { label: `Nombre del Estudiante`, value: 'fullName' },
    { label: `Estado de la Revisión`, value: 'thesis_status' },
    { label: `Nota Final`, value: 'finalGrade' },
    { label: `Desarrollo de Tesis`, value: 'stage1_grade' },
    { label: `Informe Final`, value: 'stage2_grade' },
    { label: `Defensa Oral`, value: 'stage3_grade' },
    { label: `Nota del Académico A`, value: 'academicA_grade1' },
    { label: `Nota del Académico B`, value: 'academicB_grade1' },
    { label: `Nota del Director`, value: 'director_grade1' },
    { label: `Nota del Co-Director`, value: 'codirector_grade1' },
];

const ProcessEvaluationForm = memo(({ url, itemName, selectedItems, showAlert, modalOpen, closeModal, responseHandler }) => {
    const { evaluationTypeID } = useParams();
    const parsedEvaluationTypeID = parseInt(evaluationTypeID, 10);
    const options = parsedEvaluationTypeID === 1 ? options_evaluationTypeID_1 : options_evaluationTypeID_2;

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Mapea los elementos seleccionados para incluir solo las propiedades requeridas
        const filteredSelectedItems = selectedItems.map(item => ({
            evaluationID: item.evaluationID,
            studentID: item.userID,
            thesisGradesID: item.thesisGradesID || 0,
            studentHasSemesterID: item.studentHasSemesterID,
            semesterID: item.semesterID,
            specializationID: item.specializationID,
            grade1: item.academicA_grade1 || 1.0,
            grade2: item.academicB_grade1 || 1.0,
            grade3: item.director_grade1 || 1.0,
            grade4: item.codirector_grade1 || item.director_grade1 || 1.0,
            oralDefenseScore: item.stage3_grade || 1.0,
            evaluationStatus1ID: item.academicA_statusID || 2,
            evaluationStatus2ID: item.academicB_statusID || 2,
        }));

        const updateService = new UpdateBatchService(url, itemName, showAlert, responseHandler);
        await updateService.execute(
            { evaluationTypeID: parseInt(evaluationTypeID, 10) },
            filteredSelectedItems,
            'dataArray',
            MAX_LENGTH_ARRAY_DATA
        );
    };

    const theadContent = (
        <>
            {options.map((option) => (
                <th key={option.value} className={theadContentTr}>
                    <div className={theadContentDiv}>
                        {option.label}
                    </div>
                </th>
            ))}
        </>
    );

    const tbodyContent = (
        <TbodyContent itemsLength={selectedItems.length} isLoading={false} length={options.length}>
            {selectedItems.map((item) => (
                <tr key={item.evaluationID} className={tbodyContentTr}>
                    {options.map((option) => (
                        <ItemCell key={option.value} value={formatDateValue(item[option.value], option.value)} />
                    ))}
                </tr>
            ))}
        </TbodyContent>
    );

    return (
        <ModalCRUD isOpen={modalOpen}>
            <FormContainerNotUpdate
                message={'Finalizar Evaluación'}
                secondaryMessage={''}
                messageButton={'Finalizar Evaluación'}
                handleSubmit={handleSubmit}
                closeModal={closeModal}
                customPath={<EditIcon />}
                formHeight='h-96'
            >
                <SimpleTable theadContent={theadContent} tbodyContent={tbodyContent} />
            </FormContainerNotUpdate>
        </ModalCRUD>
    );
});

export default ProcessEvaluationForm;
