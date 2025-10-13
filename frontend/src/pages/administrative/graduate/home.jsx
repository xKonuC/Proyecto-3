import React from "react";
import SectionsAdministrative from "../../../components/sections/home/sectionsAdministrative";
import { FaUserGraduate, FaList, FaChartBar, FaFileExport } from "react-icons/fa";

export const HomeGraduate = () => {
  const sectionsData = [
    {
      title: 'Lista de Estudiantes de Magíster',
      description: 'Visualiza y gestiona todos los estudiantes del programa de Magíster. Clasifica y organiza la información de los estudiantes.',
      link: '/Administrative/Graduate/Students',
      icon: <FaList size={30} />,
    },
    {
      title: 'Clasificación de Egresados',
      description: 'Clasifica y categoriza a los egresados según diferentes criterios como especialización, año de egreso, estado académico, etc.',
      link: '/Administrative/Graduate/Classification',
      icon: <FaUserGraduate size={30} />,
    },
    {
      title: 'Reportes y Estadísticas',
      description: 'Genera reportes y visualiza estadísticas sobre los egresados del programa. Análisis de tendencias y métricas.',
      link: '/Administrative/Graduate/Reports',
      icon: <FaChartBar size={30} />,
    },
    {
      title: 'Exportar Datos',
      description: 'Exporta información de egresados en diferentes formatos (Excel, PDF, CSV) para análisis externos.',
      link: '/Administrative/Graduate/Export',
      icon: <FaFileExport size={30} />,
    },
  ];

  return (
    <SectionsAdministrative
      title={'Panel de Gestión de Egresados'}
      description={'Bienvenido al Panel de Gestión de Egresados para el programa de Magíster en Educación de la Universidad de Tarapacá. Aquí podrás visualizar, clasificar y gestionar toda la información relacionada con los estudiantes y egresados del programa.'}
      sections={sectionsData}
    />
  );
};
