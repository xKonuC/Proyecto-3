import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { getAnswerScale } from '../../../../utils/crudHelpers/handleRubric/utils';
import imagen1 from '../../../../img/ab40044f-5bb4-4916-8e2b-a09619107ec3.jpg';

// Función para obtener la fecha actual en el formato deseado
const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
};

const SignatureBlock = ({ evaluatorName = '' }) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between', // Distribuir las columnas en los extremos
            alignItems: 'center',
            marginTop: 10,
        },
        cell: {
            padding: 10,
            alignItems: 'center', // Asegurar alineación central para todos los elementos internos
        },
        firstColumn: {
            justifyContent: 'space-between', // Distribuir espacios uniformemente
            width: '20%',
        },
        otherColumns: {
            justifyContent: 'space-between', // Distribuir espacios uniformemente
            width: '40%',
        },
        spacer: {
            height: 10, // Altura basada en el tamaño de fuente o según sea necesario
        },
        line: {
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            width: '100%',
            marginVertical: 5,
        },
        label: {
            fontSize: 12,
            fontWeight: 'medium',
        },
    });

    return (
        <View style={styles.container}>
            {/* Segunda columna */}
            <View style={[styles.cell, styles.otherColumns]}>
                <Text style={styles.label}>{evaluatorName}</Text>
                <View style={styles.line}></View>
                <Text style={styles.label}>Profesor(a) Evaluador(a)</Text>
            </View>

            {/* Tercera columna */}
            <View style={[styles.cell, styles.otherColumns]}>
                <View style={styles.spacer}></View> {/* Línea invisible para mantener el espacio */}
                <View style={styles.line}></View>
                <Text style={styles.label}>Firma</Text>
            </View>
        </View>
    );
};

const EvaluationTable = ({ status, comment }) => {
    const styles = StyleSheet.create({
        page: {
            padding: 30,
        },
        table: {
            display: 'table',
            width: 'auto',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
            marginBottom: 20,
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableCol: {
            borderStyle: 'solid',
            borderColor: '#000',
            padding: 5,
            textAlign: 'center',
        },
        firstCol: {
            width: '20%',
            borderRightWidth: 1,
        },
        remainingCols: {
            width: '15%',
            borderRightWidth: 1,
        },
        remainingCols2: {
            width: '15%',
            borderTopWidth: 1,
            borderRightWidth: 1,
        },
        remainingCols3: {
            width: '35%',
            borderTopWidth: 1,
        },
        remainingCols4: {
            width: '35%',
        },
        headerCol: {
            fontWeight: 'bold',
        },
        text: {
            fontSize: 10,
        },
    });

    return (
        <View style={styles.table}>
            {/* Header Row */}
            <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.firstCol, styles.headerCol]}>
                    <Text style={styles.text}>IV. CONCLUSIÓN GENERAL</Text>
                </View>
                <View style={[styles.tableCol, styles.remainingCols, styles.headerCol]}>
                    <Text style={styles.text}>Aprobado</Text>
                </View>
                <View style={[styles.tableCol, styles.remainingCols, styles.headerCol]}>
                    <Text style={styles.text}>Aprobado con observaciones</Text>
                </View>
                <View style={[styles.tableCol, styles.remainingCols, styles.headerCol]}>
                    <Text style={styles.text}>Rechazado</Text>
                </View>
                <View style={[styles.tableCol, styles.remainingCols4, styles.headerCol]}>
                    <Text style={styles.text}>SUGERENCIAS DE MEJORA</Text>
                </View>
            </View>
            {/* Content Row */}
            <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.firstCol]}>
                </View>
                <View style={[styles.tableCol, styles.remainingCols2]}>
                    <Text style={styles.text}>
                        {status === 'Aprobado' ? 'X' : ''}
                    </Text>
                </View>
                <View style={[styles.tableCol, styles.remainingCols2]}>
                    <Text style={styles.text}>
                        {status === 'Aprobado con observaciones' ? 'X' : ''}
                    </Text>
                </View>
                <View style={[styles.tableCol, styles.remainingCols2]}>
                    <Text style={styles.text}>
                        {status === 'Rechazado' ? 'X' : ''}
                    </Text>
                </View>
                <View style={[styles.tableCol, styles.remainingCols3]}>
                    <Text style={styles.text}>
                        {comment}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const PreProjectTemplate = ({ rubric, rubricInfo = {} }) => {
    // Obtener la escala de respuestas según el evaluationTypeID
    const answerScale = getAnswerScale(1);

    // Definir estilos para la tabla de la rubrica
    const styles = StyleSheet.create({
        margin: {
            marginHorizontal: 15,
            marginVertical: 20,
        },
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            marginBottom: 10,
            fontSize: 10,
        },
        image: {
            width: '15%',
            height: 60,
        },
        image2: {
            width: '25%',
            height: 60,
        },
        textContainer: {
            alignItems: 'center',
        },
        title: {
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 'bold',
            textDecoration: 'underline',
            marginBottom: 20,
        },
        title2: {
            textAlign: 'center',
            fontSize: 10,
            fontWeight: 'bold',
        },
        label: {
            fontSize: 10,
            marginTop: 20,
        },
        table: {
            display: 'table',
            width: 'auto',
            borderStyle: 'solid',
            borderWidth: 1,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderBottomWidth: 0
        },
        sizeTable: {
            textAlign: 'justify',
            fontSize: 10,
            width: '100%',
            height: 100,
            borderWidth: 2,
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomWidth: 0,
        },
        tableCell: {
            padding: 5,
            textAlign: 'justify',
        },
        borderTopTableCell: {
            borderTopWidth: 1,
        },
        borderBottomTableCell: {
            marginVertical: 20,
            borderBottomWidth: 1,
        },
        borderRightTableCell: {
            borderRightWidth: 1,
        },
        headerCell: {
            fontWeight: 'extrabold',
            textAlign: 'center',
        },
        topHeaderCell: {
            borderTopWidth: 0,
            textAlign: 'center',
        },
        cell1: {
            width: '50%',
            fontSize: 10,
        },
        cell2: {
            width: '20%',
            textAlign: 'center',
            fontSize: 10,
        },
        cell3: {
            width: '80%',
            fontSize: 10,
        },
        cell4: {
            width: '40%',
            fontSize: 10,
        },
        cell5: {
            width: '30%',
            fontSize: 10,
        },
        cell6: {
            width: '20%',
            textAlign: 'center',
            fontSize: 10,
        },
        section: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
            marginTop: 10,
        },
        leftColumn: {
            width: '60%',
            textAlign: 'justify',
            marginRight: '5%',
            fontSize: 15,
        },
        rightColumn: {
            width: '35%',
        },
        table2: {
            width: '100%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 5,
            textAlign: 'justify',
            fontSize: 10,
        },
        tableCell2: {
            flex: 1,
            padding: 5,
            textAlign: 'center',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
        },
        headerCell2: {
            fontWeight: 'bold',
        },
        colSpan4: {
            width: '61.54%',
            textAlign: 'center',
            borderBottomWidth: 1,
            fontSize: 11,
        },
        colSpan1: {
            width: '38.46%',
            textAlign: 'center',
        },
    });

    return (
        <Document>
            <Page size="A4">
                <View style={styles.margin}>
                    <View style={styles.container}>
                        <Image style={styles.image} src={imagen1} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title2}>UNIVERSIDAD DE TARAPACÁ</Text>
                            <Text>Facultad de Educación y Humanidad</Text>
                            <Text>Departamento de Educación</Text>
                            <Text>Programa de Magister</Text>
                        </View>

                    </View>
                    <View>
                        <Text style={[styles.title]}>REVISIÓN ANTEPROYECTO DE TESIS DE GRADO</Text>
                        {/* Tabla */}
                        <View style={[]}>
                            {/* Fila 1 */}
                            <View style={[styles.tableRow]}>
                                <Text style={[styles.tableCell, styles.cell5]}>NOMBRE ALUMNO(A):</Text>
                                <Text style={[styles.tableCell, styles.cell4]}>{rubricInfo.fullName}</Text>
                            </View>
                            {/* Fila 2 */}
                            {rubricInfo.fullNameEvaluator && (
                                <>
                                    <View style={[styles.tableRow]}>
                                        <Text style={[styles.tableCell, styles.cell5]}>PROFESOR(A) EVALUADOR(A):</Text>
                                        <Text style={[styles.tableCell, styles.cell4]}>{rubricInfo.fullNameEvaluator}</Text>
                                    </View>
                                </>
                            )}
                            {/* Fila 3 */}
                            <View style={[styles.tableRow]}>
                                <Text style={[styles.tableCell, styles.cell5]}>PROGRAMA:</Text>
                                <Text style={[styles.tableCell, styles.cell4]}>MAGISTER EN EDUCACIÓN</Text>
                            </View>
                            {/* Fila 4 */}
                            <View style={[styles.tableRow]}>
                                <Text style={[styles.tableCell, styles.cell5]}>CIUDAD:</Text>
                                <Text style={[styles.tableCell, styles.cell4]}>ARICA N°{rubricInfo.group} (COHORTE {rubricInfo.entry})</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.borderBottomTableCell}>
                        {/* Renderizar secciones de la rubrica */}
                        {rubric.sections.map((section, index) => (
                            <View key={section.sectionID} style={[styles.table]}>
                                {index > 0 ? <>
                                    <View style={[styles.tableRow]}>
                                        <Text style={[styles.headerCell, styles.cell1, styles.borderRightTableCell]}>{section.name}</Text>
                                        {answerScale.map((answer, index) => (
                                            <Text key={index} style={[styles.headerCell, styles.cell2]}>
                                            </Text>
                                        ))}
                                    </View>
                                </>
                                    : <>
                                        <View style={[styles.tableRow]}>
                                            <Text style={[styles.headerCell, styles.colSpan1, styles.borderRightTableCell]}></Text>
                                            <Text style={[styles.headerCell, styles.colSpan4]}>
                                                MARQUE CON UNA X:
                                            </Text>
                                        </View>
                                        <View style={[styles.tableRow]}>
                                            <Text style={[styles.headerCell, styles.cell1, styles.borderRightTableCell]}>{section.name}</Text>
                                            {answerScale.map((answer, index) => (
                                                <Text key={index} style={[styles.headerCell, styles.cell2, styles.topHeaderCell, answerScale.length > index + 1 && styles.borderRightTableCell]}>
                                                    {answer}
                                                </Text>
                                            ))}
                                        </View>
                                    </>}

                                {section.questions.map((question) => {
                                    return (
                                        <View key={question.questionID} style={[styles.tableRow, styles.borderTopTableCell]}>
                                            <Text style={[styles.tableCell, styles.cell1, styles.borderRightTableCell]}>{question.question}</Text>
                                            {answerScale.map((answer, index) => (
                                                <Text style={[styles.tableCell, styles.cell2, answerScale.length > index + 1 && styles.borderRightTableCell]}>
                                                    {question.answer === answer ? 'X' : ''}
                                                </Text>
                                            ))}
                                        </View>
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                    <EvaluationTable status={rubric.name} comment={rubric.comment} />
                    <SignatureBlock evaluatorName={rubricInfo.fullNameEvaluator} />
                    <Text style={[styles.label]}>
                        Fecha: {getCurrentDate()}
                    </Text>
                </View>
            </Page>
        </Document >
    );
};

export default PreProjectTemplate;
