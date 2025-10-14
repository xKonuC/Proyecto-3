//Constante para los elementos máximo de una tabla, por pagina
export const ITEMS_PER_PAGE = parseInt(import.meta.env.VITE_ITEMS_PER_PAGE, 10) || 30;
export const MAX_LENGTH_ARRAY_STRING = parseInt(import.meta.env.VITE_MAX_LENGHT_ARRAY_STRING, 10) || 50;
export const MAX_LENGTH_ARRAY_NUMBER = parseInt(import.meta.env.VITE_MAX_LENGHT_ARRAY_NUMBER, 10) || 100;
export const MAX_LENGTH_ARRAY_DATA = parseInt(import.meta.env.VITE_MAX_LENGHT_ARRAY_DATA, 10) || 10;

//Valores que deber ser cambiados
export const dateOptions = ['sex', 'articulation', 'birthday', 'startDate', 'finishDate', 'creationDate', 'updateDate', 'sameProgram', 'applicationDate', 'publicationDate', 'isIndexed', 'isActive',     'finalGrade',
    'stage1_grade',
    'stage2_grade',
    'stage3_grade',
    'director_grade1',
    'director_grade2',
    'codirector_grade1',
    'codirector_grade2',
    'programDirector_grade1',
    'programDirector_grade2',
    'academicA_grade1',
    'academicA_grade2',
    'academicB_grade1',
    'academicB_grade2',
    'grade1',
    'grade2',
    'grade3',];

//CRUD Usuarios, Académicos y Estudiantes
export const validMaritalStatuses = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Otro'];
export const validGenders = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
    { value: 'N', label: 'No Binario' },
    { value: 'O', label: 'Otro' }
];
export const validGenders2 = ['M', 'F', 'N', 'O'];

export const roles = [
    { value: 1, label: 'SuperAdmin' },
    { value: 2, label: 'Administrador' },
    { value: 3, label: 'Académico' },
    { value: 4, label: 'Estudiante' },
    { value: 5, label: 'Egresado' },
];

export const validArticulation = [
    { value: 0, label: 'No' },
    { value: 1, label: 'Si' }
];

//CRUD Documentos
export const validCategory = ['Currículum', 'Fotografía', 'Carta de Motivación', 'Certificado de Nacimiento', 'Fotocopia de Cédula de Identidad'];

//CRUD de Títulos del Académico
export const validInvestigationLine = ['Educación y Humanidad', 'Ingeniería', 'Ciencias', 'Medicina'];

//CRUD de Títulos
export const validDepartmentTitle = ['Educación y Humanidad', 'Ingeniería', 'Ciencias', 'Medicina'];

export const validArea = [
    { value: 1, label: "Salud" },
    { value: 2, label: "Ingeniería" },
    { value: 3, label: "Ciencias Sociales" },
    { value: 4, label: "Ciencias Naturales" },
    { value: 5, label: "Educación" },
    { value: 6, label: "Comunicación y Medios" },
    { value: 7, label: "Negocios y Economía" }
];

//CRUD de Semestres
export const typeSemester = [
    { value: 1, label: 'Primer Semestre' },
    { value: 2, label: 'Segundo Semestre' },
];

//CRUD de Permisos para el Usuario
export const userHasPermission = [
    { permissionID: 1, label: 'Permiso para Escoger Línea de Formación', value: false, userHasPermissionID: 0, dueDate: null },
    { permissionID: 2, label: 'Permiso para Escoger 1° Electivo', value: false, userHasPermissionID: 0, dueDate: null },
    { permissionID: 3, label: 'Permiso para Escoger 2° Electivo', value: false, userHasPermissionID: 0, dueDate: null },
    { permissionID: 4, label: 'Permiso para Subir Anteproyecto', value: false, userHasPermissionID: 0, dueDate: null },
    { permissionID: 5, label: 'Permiso para Subir Tesis', value: false, userHasPermissionID: 0, dueDate: null },
]

//Especializaciones disponibles
export const specialization = [
    { value: 2, label: 'Gestión e Innovación' },
    { value: 3, label: 'Didáctica y Evaluación' },
    { value: 4, label: 'Diversidad Interculturalidad en Educación' },
];

//Tipos de Evaluación
export const evaluationType = [
    { value: 1, label: 'Anteproyecto' },
    { value: 2, label: 'Tesis' },
];

//Tipos de Evaluación
export const elective = [
    { value: 1, label: 'Electivo 1' },
    { value: 2, label: 'Electivo 2' },
];

// Electivos
export const elective1 = [
    { electiveID: 1, label: "Gestión e Innovación Educativa.", specializationID: 2 },
    { electiveID: 2, label: "Evaluación de Sistema e Institución Educativas.", specializationID: 2 },
    { electiveID: 3, label: "Currículo.", specializationID: 3 },
    { electiveID: 4, label: "Didáctica de los Aprendizajes.", specializationID: 3 },
    { electiveID: 5, label: "El Enfoque Intercultural en Educación.", specializationID: 4 },
    { electiveID: 6, label: "Ciudadanía Democrática y Educación.", specializationID: 4 },
]

export const elective2 = [
    { electiveID: 7, label: "Dirección de Organizaciones Educativas.", specializationID: 2 },
    { electiveID: 8, label: "Gestión Financiera Educacional.", specializationID: 2 },
    { electiveID: 9, label: "Gestión Financiera Curricular.", specializationID: 3 },
    { electiveID: 10, label: "Evaluación de los Aprendizajes.", specializationID: 3 },
    { electiveID: 11, label: "Migración y Desigualdad en Educación.", specializationID: 4 },
    { electiveID: 12, label: "Diversidad e Identidad Étnica.", specializationID: 4 },
]

//Revision de Anteproyectos
export const reviewStatus = [
    { value: 7, label: 'Todo correcto' },
    { value: 8, label: 'Requiere correcciones' },
];


//Fichas Académicas
export const validGuidedThesisType = ['Magíster', 'Doctorado',];
export const validBookChapterType = ['Libro', 'Capitulo de Libro',];
export const validPublicationType = ['WoS', 'SCOPUS', 'SCIELO', 'LATINDEX'];
export const validProjectType = [ 'Investigación', 'Intervención', 'Innovación', 'Desarrollo Tecnológico'];

export const validRole = ['Guía', 'Co-Guía',];
export const validProjectRole = ['Investigador Responsable', 'Co-Investigador', 'Investigador Principal', 'Investigador Patrocinador', 'Jefe de Proyecto'];

export const validStatus = ['Publicado', 'Aceptado', 'En Prensa', 'AOP'];

export const validSameProgram = [
    { value: 0, label: 'No' },
    { value: 1, label: 'Si' }
];
export const validIsIndexed = [
    { value: 0, label: 'No' },
    { value: 1, label: 'Si' }
];
export const validTypeBond = ['Claustro', 'Núcleo', 'Colaborador/a'];
export const validHierarchy = ['Sin jerarquía','Titular','Asistente','Asociado','Instructor'];
export const validWorkedHours = ['Jornada Completa', 'Media Jornada', 'Profesor Hora/Part-Time'];