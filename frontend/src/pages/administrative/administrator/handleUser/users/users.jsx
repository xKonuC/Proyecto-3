import React from "react";
import UserCRUD from '../../../../../components/crud/handleUser/user/userCRUD';
import UserNavbar from "../../../../../components/crud/handleUser/user/navbar/userNavbar";

export const Users = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/roleAssignment/user/',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/roleAssignment/userHasRole/userHasRoles',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/roleAssignment/user/updatePassword',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/roleAssignment/userHasRole/',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/administrator/roleAssignment/importUsers/',
    ];

    return (
        <>
            <UserNavbar urls={urls} />
            <UserCRUD name={'Usuario'} urls={urls} title={`Bienvenido a Gestión de Usuarios`} subtitle={'Sistema Administrativo'} />
        </>
    )
}
