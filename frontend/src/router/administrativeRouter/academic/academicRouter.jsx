import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../pages/administrative/academic/home';

import { AcademicHasTitle } from '../../../pages/administrative/academic/academicHasTitle/academicHasTitle';

import { Evaluation } from '../../../pages/administrative/academic/evaluation/evaluation';
import { HandleRubric } from '../../../pages/administrative/academic/handleRubric/handleRubric';

import { HandleAcademicRecord } from '../../../pages/administrative/academic/handleAcademicRecord/handleAcademicRecord';
import { AcademicInfo } from '../../../pages/administrative/academic/handleAcademicRecord/academicInfo/academicInfo';
import { BookChapter } from '../../../pages/administrative/academic/handleAcademicRecord/bookChapter/bookChapter';
import { Consultancy } from '../../../pages/administrative/academic/handleAcademicRecord/consultancy/consultancy';
import { GuidedThesis } from '../../../pages/administrative/academic/handleAcademicRecord/guidedThesis/guidedThesis';
import { Patent } from '../../../pages/administrative/academic/handleAcademicRecord/patent/patent';
import { Project } from '../../../pages/administrative/academic/handleAcademicRecord/project/project';
import { Publication } from '../../../pages/administrative/academic/handleAcademicRecord/publication/publication';

import SidebarAdministrative from '../../../components/sidebar/administrative/sidebarAdministrative';
import NotFound from '../../../pages/notFound';

const AcademicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SidebarAdministrative />}>        
        <Route index element={<Home />} />

        <Route path="AcademicHasTitle" element={<AcademicHasTitle />} />

        <Route path="HandleAcademicRecord" element={<HandleAcademicRecord />} />
        <Route path="HandleAcademicRecord/AcademicInfo" element={<AcademicInfo />} />
        <Route path="HandleAcademicRecord/BookChapter" element={<BookChapter />} />
        <Route path="HandleAcademicRecord/Consultancy" element={<Consultancy />} />
        <Route path="HandleAcademicRecord/GuidedThesis" element={<GuidedThesis />} />
        <Route path="HandleAcademicRecord/Patent" element={<Patent />} />
        <Route path="HandleAcademicRecord/Project" element={<Project />} />
        <Route path="HandleAcademicRecord/Publication" element={<Publication />} />
        
        <Route path="Evaluation/:evaluationTypeID" element={<Evaluation />} />
        <Route path="HandleRubric/:evaluationTypeID/:rubricID/:userID/:evaluatorID/:categoryEvaluator" element={<HandleRubric />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AcademicRouter;
