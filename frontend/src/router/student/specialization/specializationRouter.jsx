import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { StudentHasSpecialization } from '../../../pages/student/specialization/studentHasSpecialization';
import { StudentHasElective } from '../../../pages/student/specialization/studentHasElective';
import { StudentHasSemester } from '../../../pages/student/specialization/studentHasSemester';
import { Evaluate } from '../../../pages/student/specialization/evaluate';

import SidebarStudent from '../../../components/sidebar/student/sidebarStudent';
import NotFound from '../../../pages/notFound';

const SpecializationRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SidebarStudent />}>
        <Route index element={<StudentHasSpecialization />} />
        <Route path="/Electives" element={<StudentHasElective />} />
        <Route path="EvaluationProcess" element={<StudentHasSemester />} />
        <Route path="EvaluationProcess/:evaluationTypeID/:studentHasSemesterID" element={<Evaluate />} />
      </Route>
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default SpecializationRouter;
