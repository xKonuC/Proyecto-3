import React from 'react';
import ProfileCRUD from '../../../components/crud/profile/profile';

const Profile = () => {
  const urls = [
    import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/graduate/user/',
  ];
  return (
    <div className="relative">
        <div className="absolute top-0 right-0 z-10 p-4">
             <a href="/Graduate/UpdateData" className="bg-orange-main hover:bg-orange-600 text-white font-bold py-2 px-4 rounded shadow-md transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Llenar formulario de seguimiento
             </a>
        </div>
        <ProfileCRUD 
            name={'Usuario'} 
            urls={urls} 
            title={`Bienvenido a gestión de usuarios`} 
            subtitle={'CRUD de Usuarios'} 
            passwordUrl={import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/graduate/user/updatePassword'}
        />
    </div>
  );
};

export default Profile;
