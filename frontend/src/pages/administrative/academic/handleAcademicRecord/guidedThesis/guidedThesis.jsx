import React from "react";
import GuidedThesisCRUD from "../../../../../components/crud/handleAcademicRecord/guidedThesis/guidedThesisCRUD";
import GuidedThesisNavbar from "../../../../../components/crud/handleAcademicRecord/guidedThesis/navbar/guidedThesisNavbar";

export const GuidedThesis = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleAcademicRecord/guidedThesis',
    ];

    return (
        <>
            <GuidedThesisNavbar />
            <GuidedThesisCRUD name={'Tesis Guiada'} urls={urls} title={`Bienvenido a Gestión de Tesis Dirigidas`} subtitle={'Sistema Administrativo'} />
        </>
        )
}
