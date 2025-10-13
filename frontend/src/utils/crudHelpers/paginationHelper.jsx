import { filterMultipleItems, sortItems } from "./searchFilter";

export const getCurrentPageItems = (ITEMS_PER_PAGE, currentPage, items) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return items.slice(startIndex, endIndex);
};

export const getCurrentPageItemsSorted = (ITEMS_PER_PAGE, currentPage, items, sortProperty, sortDirection) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const sortedItems = sortItems(items, sortProperty, sortDirection);
    return sortedItems.slice(startIndex, endIndex);
};

export const getCurrentPageItemsMultiple = (ITEMS_PER_PAGE, searchParamsArray, currentPage, items) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const filteredItems = filterMultipleItems(items, searchParamsArray);
    return filteredItems.slice(startIndex, endIndex);
};