import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from '../../components/loader/Loader';
import { setAccessToken, setIsAdminAccess, setRefreshToken } from "../../utils/cookieUtils";
import Cookies from "universal-cookie";

export const Auth = () => {
  const navigate = useNavigate();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      const cookies = new Cookies();
      const token = cookies.get('token');
      const refreshToken = cookies.get('refreshToken');
      if(token && refreshToken){
        try {
          if (token && refreshToken) {
            setAccessToken(token);
            setRefreshToken(refreshToken);
            navigate("/Dashboard");
          } else {
            console.error('Error de acceso denegado:', params.error_description);
            navigate("/Login");
          }
    
        } catch (error) {
          console.error('Error parsing user data cookie:', error);
        }
      }
    }
  }, [navigate]);

  return (
    <main>
      <Loader />
    </main>
  )
};
