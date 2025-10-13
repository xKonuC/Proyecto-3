import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleAcademicRecord/bookChapter/bookChapterSlice';

import RecordManagement from '../../../../navbar/management/recordManagement';
import { bookChapterOptions as options } from '../../../../../utils/crudHelpers/options';

const BookChapterNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.handleAcademicRecord.bookChapter);

    return (
        <>
            <RecordManagement options={options} items={items} filteredItems={filteredItems} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default BookChapterNavbar;
