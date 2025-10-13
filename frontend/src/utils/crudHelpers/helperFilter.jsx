import { filterItems, filterItemsByDateRange, filterMultipleItems, sortItems } from "./searchFilter";

export const getCurrentPageItems = (ITEMS_PER_PAGE, currentPage, items, searchTerm, searchType, sortProperty, sortDirection) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const filteredItems = filterItems(items, searchTerm, searchType);
    const sortedItems = sortItems(filteredItems, sortProperty, sortDirection);
    return sortedItems.slice(startIndex, endIndex);
};

export const getCurrentPageItemsSorted = (ITEMS_PER_PAGE, currentPage, items, sortProperty, sortDirection) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const sortedItems = sortItems(items, sortProperty, sortDirection);
    return sortedItems.slice(startIndex, endIndex);
};

export const getCurrentPageItemsRange = (ITEMS_PER_PAGE, currentPage, items, startDate, endDate, searchTerm, searchType, sortProperty, sortDirection, searchType2) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const filteredItems = filterItems(items, searchTerm, searchType);
    const itemsInDateRange = filterItemsByDateRange(filteredItems, startDate, endDate, searchType2);
    const sortedItems = sortItems(itemsInDateRange, sortProperty, sortDirection);
    return sortedItems.slice(startIndex, endIndex);
};

export const getCurrentPageItemsMultiple = (ITEMS_PER_PAGE, searchParamsArray, currentPage, items, sortProperty, sortDirection) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const filteredItems = filterMultipleItems(items, searchParamsArray);
    const sortedItems = sortItems(filteredItems, sortProperty, sortDirection);
    return sortedItems.slice(startIndex, endIndex);
};

export const getNumberFiltered = (items, searchTerm, searchType) => {
    const filteredItems = filterItems(items, searchTerm, searchType);
    return filteredItems.length;
};

export const getNumberMultipleFiltered = (items, searchParamsArray) => {
    const filteredItems = filterMultipleItems(items, searchParamsArray);
    return filteredItems.length;
};