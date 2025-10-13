import React from 'react';
import Sidebar from '../sidebar';
import { Outlet } from "react-router-dom";
import DirectorIcon from '../../icon/role/directorIcon';
import AdministratorIcon from '../../icon/role/administratorIcon';
import AcademicIcon from '../../icon/role/academicIcon';
import GraduateIcon from '../../icon/role/graduateIcon';

const navigationUser = [
  {
    id: 1,
    label: 'Inicio',
    url: '/Administrative',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 opacity-80"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    width: 'w-24',
  },
];

const navigation = [
  {
    id: 2,
    label: 'Administrador',
    url: '/Administrative/Administrator',
    icon: (
      <AdministratorIcon />
    ),
    width: 'w-24',
    sectionsData: [
      {
        title: 'Gestión General de Usuarios',
        link: '/Administrative/Administrator/HandleUser',
      },
      {
        title: 'Gestión General de Títulos',
        link: '/Administrative/Administrator/HandleTitle',
      },
      {
        title: 'Gestión de Semestres',
        link: '/Administrative/Administrator/Semester',
      },
      {
        title: 'Gestión General de Rúbricas',
        link: '/Administrative/Administrator/HandleRubric',
      },
      {
        title: 'Asignación de Académicos',
        link: '/Administrative/Administrator/HandleSpecialization',
      },
    ],
  },
  {
    id: 3,
    label: 'Académico',
    url: '/Administrative/Academic',
    icon: (
      <AcademicIcon />
    ),
    width: 'w-24',
    sectionsData: [
      {
        title: 'Anteproyecto',
        link: '/Administrative/Academic/Evaluation/1',
      },
      {
        title: 'Tesis',
        link: '/Administrative/Academic/Evaluation/2',
      },
      {
        title: 'Gestión de Fichas Académicas',
        link: '/Administrative/Academic/HandleAcademicRecord/',
      },
      {
        title: 'Gestión de Títulos',
        link: '/Administrative/Academic/AcademicHasTitle/',
      },
    ],
  },
  {
    id: 4,
    label: 'Egresados',
    url: '/Administrative/Graduate',
    icon: (
      <GraduateIcon />
    ),
    width: 'w-24',
    sectionsData: [
      {
        title: 'Lista de Estudiantes',
        link: '/Administrative/Graduate/Students',
      },
      {
        title: 'Clasificación de Egresados',
        link: '/Administrative/Graduate/Classification',
      },
      {
        title: 'Reportes y Estadísticas',
        link: '/Administrative/Graduate/Reports',
      },
      {
        title: 'Exportar Datos',
        link: '/Administrative/Graduate/Export',
      },
    ],
  },
];

function SidebarAdministrative() {
  return (
    <>
      <header>
        <Sidebar navigationUser={navigationUser} navigation={navigation} />
      </header>
      <div className="bg-gray-100">
        <div className="py-8 pl-16 sm:pl-20 pr-1 sm:pr-10">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default SidebarAdministrative;
