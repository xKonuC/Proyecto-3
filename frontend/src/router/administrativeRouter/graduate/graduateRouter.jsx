import { Routes, Route } from 'react-router-dom';
import { HomeGraduate } from '../../../pages/administrative/graduate/home';
import StudentsList from '../../../pages/administrative/graduate/students/studentsList';

const GraduateRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeGraduate />} />
      <Route path="/Students" element={<StudentsList />} />
      {/* Futuras rutas para clasificación, reportes y exportación */}
    </Routes>
  );
};

export default GraduateRouter;
