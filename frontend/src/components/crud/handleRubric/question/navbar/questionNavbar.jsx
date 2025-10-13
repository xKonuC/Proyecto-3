import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleRubric/question/questionSlice';

import SearchAndSort from '../../../../navbar/management/searchAndSort';

const options = [
    { label: `ID`, value: 'questionID' },
    { label: `Pregunta`, value: 'question' },
    { label: `Estado`, value: 'isActive' },
];

const QuestionNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.handleRubric.question);

    return (
        <>
            <SearchAndSort options={options} items={items} filteredItems={filteredItems} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default QuestionNavbar;
