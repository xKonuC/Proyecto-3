import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/home';
import { Login } from "../../pages/login"
import { VerifyAuth } from "../../pages/auth/verifyAuth";
import { Auth } from "../../pages/auth/auth";
import { AuthAdministrative } from "../../pages/auth/authAdministrative";
import { ChangePassword } from "../../pages/auth/changePassword";
import PrivacyPolicy from '../../pages/privacy-policy';
import NotFound from '../../pages/notFound';

const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="Login" element={<Login />} />
                <Route path="Auth" element={<Auth />} />
                <Route path="AuthAdministrative" element={<AuthAdministrative />} />
                <Route path="ChangePassword" element={<ChangePassword />} />
                <Route path="VerifyAuth" element={<VerifyAuth />} />
                <Route path="/politica" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AuthRouter;
