import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Loader from '../../components/loader/Loader';

import { POSTRequest } from '../../utils/requestHelpers';
import { setAccessToken, setIsAdminAccess, setRefreshToken } from "../../utils/cookieUtils";
import Cookies from "universal-cookie";

export const AuthAdministrative = () => {
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const verifyAdministrative = async (access_token, refresh_token) => {
    try {
      const url = import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/auth/verifyAdministrative' || '';

      const response = await POSTRequest(url, { access_token });
      if (response.access_token) {
        setAccessToken(response.access_token);
        setRefreshToken(refresh_token);
        setIsAdminAccess(true);
        navigate("/Administrative");
      } else {
        navigate("/Login");
      }
    } catch (error) {
      console.error('Error de acceso denegado:', error.message);
      navigate("/Login");
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      const cookies = new Cookies();
      const token = cookies.get('token');
      const refreshToken = cookies.get('refreshToken');

      if (token && refreshToken) {
        verifyAdministrative(token, refreshToken);
      } else {
        console.error('Error de acceso denegado:', params.error_description);
        navigate("/Login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <main>
      <Loader />
    </main>
  );
};
