import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { calculateScore, getAnswerScale } from '../../../../utils/crudHelpers/handleRubric/utils';
import imagen1 from '../../../../img/ab40044f-5bb4-4916-8e2b-a09619107ec3.jpg';
import imagen2 from '../../../../img/0d581134-890b-4ba8-87d8-e2367b6c255e.jpg';

// Función para obtener la fecha actual en el formato deseado
const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
};

const SignatureBlock = ({ evaluatorName = '', evaluatorType }) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
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
            {/* Primera columna */}
            <View style={[styles.cell, styles.firstColumn]}>
                <Text style={styles.label}>{evaluatorType}(a) de Tesis</Text>
                <View style={styles.spacer}></View> {/* Espacio en blanco */}
                <View style={styles.spacer}></View> {/* Espacio en blanco */}
            </View>

            {/* Segunda columna */}
            <View style={[styles.cell, styles.otherColumns]}>
                <Text style={styles.label}>{evaluatorName}</Text>
                <View style={styles.line}></View>
                <Text style={styles.label}>Nombre</Text>
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

const ThesisTemplate = ({ rubric, rubricInfo = {}, evaluatorType = '' }) => {
    // Obtener la escala de respuestas según el evaluationTypeID
    const answerScale = getAnswerScale(2);

    // Calcular el puntaje obtenido y la calificación final para la sección de tesis
    let score = 0;
    let totalScore = 0;
    const { score: calculatedScore, totalScore: calculatedTotalScore } = calculateScore(rubric.sections);
    score = calculatedScore;
    totalScore = calculatedTotalScore;

    // Definir estilos para la tabla de la rubrica
    const styles = StyleSheet.create({
        margin: {
            marginHorizontal: 15,
            marginVertical: 20,
        },
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
            marginBottom: 10,
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
        tableRow2: {
            flexDirection: 'row',
        },
        tableCell: {
            padding: 5,
            textAlign: 'justify',
        },
        borderTopTableCell: {
            borderTopWidth: 1,
        },
        borderBottomTableCell: {
            marginVertical: 10,
            borderBottomWidth: 1,
        },
        borderRightTableCell: {
            borderRightWidth: 1,
        },
        headerCell: {
            fontWeight: 'extrabold',
            textAlign: 'center',
            backgroundColor: '#ADBFF7',
        },
        topHeaderCell: {
            borderTopWidth: 1,
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
            fontSize: 10,
        },
        rightColumn: {
            width: '35%',
        },
        table2: {
            width: '100%',
            borderStyle: 'solid',
            borderWidth: 1,
            textAlign: 'justify',
            fontSize: 10,
        },
        tableCell2: {
            flex: 1,
            padding: 5,
            textAlign: 'center',
        },
        tableCell3: {
            flex: 1,
            padding: 5,
            textAlign: 'center',
            borderRightWidth: 1,
        },
        borderTopCell: {
            borderTopWidth: 1,
        },
        headerCell2: {
            fontWeight: 'bold',
        },
    });

    return (
        <Document>
            <Page size="A4">
                <View style={styles.margin}>
                    <View style={styles.container}>
                        <Image style={styles.image} src={imagen1} />
                        <View style={styles.textContainer}>
                            <Text>UNIVERSIDAD DE TARAPACÁ</Text>
                            <Text>Facultad de Educación y Humanidad</Text>
                            <Text>Departamento de Educación</Text>
                            <Text>Programa de Magister</Text>
                        </View>
                        <Image style={styles.image2} src={imagen2} />
                    </View>
                    <View>
                        <Text style={[styles.title]}>PAUTA EVALUACIÓN TESIS DE GRADO</Text>
                        {/* Tabla */}
                        <View style={[]}>
                            {/* Fila 1 */}
                            <View style={[styles.tableRow]}>
                                <Text style={[styles.tableCell, styles.cell2]}>Alumno(s) Tesista(s) :</Text>
                                <Text style={[styles.tableCell, styles.cell4]}>{rubricInfo.fullName}</Text>
                                <Text style={[styles.tableCell, styles.cell2]}>Fecha :</Text>
                                <Text style={[styles.tableCell, styles.cell2]}>{getCurrentDate()}</Text>
                            </View>
                            {/* Fila 2 */}
                            <View style={[styles.tableRow]}>
                                <Text style={[styles.tableCell, styles.cell2]}>Programa :</Text>
                                <Text style={[styles.tableCell, styles.cell3]}>MAGISTER EN EDUCACIÓN, ARICA N°{rubricInfo.group}</Text>
                            </View>
                            {/* Fila 3 */}
                            <View style={[styles.tableRow]}>
                                <Text style={[styles.tableCell, styles.cell2]}>Año de Ingreso :</Text>
                                <Text style={[styles.tableCell, styles.cell3]}>{rubricInfo.entry}</Text>
                            </View>
                            {/* Fila 4 */}
                            <View style={[styles.tableRow]}>
                                <Text style={[styles.tableCell, styles.cell2]}>Título Tesis :</Text>
                                <Text style={[styles.tableCell, styles.cell3]}>{rubric.rubric_name}</Text>
                            </View>
                            {rubricInfo.fullNameEvaluator && (
                                <>
                                    {/* Fila 4 */}
                                    <View style={[styles.tableRow]}>
                                        <Text style={[styles.tableCell, styles.cell2]}>{evaluatorType}(a) de Tesis :</Text>
                                        <Text style={[styles.tableCell, styles.cell3]}>{rubricInfo.fullNameEvaluator}</Text>
                                    </View>
                                </>
                            )}
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
                                            <Text key={index} style={[styles.headerCell, styles.cell2, styles.borderRightTableCell]}>
                                            </Text>
                                        ))}
                                    </View>
                                </>
                                    : <>
                                        <View style={[styles.tableRow]}>
                                            <Text style={[styles.headerCell, styles.cell1, styles.borderRightTableCell]}></Text>
                                            {answerScale.map((answer, index) => (
                                                <Text key={index} style={[styles.headerCell, styles.cell2, answerScale.length > index + 1 && styles.borderRightTableCell]}>
                                                    {index + 1}
                                                </Text>
                                            ))}
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
                    {/* Sección para el tipo de evaluación 2 (Tesis de Grado) */}
                    <View style={styles.section}>
                        {/* Columna Izquierda: Texto */}
                        <View style={styles.leftColumn}>
                            <Text>Nota Mínima aprobación Actividad de Graduación (Tesis de Grado): 5,0 (cinco, cero)</Text>
                        </View>
                        {/* Columna Derecha: Tabla */}
                        <View style={styles.rightColumn}>
                            <View style={styles.table2}>
                                <View style={[styles.tableRow2]}>
                                    <Text style={[styles.tableCell3]}>Puntaje Obtenido</Text>
                                    <Text style={styles.tableCell2}>{`${score} de ${totalScore}`}</Text>
                                </View>
                                <View style={[styles.tableRow2]}>
                                    <Text style={[styles.tableCell3, styles.borderTopCell]}>Calificación Final</Text>
                                    <Text style={[styles.tableCell2, styles.borderTopCell]}>{rubric.grade1 === null ? 1.0 : rubric.grade1}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
            <Page size="A4">
                <View style={styles.margin}>
                    <Text style={styles.cell1}>Otras Observaciones:</Text>
                    <Text style={[styles.table, styles.borderBottomTableCell, styles.sizeTable]}>
                        {rubric.comment === null ? 'Sin notas adicionales' : rubric.comment}
                    </Text>
                </View>
                <SignatureBlock evaluatorName={rubricInfo.fullNameEvaluator} evaluatorType={evaluatorType}/>
            </Page>
        </Document >
    );
};

export default ThesisTemplate;
