import { Routes, Route } from "react-router-dom";

//Rutas Protegidas
import AuthProtectedRoute from "./protectRoute/authProtectedRoute";
import AdminAccessProtectedRoute from "./protectRoute/adminAccessProtectedRoute";

//Rutas Normales
import AuthRouter from "./auth/authRouter";
import AdministrativeRouter from "./administrativeRouter/administrativeRouter";
import StudentRouter from "./student/studentRouter";

export const AppRouter = () => {
    return <>
        <Routes>
            <Route path="/*" element={<AuthRouter />} />
            <Route element={<AuthProtectedRoute />} >
                <Route element={<AdminAccessProtectedRoute />} >
                    <Route path="/Administrative/*" element={<AdministrativeRouter />} />
                </Route>
                <Route path="/Dashboard/*" element={<StudentRouter />} />
            </Route>
        </Routes>
    </>
};