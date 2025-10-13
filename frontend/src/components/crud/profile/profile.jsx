import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

// Bibliotecas externas
import HandleAlert from '../../alert/handleAlert';

// Componentes personalizados
import FetchService from '../../../utils/crudHelpers/service/baseService/fetchService';
import ResponseHandler from '../../../utils/crudHelpers/responseHandler';

// Componentes compartidos
import ProfileCard from '../../card/profileCard';
import IconOnlyAlert from '../../alert/iconOnlyAlert'
import { getUser, setUser } from '../../../utils/cookieUtils';

const ProfileCRUD = ({ name, urls, title, subtitle }) => {
  const navigate = useNavigate();

  const [alertComponent, showAlert] = HandleAlert();
  const [items, setItems] = useState({});

  // -------------------------------Funciones Para CRUD-------------------------------
  const [fetchHandler] = useState(() => async () => {
    await handleFetch();
  });

  // Función para obtener datos
  const handleFetch = async () => {
    const userData = getUser();

    // Si existen datos del Usuario en las cookies, usar esos datos en lugar de hacer las solicitudes
    if (userData) {
      setItems(userData);
      return;
    }
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    await fetchService.execute({});
  }

  // Función para manejar la verificación
  const handleVerification = async (message) => {
    showAlert({
      type: 'verification',
      content: message,
    });
  };

  // Función para manejar la renovación
  const handleRenewal = async (message) => {
    showAlert({
      type: 'verification',
      content: message,
    });
    await fetchHandler();
  };

  // Función para manejar los datos obtenidos
  const handleData = (data) => {
    setItems(data);
    //Guardo los datos del usuario en las cookies, con eso me evito hacer esta búsqueda si existe un valor,
    setUser(data);
  };

  // Función para manejar las respuestas de los servicios
  const responseHandler = (response) => {
    ResponseHandler({
      showAlert,
      response,
      navigate,
      onVerification: handleVerification,
      onRenewal: handleRenewal,
      onData: handleData,
    });
  };

  // -------------------------------Funciones de Extra-------------------------------
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Iniciar carga de datos
    if (!isMounted.current) {
      isMounted.current = true;
      setIsLoading(true);
      const fetchData = async () => {
        await fetchHandler();
        setIsLoading(false);
      };
      fetchData();
    }
  }, [fetchHandler]);

  // -------------------------------Funciones para los Modal-------------------------------

  return (
    <>
      {alertComponent}
      <div className="min-h-screen flex justify-center">
        {(isLoading && items) ? (
          <IconOnlyAlert />
        ) : (
          <ProfileCard item={items} />
        )}
      </div>

    </>
  );
};

export default ProfileCRUD;