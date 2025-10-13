import React from 'react';
import ProfileCRUD from '../../../components/crud/profile/profile';

const Profile = () => {
  const urls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/user/',
  ];
  return (
    <ProfileCRUD name={'Usuario'} urls={urls} title={`Bienvenido a gestión de usuarios`} subtitle={'CRUD de Usuarios'} />
  );
};

export default Profile;
