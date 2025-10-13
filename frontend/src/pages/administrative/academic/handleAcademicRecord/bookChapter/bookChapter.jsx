import React from "react";
import BookChapterCRUD from "../../../../../components/crud/handleAcademicRecord/bookChapter/bookChapterCRUD";
import BookChapterNavbar from "../../../../../components/crud/handleAcademicRecord/bookChapter/navbar/bookChapterNavbar";

export const BookChapter = () => {
    const urls = [
        import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/academic/handleAcademicRecord/bookChapter',
    ];

    return (
        <>
            <BookChapterNavbar />
            <BookChapterCRUD name={'Libro/Capitulo de Libro'} urls={urls} title={`Bienvenido a Gestión de Libros y Capítulos de Libro`} subtitle={'Sistema Administrativo'} />
        </>
        )
}
