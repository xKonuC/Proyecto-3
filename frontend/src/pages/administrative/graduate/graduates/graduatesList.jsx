import GraduateCRUD from '../../../../components/crud/handleUser/graduate/graduateCRUD';
import StudentNavbar from '../../../../components/crud/handleUser/student/navbar/studentNavbar'; // Reutilizamos navbar de estudiante por ahora

const GraduatesList = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/graduates',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/graduates',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/graduates',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/graduates',
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/graduates',
    ];

    return (
        <>
            <StudentNavbar urls={urls} />
            <GraduateCRUD name={'Graduado'} urls={urls} title={`Lista de Graduados`} subtitle={'Sistema Administrativo'} />
        </>
    )
}

export default GraduatesList;
