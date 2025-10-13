import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../pages/administrative/administrator/home';

import { HandleUser } from '../../../pages/administrative/administrator/handleUser/handleUser';
import { Users } from '../../../pages/administrative/administrator/handleUser/users/users';
import { Academic } from '../../../pages/administrative/administrator/handleUser/academic/academic';
import { AcademicHasTitle } from '../../../pages/administrative/administrator/handleUser/academic/academicHasTitle/academicHasTitle';
import { Student } from '../../../pages/administrative/administrator/handleUser/student/student';
import { Document } from '../../../pages/administrative/administrator/handleUser/student/document/document';
import { StudentHasTitle } from '../../../pages/administrative/administrator/handleUser/student/studentHasTitle/studentHasTitle';

import { HandleTitle } from '../../../pages/administrative/administrator/handleTitle/handleTitle';
import { Title } from '../../../pages/administrative/administrator/handleTitle/title/title';
import { University } from '../../../pages/administrative/administrator/handleTitle/university/university';

import { Semester } from '../../../pages/administrative/administrator/semester/semester';

import { HandleRubric } from '../../../pages/administrative/administrator/handleRubric/handleRubric';
import { Template } from '../../../pages/administrative/administrator/handleRubric/template/template';
import { Question } from '../../../pages/administrative/administrator/handleRubric/question/question';
import { Section } from '../../../pages/administrative/administrator/handleRubric/section/section';
import { TemplateOverview } from '../../../pages/administrative/administrator/handleRubric/templateOverview/templateOverview';

import { HandleSpecialization } from '../../../pages/administrative/administrator/handleSpecialization/handleSpecialization';
import { EvaluatorAssignment } from '../../../pages/administrative/administrator/handleSpecialization/evaluatorAssignment';
import { ThesisRegistration } from '../../../pages/administrative/administrator/handleSpecialization/thesisRegistration'

import { AcademicInfo } from '../../../pages/administrative/administrator/handleAcademicRecord/academicInfo/academicInfo';
import { BookChapter } from '../../../pages/administrative/administrator/handleAcademicRecord/bookChapter/bookChapter';
import { Consultancy } from '../../../pages/administrative/administrator/handleAcademicRecord/consultancy/consultancy';
import { GuidedThesis } from '../../../pages/administrative/administrator/handleAcademicRecord/guidedThesis/guidedThesis';
import { Patent } from '../../../pages/administrative/administrator/handleAcademicRecord/patent/patent';
import { Project } from '../../../pages/administrative/administrator/handleAcademicRecord/project/project';
import { Publication } from '../../../pages/administrative/administrator/handleAcademicRecord/publication/publication';

import SidebarAdministrative from '../../../components/sidebar/administrative/sidebarAdministrative';
import NotFound from '../../../pages/notFound';

const AdministratorRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SidebarAdministrative />}>
        <Route index element={<Home />} />
        
        <Route path="HandleUser" element={<HandleUser />}/>
        <Route path="Users" element={<Users />} />
        <Route path="Academic" element={<Academic />} />
        <Route path="AcademicHasTitle/:userID" element={<AcademicHasTitle />} />
        <Route path="Student" element={<Student />} />
        <Route path="Document/:userID" element={<Document />} />
        <Route path="studentHasTitle/:userID" element={<StudentHasTitle />} />
        
        <Route path="HandleTitle" element={<HandleTitle />}/>
        <Route path="Title" element={<Title />} />
        <Route path="University" element={<University />} />

        <Route path="handleAcademicRecord/academicInfo/:userID" element={<AcademicInfo />} />
        <Route path="handleAcademicRecord/bookChapter/:userID" element={<BookChapter />} />
        <Route path="handleAcademicRecord/consultancy/:userID" element={<Consultancy />} />
        <Route path="handleAcademicRecord/guidedThesis/:userID" element={<GuidedThesis />} />
        <Route path="handleAcademicRecord/patent/:userID" element={<Patent />} />
        <Route path="handleAcademicRecord/project/:userID" element={<Project />} />
        <Route path="handleAcademicRecord/publication/:userID" element={<Publication />} />
        
        <Route path="Semester" element={<Semester />} />
        
        <Route path="HandleRubric" element={<HandleRubric />}/>
        <Route path="Template/:templateID" element={<TemplateOverview />} />
        <Route path="Template" element={<Template />} />
        <Route path="Section" element={<Section />} />
        <Route path="Question" element={<Question />} />
        
        <Route path="HandleSpecialization" element={<HandleSpecialization />}/>
        <Route path="EvaluatorAssignment/:evaluationTypeID" element={<EvaluatorAssignment />} />
        <Route path="ThesisRegistration" element={<ThesisRegistration />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdministratorRouter;
