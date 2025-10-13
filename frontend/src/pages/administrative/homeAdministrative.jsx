import React from "react";
import SectionsAdministrative from "../../components/sections/home/sectionsAdministrative";
import AdministratorIcon from "../../components/icon/role/administratorIcon";
import AcademicIcon from "../../components/icon/role/academicIcon";
import GraduateIcon from "../../components/icon/role/graduateIcon";

export const HomeAdministrative = () => {

  const sectionsData = [
    {
      title: 'Panel de Administración del Administrador',
      description: '',
      link: '/Administrative/Administrator',
      icon: (
        <AdministratorIcon size={16} opacity={100} />
      ),
    },
    {
      title: 'Panel de Administración del Académico',
      description: '',
      link: '/Administrative/Academic',
      icon: (
        <AcademicIcon size={16} opacity={100} />
      ),
    },
    {
      title: 'Gestión de Egresados',
      description: '',
      link: '/Administrative/Graduate',
      icon: (
        <GraduateIcon size={16} opacity={100} />
      ),
    },
  ];

  return (
    <SectionsAdministrative
      title={'Bienvenido al Panel de Administración General'}
      sections={sectionsData}
    />
  );
};