import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  setItems,
  setNewItem,
  clearNewItem,
  clearFilteredItems,
} from '../../../../redux/slice/handleSpecialization/administrative/evaluatorAssignmentSlice';

import { clearNewItem as clearNewRubric, setNewItem as setNewRubric } from '../../../../redux/slice/handleRubric/rubric/rubricSlice';
import { setNewItem as setNewStatus, clearNewItem as clearNewStatus } from '../../../../redux/slice/handleSpecialization/administrative/evaluationStatusSlice';
import { setNewItem as setNewScore, clearNewItem as clearNewScore } from '../../../../redux/slice/handleSpecialization/administrative/scoresAndEvaluatorSlice';

// Componentes personalizados
import HandleAlert from '../../../alert/handleAlert';

import FetchService from '../../../../utils/crudHelpers/service/baseService/fetchService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../modal/useModal';

import ScreenWrapper from '../../../shared/screenWrapper';
import ItemListHeaderStage from '../../../forms/header/itemListHeaderStage';
import EvaluatorAssignmentForm from './form/evaluatorAssignmentForm';
import RubricForm from '../../../crud/handleRubric/rubric/form/rubricForm2';
import EvaluationStatusForm from './form/evaluationStatusForm';
import EvaluationScoreForm from './form/evaluationScoreForm';
import ProcessEvaluationForm from './form/processEvaluationForm';
import EvaluatorAssignmentTable from './table/evaluatorAssignmentTable';

// Utilidades
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';
import { clearCheckbox } from '../../../../utils/crudHelpers/handleCheckbox';

const EvaluatorAssignmentCRUD = ({ name, urls, title, subtitle }) => {
  // Estado local del componente
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();
  const { evaluationTypeID } = useParams();

  const dispatch = useDispatch();
  const [academics, setAcademics] = useState([]);
  const [administrative, setAdministrative] = useState([]);
  const [semester, setSemester] = useState([]);
  const [template, setTemplate] = useState([]);
  const [evaluationStatus, setEvaluationStatus] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);

  // -------------------------------Funciones Para CRUD-------------------------------
  // Función para obtener datos
  const [fetchHandler] = useState(() => async () => {
    await handleFetch();
  });

  const handleFetch = async () => {
    const parsedEvaluationTypeID = parseInt(evaluationTypeID, 10);
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    const fetchEvaluatorService = new FetchService(urls[1], 'evaluator', showAlert, responseHandlerEvaluator);
    const fetchSemesterService = new FetchService(urls[3], 'semester', showAlert, responseHandlerSemester);
    const fetchTemplateOverviewService = new FetchService(urls[5], 'templateOverview', showAlert, responseHandlerTemplateOverview);
    const fetchEvaluationStatusService = new FetchService(urls[6], 'evaluationStatus', showAlert, responseHandlerEvaluationStatus);

    await fetchService.execute({ evaluationTypeID: parsedEvaluationTypeID });
    await fetchSemesterService.execute({});
    await fetchEvaluatorService.execute({});
    await fetchTemplateOverviewService.execute({});
    await fetchEvaluationStatusService.execute({});

    // Si es Tesis realizo una petición para buscar a los administrativos(Académico, Administrador, Director)
    if (parsedEvaluationTypeID === 2) {
      const fetchAdministrativeService = new FetchService(urls[2], 'administrative', showAlert, responseHandlerAdministrative);
      await fetchAdministrativeService.execute({});
    }
  }

  // Función para manejar la verificación
  const handleVerification = async (message) => {
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    await fetchService.execute({ evaluationTypeID: parseInt(evaluationTypeID, 10) });
    showAlert({
      type: 'verification',
      content: message,
    });
    closeModal();
  };

  // Función para manejar la renovación
  const handleRenewal = async (message) => {
    showAlert({
      type: 'verification',
      content: message,
    });
    await handleFetch();
  };

  // Función para manejar los datos obtenidos
  const handleData = (data) => {

    const sortedItems = sortItems(data, 'evaluationID', 'desc');
    dispatch(setItems(sortedItems));
    dispatch(clearFilteredItems());
    clearCheckbox(setSelectedItems, setSelectAll);
  };

  const handleSemester = (data) => {
    const sortedItems = sortItems(data, 'finishDate', 'desc');
    setSemester(sortedItems);
  };

  const handleEvaluator = (data) => {
    const sortedItems = sortItems(data, 'rut', 'asc');
    const format = sortedItems.map(item => ({
      value: item.userID,
      label: `${item.rut} - ${item.firstName} ${item.secondName} ${item.surname1} ${item.surname2}`,
    }));
    setAcademics(format);
  };

  const handleAdministrative = (data) => {
    const sortedItems = sortItems(data, 'rut', 'asc');
    const format = sortedItems.map(item => ({
      value: item.userID,
      label: `${item.rut} - ${item.firstName} ${item.secondName} ${item.surname1} ${item.surname2}`,
    }));
    setAdministrative(format);
  };

  const handleTemplateOverview = (data) => {
    const format = data.map(item => ({
      value: item.templateID,
      label: `${item.name} - ${item.description}`
    }));
    setTemplate(format);
  };

  const handleEvaluationStatus = (data) => {
    const sortedItems = sortItems(data, 'evaluationStatusID', 'asc');
    const format = sortedItems.map(item => ({
      value: item.evaluationStatusID,
      label: `${item.name}`,
    }));
    setEvaluationStatus(format);
  };

  // Función de fábrica para crear manejados de respuesta específicos para cada tipo de dato
  const createResponseHandler = (onData) => (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onVerification: handleVerification,
      onRenewal: handleRenewal,
      onData,
    });
  };

  // Creación de manejados de respuesta específicos utilizando la función de fábrica
  const responseHandler = createResponseHandler(handleData); // Para datos de las evaluaciones
  const responseHandlerEvaluator = createResponseHandler(handleEvaluator); // Para datos de los evaluadores A y B
  const responseHandlerAdministrative = createResponseHandler(handleAdministrative); // Para datos de el director, codirector y director de Programa
  const responseHandlerTemplateOverview = createResponseHandler(handleTemplateOverview); // Para datos de visión general de la plantilla
  const responseHandlerSemester = createResponseHandler(handleSemester); // Para datos de los Semestres
  const responseHandlerEvaluationStatus = createResponseHandler(handleEvaluationStatus) // Par datos de estado de evaluación

  // Función para manejar la edición de un elemento
  const handleEdit = (item, stage) => {
    let evaluator1UserID = 0;
    let evaluator2UserID = 0;
    let evaluator1ID = 0;
    let evaluator2ID = 0;
    let isUpdate = null;

    if (stage === 1) {
      isUpdate = item.academicA_userID != null ? item.academicA_userID : null;

      evaluator1UserID = item.academicA_userID;
      evaluator2UserID = item.academicB_userID;
      if (parseInt(evaluationTypeID, 10) === 1) {
        evaluator1ID = item.academicA_preprojectEvaluatorID;
        evaluator2ID = item.academicB_preprojectEvaluatorID;
      } else {
        evaluator1ID = item.academicA_thesisEvaluatorID;
        evaluator2ID = item.academicB_thesisEvaluatorID;
      }
    } else if (stage === 2) {
      isUpdate = item.director_userID != null ? item.director_userID : null;

      evaluator1UserID = item.director_userID;
      evaluator1ID = item.director_thesisEvaluatorID;
    } else if (stage === 3) {
      isUpdate = item.codirector_userID != null ? item.codirector_userID : null;

      evaluator1UserID = item.codirector_userID;
      evaluator1ID = item.codirector_thesisEvaluatorID;
    } else if (stage === 4) {
      isUpdate = item.programDirector_userID != null ? item.codirector_userID : null;

      evaluator1UserID = item.programDirector_userID;
      evaluator1ID = item.programDirector_thesisEvaluatorID;
    }

    dispatch(setNewItem({
      isUpdate: isUpdate,
      evaluationTypeID: parseInt(evaluationTypeID, 10),
      studentHasSemesterID: item.studentHasSemesterID,
      evaluationID: item.evaluationID,
      stage: stage,
      evaluator1_userID: evaluator1UserID,
      evaluator2_userID: evaluator2UserID,
      evaluator1ID: evaluator1ID,
      evaluator2ID: evaluator2ID,
    }));
    openModal();
  };

  // Función para manejar la edición de un elemento
  const handleRubricEdit = (item) => {

    let evaluationStatus_A;
    let evaluationStatus_B;

    // Verificar el tipo de evaluación
    if (parseInt(evaluationTypeID, 10) === 1) {
      // Si el tipo de evaluación es 1, verificar si alguno de los evaluadores de anteproyecto es null
      if (item.academicA_preprojectEvaluatorID === null || item.academicB_preprojectEvaluatorID === null) {
        showAlert({
          type: 'error',
          content: 'No se han asignado todos los evaluadores necesarios.',
        });
        return; // Detener la ejecución sin abrir el modal
      }

    } else if (parseInt(evaluationTypeID, 10) === 2) {
      // Si el tipo de evaluación es 2, verificar si alguno de los evaluadores de tesis es null
      if (item.academicA_thesisEvaluatorID === null || item.academicB_thesisEvaluatorID === null ||
        item.director_thesisEvaluatorID === null) {
        showAlert({
          type: 'error',
          content: 'No se han asignado todos los evaluadores necesarios.',
        });
        return; // Detener la ejecución sin abrir el modal
      }
    }

    // Si se superan las verificaciones, continuar con la edición
    dispatch(setNewRubric({
      evaluationStatus_A,
      evaluationStatus_B,
      preproject_status: item.preproject_status,
      evaluationTypeID: parseInt(evaluationTypeID, 10),
      rubricID: item.rubricID != null ? item.rubric_rubricID : null,
      evaluationID: item.evaluationID,
      name: item.rubric_name || "",
      description: item.rubric_description || "",
      templateID: item.rubric_templateID,
      previousTemplateID: item.rubric_templateID,
      evaluator1ID: parseInt(evaluationTypeID, 10) === 1 ? item.academicA_preprojectEvaluatorID : item.academicA_thesisEvaluatorID,
      evaluator2ID: parseInt(evaluationTypeID, 10) === 1 ? item.academicB_preprojectEvaluatorID : item.academicB_thesisEvaluatorID,
      evaluator3ID: item.director_thesisEvaluatorID,
      evaluator4ID: item.codirector_thesisEvaluatorID || null,
    }));

    openRubricModal();
  };

  // Función para manejar la edición de un elemento
  const handleStatusEdit = (item) => {
    dispatch(setNewStatus({
      studentHasSemesterID: item.studentHasSemesterID,
      evaluationStatusID: parseInt(evaluationTypeID, 10) === 1 ? item.preproject_status : item.thesis_status,
      evaluationTypeID: parseInt(evaluationTypeID, 10),
      semesterID: item.semesterID,
      specializationID: item.specializationID,
      studentID: item.userID,
      evaluationID: item.evaluationID,
    }));
    openStatusModal();
  };

  // Función para manejar la edición de un elemento
  const handleSCoreEdit = (item) => {
    // Si el tipo de evaluación es 2, verificar si alguno de los evaluadores de tesis es null
    if (item.academicA_thesisEvaluatorID === null || item.academicB_thesisEvaluatorID === null ||
      item.director_thesisEvaluatorID === null) {
      showAlert({
        type: 'error',
        content: 'No se han asignado todos los evaluadores necesarios.',
      });
      return; // Detener la ejecución sin abrir el modal
    }

    dispatch(setNewScore({
      thesisGradesID: item.thesisGradesID,
      evaluator1ID: item.academicA_thesisEvaluatorID,
      evaluator2ID: item.academicB_thesisEvaluatorID,
      evaluator3ID: item.director_thesisEvaluatorID,
      evaluator4ID: item.codirector_thesisEvaluatorID || null,
      evaluator5ID: item.programDirector_thesisEvaluatorID,
      grade1: parseFloat(item.academicA_grade2 || 1.0).toFixed(1),
      grade2: parseFloat(item.academicB_grade2 || 1.0).toFixed(1),
      grade3: parseFloat(item.director_grade2 || 1.0).toFixed(1),
      grade4: item.codirector_thesisEvaluatorID !== null ? parseFloat(item.codirector_grade2 || 1.0).toFixed(1): null,
      grade5: parseFloat(item.programDirector_grade2 || 1.0).toFixed(1),
    }));
    openScoreModal();
  };

  // -------------------------------Funciones para los Modal-------------------------------
  function useCustomModal(initialState, clearAction) {
    const dispatch = useDispatch();

    const modalConfig = useModal(initialState, {
      onClose: () => {
        dispatch(clearAction());
      },
    });

    return modalConfig;
  }

  const { modalOpen, openModal, closeModal } = useCustomModal(false, clearNewItem);
  const { modalOpen: modalRubricOpen, openModal: openRubricModal, closeModal: closeRubricModal } = useCustomModal(false, clearNewRubric);
  const { modalOpen: modalStatusOpen, openModal: openStatusModal, closeModal: closeStatusModal } = useCustomModal(false, clearNewStatus);
  const { modalOpen: modalScoreOpen, openModal: openScoreModal, closeModal: closeScoreModal } = useCustomModal(false, clearNewScore);

  const { modalOpen: modalProcessOpen, openModal: openProcessModal, closeModal: closeProcessModal } = useModal(
    false,
    {});

  // -------------------------------Funciones de Extra-------------------------------
  // Ref para verificar si el componente está montado
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // Hook de efecto para manejar la carga inicial de datos
  useEffect(() => {
    // Iniciar carga de datos
    if (evaluationTypeID) {
      setIsLoading(true);
      if (!isMounted.current) {
        const fetchData = async () => {
          isMounted.current = true;
          await fetchHandler();
          setIsLoading(false);
        };
        fetchData();
      }
    }
  }, [fetchHandler, evaluationTypeID]);

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}

      {/* Modal para CRUD de Evaluadores y Rubrica*/}
      <EvaluatorAssignmentForm academics={academics} administrative={administrative} url={urls[0]} itemName={name} showAlert={showAlert} modalOpen={modalOpen} closeModal={closeModal} responseHandler={responseHandler} />
      <RubricForm template={template} url={urls[4]} itemName={'Rubrica'} showAlert={showAlert} modalOpen={modalRubricOpen} closeModal={closeRubricModal} responseHandler={responseHandler} />
      <EvaluationStatusForm evaluationStatus={evaluationStatus} url={urls[6]} itemName={'Estado'} showAlert={showAlert} modalOpen={modalStatusOpen} closeModal={closeStatusModal} responseHandler={responseHandler} />
      <EvaluationScoreForm url={urls[7]} itemName={'Notas'} showAlert={showAlert} modalOpen={modalScoreOpen} closeModal={closeScoreModal} responseHandler={responseHandler} />
      <ProcessEvaluationForm url={urls[8]} itemName={'Notas'} selectedItems={selectedItems} showAlert={showAlert} modalOpen={modalProcessOpen} closeModal={closeProcessModal} responseHandler={responseHandler} />

      {/* Contenedor principal con altura mínima de pantalla */}
      <ScreenWrapper>
        {/* Encabezado de la lista de Evaluadores */}
        <ItemListHeaderStage title={title} subtitle={subtitle} message={'Finalizar Evaluación'} openModal={openProcessModal} />

        {/* Tabla de Evaluadores */}
        <EvaluatorAssignmentTable
          semester={semester}
          urls={urls}
          isLoading={isLoading}
          currentTab={currentTab}
          currentPage={currentPage}
          selectedItems={selectedItems}
          selectAll={selectAll}
          setCurrentPage={setCurrentPage}
          setSelectedItems={setSelectedItems}
          setSelectAll={setSelectAll}
          setCurrentTab={setCurrentTab}
          handleEdit={handleEdit}
          handleRubricEdit={handleRubricEdit}
          handleStatusEdit={handleStatusEdit}
          handleSCoreEdit={handleSCoreEdit}
        />
      </ScreenWrapper>
    </>
  );
};

export default EvaluatorAssignmentCRUD;
