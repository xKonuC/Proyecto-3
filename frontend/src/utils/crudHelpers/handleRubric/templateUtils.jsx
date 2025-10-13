import { sortItems } from "../searchFilter";

export function formatTemplateOverviewResponse(templateData) {
    const formattedTemplates = [];
    const templateMap = new Map();

    templateData.forEach(row => {
        const templateID = row.templateID;
        if (!templateMap.has(templateID)) {
            templateMap.set(templateID, {
                templateID: templateID,
                name: row.template_name,
                description: row.template_description,
                sections: []
            });
        }

        const template = templateMap.get(templateID);
        let section = template.sections.find(sec => sec.sectionID === row.sectionID);
        if (!section) {
            section = {
                templateHasSectionID: row.templateHasSectionID,
                sectionID: row.sectionID,
                name: row.section_name,
                positionNumber: row.section_position,
                questions: []
            };
            template.sections.push(section);
        }

        section.questions.push({
            templateHasQuestionID: row.templateHasQuestionID,
            questionID: row.questionID,
            userID: row.question_creator_userID,
            question: row.question,
            isActive: row.question_isActive,
            positionNumber: row.question_position,
        });
    });

    // Ordena las secciones y preguntas dentro de cada template
    templateMap.forEach((template) => {
        template.sections = sortItems(template.sections, 'positionNumber');
        template.sections.forEach(section => {
            section.questions = sortItems(section.questions, 'positionNumber');
        });
    });

    formattedTemplates.push(...templateMap.values());

    return formattedTemplates;
}

export const handleCheckboxChange = (template, dispatch, setItems, sectionID, questionID, value) => {
    // Encuentra el índice de la sección y la pregunta en el estado template
    const sectionIndex = template.sections.findIndex(section => section.sectionID === sectionID);
    if (sectionIndex !== -1) {
        const questionIndex = template.sections[sectionIndex].questions.findIndex(question => question.questionID === questionID);
        if (questionIndex !== -1) {
            // Crear una copia profunda del estado template
            const updatedTemplate = JSON.parse(JSON.stringify(template));
            // Actualizar el valor de la pregunta en la copia
            updatedTemplate.sections[sectionIndex].questions[questionIndex].answer = value;
            // Actualizar el estado global con la acción setItems
            dispatch(setItems(updatedTemplate));
        }
    }
};

export const moveSection = (direction, sectionID, template, dispatch, setItems) => {
    const sectionIndex = template.sections.findIndex(section => section.sectionID === sectionID);
    if (sectionIndex !== -1) {
        const updatedSections = JSON.parse(JSON.stringify(template.sections)); // Copia profunda del array de secciones
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
            // Crear un nuevo objeto de template con las secciones actualizadas
            const updatedTemplate = {
                ...template,
                sections: updatedSections
            };
            // Actualizar el estado global con la acción setItems
            dispatch(setItems(updatedTemplate));
        }
    }
};

export const moveQuestion = (direction, sectionID, questionID, template, dispatch, setItems) => {
    const sectionIndex = template.sections.findIndex(section => section.sectionID === sectionID);

    if (sectionIndex !== -1) {
        const questionIndex = template.sections[sectionIndex].questions.findIndex(question => question.questionID === questionID);
        if (questionIndex !== -1) {
            const updatedSections = JSON.parse(JSON.stringify(template.sections)); // Copia profunda del array de secciones
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
                // Crear un nuevo objeto de template con las secciones actualizadas
                const updatedTemplate = {
                    ...template,
                    sections: updatedSections
                };
                // Actualizar el estado global con la acción setItems
                dispatch(setItems(updatedTemplate));
            }
        }
    }
};

export const handleDeleteSection = (sectionID, template, dispatch, setItems) => {
    const updatedSections = template.sections.filter(section => section.sectionID !== sectionID);
    const updatedTemplate = {
        ...template,
        sections: updatedSections.map((section, index) => ({
            ...section,
            positionNumber: index + 1
        }))
    };
    dispatch(setItems(updatedTemplate));
};

export const handleDeleteQuestion = (sectionID, questionID, template, dispatch, setItems) => {
    const updatedSections = template.sections.map(section => {
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
    const updatedTemplate = {
        ...template,
        sections: updatedSections,
    };
    dispatch(setItems(updatedTemplate));
};

export const handleAddSection = (selectedSection, template, dispatch, setItems, setSelectedSection) => {
    if (selectedSection) {
        // Verificar si el sectionID ya existe en la rúbrica
        const isSectionIDExists = template.sections.some(section => section.sectionID === selectedSection.value);
        if (isSectionIDExists) {
            console.error('El sectionID ya existe en la rúbrica. Por favor, selecciona otro.');
            return; // Detener la ejecución si el sectionID ya existe
        }

        const lastSectionPositionNumber = template.sections.length > 0 ? template.sections[template.sections.length - 1].positionNumber : 0;
        const updatedTemplate = {
            ...template,
            sections: [
                ...template.sections,
                {
                    sectionID: selectedSection.value,
                    name: selectedSection.label,
                    templateHasSectionID: 0,
                    positionNumber: lastSectionPositionNumber + 1, // Actualiza el orden
                    questions: [] // Inicialmente no hay preguntas en la nueva sección
                }
            ]
        };
        dispatch(setItems(updatedTemplate));
        // Limpiar la selección después de agregar la sección
        setSelectedSection(null);
    }
};

export const handleAddQuestion = (selectedQuestion, sectionID, template, dispatch, setItems) => {
    if (selectedQuestion) {
        // Busca la sección correspondiente en el estado de template utilizando el sectionID proporcionado
        const sectionIndex = template.sections.findIndex(section => section.sectionID === sectionID);

        if (sectionIndex !== -1) {
            // Obtiene la sección correspondiente
            const section = template.sections[sectionIndex];

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
                    templateHasQuestionID: 0,
                    positionNumber: lastQuestionPositionNumber + 1, // Actualiza el orden
                };

                // Crea una copia de la sección actual con la nueva pregunta agregada
                const updatedSection = {
                    ...section,
                    questions: [...section.questions, newQuestion]
                };

                // Crea una copia del estado de template con la sección actualizada
                const updatedTemplate = {
                    ...template,
                    sections: [
                        ...template.sections.slice(0, sectionIndex), // Copia las secciones antes de la sección actual
                        updatedSection, // Agrega la sección actualizada
                        ...template.sections.slice(sectionIndex + 1) // Copia las secciones después de la sección actual
                    ]
                };
                // Actualiza el estado global con la acción setItems
                dispatch(setItems(updatedTemplate));
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

export const compareTemplateWithTemplateData = (template, templateData) => {
    // Filtrar sections con templateHasSectionID igual a 0 y distinto de 0
    const newSectionsFiltered = template.sections.filter(section => section.templateHasSectionID === 0);
    const existingSectionsFiltered = template.sections.filter(section => section.templateHasSectionID !== 0);
    // Encontrar templateHasSectionID faltantes en templateData
    let missingTemplateHasSectionIDs = [];
    if (template.sections.length === 0) {
        missingTemplateHasSectionIDs = templateData.sections.map(section => section.templateHasSectionID);
    } else {
        // Si hay secciones en la rúbrica actual, verifica cada sección individualmente
        templateData.sections.forEach(section => {
            const sectionExistsInTemplateData = existingSectionsFiltered.some(dataSection => dataSection.templateHasSectionID === section.templateHasSectionID);
            if (!sectionExistsInTemplateData) {
                // Si la templateHasSectionID de la sección no está presente en existingSectionsFiltered, añádela a missingTemplateHasSectionIDs
                missingTemplateHasSectionIDs.push(section.templateHasSectionID);
            }
        });
    }

    // Eliminar las secciones faltantes de template
    const updatedSections = existingSectionsFiltered.filter(section => !missingTemplateHasSectionIDs.includes(section.templateHasSectionID));
    const updatedSectionsData = templateData.sections.filter(section => !missingTemplateHasSectionIDs.includes(section.templateHasSectionID));

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

    // Filtrar las preguntas con templateHasQuestionID === 0 y distintos de 0 en updatedSections
    // Lista para preguntas sin identificación válida
    const questionsWithIDZero = [];

    // Lista para preguntas con identificación válida
    const questionsWithIDNonZero = [];

    updatedSections.forEach(section => {
        section.questions.forEach(question => {
            if (question.templateHasQuestionID === 0) {
                questionsWithIDZero.push({ ...question, templateHasSectionID: section.templateHasSectionID });
            } else {
                questionsWithIDNonZero.push({ ...question, templateHasSectionID: section.templateHasSectionID });
            }
        });
    });

    // Array para almacenar los templateHasQuestionID que faltan
    const missingTemplateHasQuestionIDs = [];
    // Array para almacenar las preguntas que existen en updatedSectionsData
    const existingQuestions = [];

    // Comparar las preguntas de updatedSectionsData con questionsWithIDNonZero
    updatedSectionsData.forEach(dataSection => {
        dataSection.questions.forEach(dataQuestion => {
            const matchingQuestion = questionsWithIDNonZero.find(question =>
                question.templateHasQuestionID === dataQuestion.templateHasQuestionID
            );
            if (!matchingQuestion) {
                missingTemplateHasQuestionIDs.push(dataQuestion.templateHasQuestionID);
            } else {
                // Agregar la pregunta existente a existingQuestions
                existingQuestions.push({ ...matchingQuestion });
            }
        });
    });

    // Array para almacenar las preguntas que necesitan ser actualizadas
    const updatedQuestions = [];

    // Comparar las preguntas existentes con updatedSectionsData y guardar las distintas
    // Función para comparar dos preguntas, ignorando el templateHasSectionID
    const areQuestionsEqual = (question1, question2) => {
        // Clonar las preguntas para evitar modificar las originales
        const clonedQuestion1 = { ...question1 };
        const clonedQuestion2 = { ...question2 };

        // Eliminar el atributo templateHasSectionID de las copias
        delete clonedQuestion1.templateHasSectionID;
        delete clonedQuestion2.templateHasSectionID;

        // Comparar las preguntas clonadas sin el templateHasSectionID
        return JSON.stringify(clonedQuestion1) === JSON.stringify(clonedQuestion2);
    };


    // Comparar las preguntas existentes con updatedSectionsData y guardar las distintas
    existingQuestions.forEach(question => {
        const sectionWithData = updatedSectionsData.find(dataSection =>
            dataSection.questions.some(dataQuestion => dataQuestion.templateHasQuestionID === question.templateHasQuestionID)
        );
        if (sectionWithData) {
            const dataQuestion = sectionWithData.questions.find(dataQuestion => areQuestionsEqual(dataQuestion, question));
            // Comparar las preguntas
            if (!dataQuestion) {
                updatedQuestions.push(question);
            }
        }
    });

    return { newSectionsFiltered, missingTemplateHasSectionIDs, changedSections, questionsWithIDZero, missingTemplateHasQuestionIDs, updatedQuestions }

};