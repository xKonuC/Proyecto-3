import { Routes, Route } from 'react-router-dom';
import { HomeGraduate } from '../../../pages/administrative/graduate/home';
import StudentsList from '../../../pages/administrative/graduate/students/studentsList';
import ClassificationList from '../../../pages/administrative/graduate/classification/classificationList';
import CreateClassification from '../../../pages/administrative/graduate/classification/createClassification';
import ClassificationDetail from '../../../pages/administrative/graduate/classification/classificationDetail';
import EditClassification from '../../../pages/administrative/graduate/classification/editClassification';
import Reports from '../../../pages/administrative/graduate/reports/reports';
import GraduatesList from '../../../pages/administrative/graduate/graduates/graduatesList';

const GraduateRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeGraduate />} />
      <Route path="/Students" element={<StudentsList />} />
      <Route path="/Classification" element={<ClassificationList />} />
      <Route path="/Classification/Create" element={<CreateClassification />} />
      <Route path="/Classification/:classificationId" element={<ClassificationDetail />} />
      <Route path="/Classification/Edit/:classificationId" element={<EditClassification />} />
      <Route path="/Reports" element={<Reports />} />
      <Route path="/Graduates" element={<GraduatesList />} />
    </Routes>
  );
};

export default GraduateRouter;
