import React from "react";
import SectionsAdministrative from "../../../components/sections/home/sectionsAdministrative";
import { FaUserGraduate, FaList, FaChartBar, FaFileExport } from "react-icons/fa";

export const HomeGraduate = () => {
  const sectionsData = [
    {
      title: 'Lista de Estudiantes del Magíster',
      description: 'Visualiza y gestiona todos los estudiantes del programa de Magíster. Clasifica y organiza la información de los estudiantes.',
      link: '/Administrative/Graduate/Students',
      icon: <FaList size={30} />,
    },
    {
      title: 'Lista de Graduados del Magíster',
      description: 'Visualiza y gestiona todos los graduados del programa. Accede a su información académica y laboral.',
      link: '/Administrative/Graduate/Graduates',
      icon: <FaUserGraduate size={30} />,
    },
    {
      title: 'Clasificación de Graduados',
      description: 'Clasifica y categoriza a los graduados según diferentes criterios como especialización, año de egreso, estado académico, etc.',
      link: '/Administrative/Graduate/Classification',
      icon: <FaUserGraduate size={30} />,
    },
    {
      title: 'Reportes y Estadísticas',
      description: 'Genera reportes y visualiza estadísticas sobre los graduados del programa. Análisis de tendencias y métricas.',
      link: '/Administrative/Graduate/Reports',
      icon: <FaChartBar size={30} />,
    },
    {
      title: 'Importar Datos',
      description: 'Importar información de graduados en formatos (Excel, CSV) para la carga de datos masiva.',
      link: '/Administrative/Graduate/Export',
      icon: <FaFileExport size={30} />,
    },
  ];

  return (
    <SectionsAdministrative
      title={'Panel de Gestión de Graduados'}
      description={'Bienvenido al Panel de Gestión de Graduados para el programa de Magíster en Educación de la Universidad de Tarapacá. Aquí podrás visualizar, clasificar y gestionar toda la información relacionada con los estudiantes y graduados del programa.'}
      sections={sectionsData}
    />
  );
};
