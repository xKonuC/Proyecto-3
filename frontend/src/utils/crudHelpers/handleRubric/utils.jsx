import { sortItems } from "../searchFilter";

// Función para obtener la escala de respuestas dependiendo del evaluationTypeID
export const getAnswerScale = (type) => {
    switch (type) {
        case 1: // Anteproyecto
            return ['Excelente', 'Bien', 'Aceptable', 'Insuficiente'];
        case 2: // Tesis
            return ['Muy Deficiente', 'Deficiente', 'Insuficiente', 'Aceptable', 'Buena', 'Muy Buena', 'Excelente'];
        default:
            return [];
    }
};

export const calculateScore = (sections) => {
    let score = 0;
    let totalScore = 0;
    if (sections) {
        sections.forEach((section) => {
            if (section.questions) {
                section.questions.forEach((question) => {
                    totalScore += 7;
                    // Asignar valores numéricos a cada respuesta en la escala
                    switch (question.answer) {
                        case 'Muy Deficiente':
                            score += 1;
                            break;
                        case 'Deficiente':
                            score += 2;
                            break;
                        case 'Insuficiente':
                            score += 3;
                            break;
                        case 'Aceptable':
                            score += 4;
                            break;
                        case 'Buena':
                            score += 5;
                            break;
                        case 'Muy Buena':
                            score += 6;
                            break;
                        case 'Excelente':
                            score += 7;
                            break;
                        default:
                            break;
                    }
                });
            }
        });
    }
    return { score, totalScore };
};

export const calculateFinalGrade = (score, totalScore) => {
    // Calcular la nota proporcional al puntaje máximo de 7.0
    const grade = (score / totalScore) * 7.0;
    const finalGrade = grade < 1.0 ? 1.0 : grade;
    // Redondear el resultado a una décima
    return parseFloat(finalGrade.toFixed(1));
};


export function convertToRubricObject(responseData) {
    // Objeto para almacenar la estructura de la rúbrica.
    const rubric = {
        rubricID: responseData[0].rubricID,
        rubric_name: responseData[0].rubricName,
        rubric_description: responseData[0].rubricDescription,
        comment: responseData[0].comment,
        evaluationStatusID: responseData[0].evaluationStatusID,
        name: responseData[0].name,
        grade1: responseData[0].grade1,
        evaluatorID: responseData[0].evaluatorID,
        sections: {}
    };

    // Iterar sobre los datos y organizarlos en el objeto de la rúbrica.
    responseData.forEach(data => {
        const sectionID = data.sectionID;
        if (!rubric.sections[sectionID]) {
            // Si la sección aún no existe en el objeto de la rúbrica, crearla.
            rubric.sections[sectionID] = {
                sectionID: sectionID,
                rubricHasSectionID: data.rubricHasSectionID,
                name: data.sectionName,
                positionNumber: data.sectionPosition,
                questions: []
            };
        }

        // Agregar la pregunta a la sección correspondiente.
        rubric.sections[sectionID].questions.push({
            questionID: data.questionID,
            rubricHasQuestionID: data.rubricHasQuestionID,
            question: data.question,
            positionNumber: data.questionPosition,
            answerID: data.answerID,
            evaluatorID: data.evaluatorID,
            answer: data.answer
        });
    });

    // Convertir el objeto en un array de secciones para facilitar el manejo.
    rubric.sections = Object.values(rubric.sections);

    // Ordena las secciones filtradas por positionNumber
    const sortedSections = sortItems(rubric.sections, 'positionNumber');

    // Formatea las preguntas de las secciones ordenadas
    const formattedSections = sortedSections.map(section => {
      const sortedQuestions = sortItems(section.questions, 'positionNumber');
      return {
        ...section,
        questions: sortedQuestions
      };
    });

    const sortedData = {
      ...rubric,
      sections: formattedSections
    };

    return sortedData;
}

export const handleCheckboxChange = (rubric, dispatch, setItems, sectionID, questionID, value) => {
    // Encuentra el índice de la sección y la pregunta en el estado rubric
    const sectionIndex = rubric.sections.findIndex(section => section.sectionID === sectionID);
    if (sectionIndex !== -1) {
        const questionIndex = rubric.sections[sectionIndex].questions.findIndex(question => question.questionID === questionID);
        if (questionIndex !== -1) {
            // Crear una copia profunda del estado rubric
            const updatedRubric = JSON.parse(JSON.stringify(rubric));
            // Actualizar el valor de la pregunta en la copia
            updatedRubric.sections[sectionIndex].questions[questionIndex].answer = value;
            // Actualizar el estado global con la acción setItems
            dispatch(setItems(updatedRubric));
        }
    }
};

export const handleSearchTemplateAction = (selectedTemplate, rubric, dispatch, setItems, templateData) => {
    if (selectedTemplate) {
        // Primero, verifica si el templateID actual de rubric es igual al seleccionado
        if (rubric.templateID === selectedTemplate.value) {
            console.log('El template seleccionado ya está aplicado a la rúbrica.');
            return; // Detiene la ejecución si ya se ha aplicado el template seleccionado
        }

        // Encuentra la información del template seleccionado
        const selectedTemplateInfo = templateData.find(template => template.templateID === selectedTemplate.value);

        // Filtra las secciones del template para eliminar aquellas que ya están presentes en la rubrica actual
        const filteredSectionsFromTemplate = selectedTemplateInfo.sections.filter(section =>
            section.name !== null && section.questions.length > 0 && !rubric.sections.some(existingSection => existingSection.sectionID === section.sectionID)
        );

        // Se obtiene el último section para poder ordenar las secciones nuevas (positionNumber)
        const lastSectionPositionNumber = rubric.sections.length > 0 ? rubric.sections[rubric.sections.length - 1].positionNumber : 0;

        // Añade rubricHasSectionID = 0 y rubricHasQuestionID = 0, y actualiza positionNumber para las secciones del template
        const updatedSections = filteredSectionsFromTemplate.map((section, index) => ({
            ...section,
            rubricHasSectionID: 0,
            positionNumber: lastSectionPositionNumber + index + 1, // Actualiza el orden
            questions: section.questions.map(question => ({
                ...question,
                rubricHasQuestionID: 0
            }))
        }));

        // Prepara el nuevo estado de rubric incluyendo el templateID y las secciones del template
        const updatedRubric = {
            ...rubric,
            template: { name: selectedTemplateInfo.name, description: selectedTemplateInfo.description },
            templateID: selectedTemplate.value, // Añade el templateID
            sections: [...rubric.sections, ...updatedSections] // Combina las secciones existentes con las secciones del template
        };

        // Actualiza el estado global o local de rubric aquí
        // Si usas Redux, despacha una acción con el updatedRubric
        // Si estás usando useState, simplemente actualiza el estado con setRubric(updatedRubric)
        dispatch(setItems(updatedRubric));
        console.log('Rubric actualizado con templateID y secciones:', updatedRubric);
    } else {
        console.error('Por favor selecciona un template antes de realizar la búsqueda.');
    }
};

export const moveSection = (direction, sectionID, rubric, dispatch, setItems) => {
    const sectionIndex = rubric.sections.findIndex(section => section.sectionID === sectionID);
    if (sectionIndex !== -1) {
        const updatedSections = JSON.parse(JSON.stringify(rubric.sections)); // Copia profunda del array de secciones
        if ((direction === 'up' && sectionIndex > 0) || (direction === 'down' && sectionIndex < updatedSections.length - 1)) {
            const sectionToMove = updatedSections.splice(sectionIndex, 1)[0];
            if (direction === 'up') {
                updatedSections.splice(sectionIndex - 1, 0, sectionToMove);
            } else if (direction === 'down') {
                updatedSections.splice(sectionIndex + 1, 0, sectionToMove);
            }
            // Actualizar positionNumber
            updatedSections.forEach((section, index) => {
                section.positionNumber = index + 1;
            });
            // Crear un nuevo objeto de rubric con las secciones actualizadas
            const updatedRubric = {
                ...rubric,
                templateID: null,
                template: {},
                sections: updatedSections
            };
            // Actualizar el estado global con la acción setItems
            dispatch(setItems(updatedRubric));
        }
    }
};

export const moveQuestion = (direction, sectionID, questionID, rubric, dispatch, setItems) => {
    const sectionIndex = rubric.sections.findIndex(section => section.sectionID === sectionID);

    if (sectionIndex !== -1) {
        const questionIndex = rubric.sections[sectionIndex].questions.findIndex(question => question.questionID === questionID);
        if (questionIndex !== -1) {
            const updatedSections = JSON.parse(JSON.stringify(rubric.sections)); // Copia profunda del array de secciones
            const updatedQuestions = JSON.parse(JSON.stringify(updatedSections[sectionIndex].questions)); // Copia profunda del array de preguntas
            if ((direction === 'up' && questionIndex > 0) || (direction === 'down' && questionIndex < updatedQuestions.length - 1)) {
                const questionToMove = updatedQuestions.splice(questionIndex, 1)[0];
                if (direction === 'up' && questionIndex > 0) {
                    updatedQuestions.splice(questionIndex - 1, 0, questionToMove);
                } else if (direction === 'down' && questionIndex < updatedQuestions.length) {
                    updatedQuestions.splice(questionIndex + 1, 0, questionToMove);
                }
                // Actualizar positionNumber
                updatedQuestions.forEach((question, index) => {
                    question.positionNumber = index + 1;
                });
                // Actualizar el array de preguntas en la sección correspondiente
                updatedSections[sectionIndex].questions = updatedQuestions;
                // Crear un nuevo objeto de rubric con las secciones actualizadas
                const updatedRubric = {
                    ...rubric,
                    templateID: null,
                    template: {},
                    sections: updatedSections
                };
                // Actualizar el estado global con la acción setItems
                dispatch(setItems(updatedRubric));
            }
        }
    }
};

export const handleDeleteSection = (sectionID, rubric, dispatch, setItems) => {
    const updatedSections = rubric.sections.filter(section => section.sectionID !== sectionID);
    const updatedRubric = {
        ...rubric,
        templateID: null,
        template: {},
        sections: updatedSections.map((section, index) => ({
            ...section,
            positionNumber: index + 1
        }))
    };
    dispatch(setItems(updatedRubric));
};

export const handleDeleteQuestion = (sectionID, questionID, rubric, dispatch, setItems) => {
    const updatedSections = rubric.sections.map(section => {
        if (section.sectionID === sectionID) {
            const updatedQuestions = section.questions.filter(question => question.questionID !== questionID);
            return {
                ...section,
                questions: updatedQuestions.map((question, index) => ({
                    ...question,
                    positionNumber: index + 1
                }))
            };
        }
        return section;
    });
    const updatedRubric = {
        ...rubric,
        sections: updatedSections,
        templateID: null,
        template: {},
    };
    dispatch(setItems(updatedRubric));
};

export const handleAddSection = (selectedSection, rubric, dispatch, setItems, setSelectedSection) => {
    if (selectedSection) {
        // Verificar si el sectionID ya existe en la rúbrica
        const isSectionIDExists = rubric.sections.some(section => section.sectionID === selectedSection.value);
        if (isSectionIDExists) {
            console.error('El sectionID ya existe en la rúbrica. Por favor, selecciona otro.');
            return; // Detener la ejecución si el sectionID ya existe
        }

        const lastSectionPositionNumber = rubric.sections.length > 0 ? rubric.sections[rubric.sections.length - 1].positionNumber : 0;
        const updatedRubric = {
            ...rubric,
            templateID: null,
            template: {},
            sections: [
                ...rubric.sections,
                {
                    sectionID: selectedSection.value,
                    name: selectedSection.label,
                    rubricHasSectionID: 0,
                    positionNumber: lastSectionPositionNumber + 1, // Actualiza el orden
                    questions: [] // Inicialmente no hay preguntas en la nueva sección
                }
            ]
        };
        dispatch(setItems(updatedRubric));
        // Limpiar la selección después de agregar la sección
        setSelectedSection(null);
    }
};

export const handleAddQuestion = (selectedQuestion, sectionID, rubric, dispatch, setItems, setSelectedQuestion) => {
    if (selectedQuestion) {
        // Busca la sección correspondiente en el estado de rubric utilizando el sectionID proporcionado
        const sectionIndex = rubric.sections.findIndex(section => section.sectionID === sectionID);

        if (sectionIndex !== -1) {
            // Obtiene la sección correspondiente
            const section = rubric.sections[sectionIndex];

            // Verifica si ya existe una pregunta con el mismo questionID en la sección actual
            const existingQuestionIndex = section.questions.findIndex(question => question.questionID === selectedQuestion.value);

            if (existingQuestionIndex === -1) {
                // Si no existe una pregunta con el mismo questionID, procede a agregar la nueva pregunta
                const lastQuestionPositionNumber = section.questions.length > 0 ? section.questions[section.questions.length - 1].positionNumber : 0;

                // Crea la nueva pregunta con los datos proporcionados
                const newQuestion = {
                    questionID: selectedQuestion.value,
                    question: selectedQuestion.label,
                    isActive: 1,
                    rubricHasQuestionID: 0,
                    positionNumber: lastQuestionPositionNumber + 1, // Actualiza el orden
                };

                // Crea una copia de la sección actual con la nueva pregunta agregada
                const updatedSection = {
                    ...section,
                    questions: [...section.questions, newQuestion]
                };

                // Crea una copia del estado de rubric con la sección actualizada
                const updatedRubric = {
                    ...rubric,
                    templateID: null,
                    template: {},
                    sections: [
                        ...rubric.sections.slice(0, sectionIndex), // Copia las secciones antes de la sección actual
                        updatedSection, // Agrega la sección actualizada
                        ...rubric.sections.slice(sectionIndex + 1) // Copia las secciones después de la sección actual
                    ]
                };
                // Actualiza el estado global con la acción setItems
                dispatch(setItems(updatedRubric));

                // Limpiar las selecciones después de agregar la pregunta
                setSelectedQuestion(null);
            } else {
                // Si ya existe una pregunta con el mismo questionID, muestra un mensaje de error o maneja el caso según sea necesario
                console.error('Ya existe una pregunta con el mismo questionID en esta sección.');
            }
        } else {
            // Si no se encuentra la sección correspondiente, muestra un mensaje de error o maneja el caso según sea necesario
            console.error('No se pudo encontrar la sección correspondiente.');
        }
    }
};

export const compareRubricWithRubricData = (rubric, rubricData) => {
    // Comparar templateID
    let templateID = 0;
    if (rubric.templateID !== rubricData.templateID) {
        templateID = rubric.templateID;
        console.log('El templateID de rubric es diferente:', rubric.templateID);
    }

    // Filtrar sections con rubricHasSectionID igual a 0 y distinto de 0
    const newSectionsFiltered = rubric.sections.filter(section => section.rubricHasSectionID === 0);
    const existingSectionsFiltered = rubric.sections.filter(section => section.rubricHasSectionID !== 0);
    // Encontrar rubricHasSectionID faltantes en rubricData
    let missingRubricHasSectionIDs = [];
    if (rubric.sections.length === 0) {
        missingRubricHasSectionIDs = rubricData.sections.map(section => section.rubricHasSectionID);
    } else {
        // Si hay secciones en la rúbrica actual, verifica cada sección individualmente
        rubricData.sections.forEach(section => {
            const sectionExistsInRubricData = existingSectionsFiltered.some(dataSection => dataSection.rubricHasSectionID === section.rubricHasSectionID);
            if (!sectionExistsInRubricData) {
                // Si la rubricHasSectionID de la sección no está presente en existingSectionsFiltered, añádela a missingRubricHasSectionIDs
                missingRubricHasSectionIDs.push(section.rubricHasSectionID);
            }
        });
    }

    // Eliminar las secciones faltantes de rubric
    const updatedSections = existingSectionsFiltered.filter(section => !missingRubricHasSectionIDs.includes(section.rubricHasSectionID));
    const updatedSectionsData = rubricData.sections.filter(section => !missingRubricHasSectionIDs.includes(section.rubricHasSectionID));

    // Array para almacenar los sections que han cambiado
    const changedSections = [];
    // Comparar toda la información excepto las preguntas de los sections actualizados
    updatedSections.forEach((section, index) => {
        const dataSection = updatedSectionsData[index];
        // Eliminar el array de questions para la comparación
        const sectionWithoutQuestions = { ...section };
        delete sectionWithoutQuestions.questions;
        const dataSectionWithoutQuestions = { ...dataSection };
        delete dataSectionWithoutQuestions.questions;

        // Comparar toda la información excepto las preguntas
        if (JSON.stringify(sectionWithoutQuestions) !== JSON.stringify(dataSectionWithoutQuestions)) {
            console.log('El section ha cambiado:', sectionWithoutQuestions);
            changedSections.push(sectionWithoutQuestions);
        }
    });

    // Filtrar las preguntas con rubricHasQuestionID === 0 y distintos de 0 en updatedSections
    // Lista para preguntas sin identificación válida
    const questionsWithIDZero = [];

    // Lista para preguntas con identificación válida
    const questionsWithIDNonZero = [];

    updatedSections.forEach(section => {
        section.questions.forEach(question => {
            if (question.rubricHasQuestionID === 0) {
                questionsWithIDZero.push({ ...question, rubricHasSectionID: section.rubricHasSectionID });
            } else {
                questionsWithIDNonZero.push({ ...question, rubricHasSectionID: section.rubricHasSectionID });
            }
        });
    });

    // Array para almacenar los rubricHasQuestionID que faltan
    const missingRubricHasQuestionIDs = [];
    // Array para almacenar las preguntas que existen en updatedSectionsData
    const existingQuestions = [];

    // Comparar las preguntas de updatedSectionsData con questionsWithIDNonZero
    updatedSectionsData.forEach(dataSection => {
        dataSection.questions.forEach(dataQuestion => {
            const matchingQuestion = questionsWithIDNonZero.find(question =>
                question.rubricHasQuestionID === dataQuestion.rubricHasQuestionID
            );
            if (!matchingQuestion) {
                missingRubricHasQuestionIDs.push(dataQuestion.rubricHasQuestionID);
            } else {
                // Agregar la pregunta existente a existingQuestions
                existingQuestions.push({ ...matchingQuestion });
            }
        });
    });

    // Array para almacenar las preguntas que necesitan ser actualizadas
    const updatedQuestions = [];

    // Comparar las preguntas existentes con updatedSectionsData y guardar las distintas
    // Función para comparar dos preguntas, ignorando el rubricHasSectionID
    const areQuestionsEqual = (question1, question2) => {
        // Clonar las preguntas para evitar modificar las originales
        const clonedQuestion1 = { ...question1 };
        const clonedQuestion2 = { ...question2 };

        // Eliminar el atributo rubricHasSectionID de las copias
        delete clonedQuestion1.rubricHasSectionID;
        delete clonedQuestion2.rubricHasSectionID;

        // Comparar las preguntas clonadas sin el rubricHasSectionID
        return JSON.stringify(clonedQuestion1) === JSON.stringify(clonedQuestion2);
    };


    // Comparar las preguntas existentes con updatedSectionsData y guardar las distintas
    existingQuestions.forEach(question => {
        const sectionWithData = updatedSectionsData.find(dataSection =>
            dataSection.questions.some(dataQuestion => dataQuestion.rubricHasQuestionID === question.rubricHasQuestionID)
        );
        if (sectionWithData) {
            const dataQuestion = sectionWithData.questions.find(dataQuestion => areQuestionsEqual(dataQuestion, question));
            // Comparar las preguntas
            if (!dataQuestion) {
                updatedQuestions.push(question);
            }
        }
    });

    return { templateID, newSectionsFiltered, missingRubricHasSectionIDs, changedSections, questionsWithIDZero, missingRubricHasQuestionIDs, updatedQuestions }

};