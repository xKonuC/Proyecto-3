export const addSearcher = (options, defaultSearchParamsList, searchParamsList, setSearchParamsList) => {
    if (options.length !== searchParamsList.length) {
        setSearchParamsList([...searchParamsList, defaultSearchParamsList]);
    }
};

export const removeSearcher = (index, searchParamsList, setSearchParamsList) => {
    const newList = searchParamsList.filter((_, i) => i !== index);
    setSearchParamsList(newList);
};

export const handleSearchParamsChange = (index, field, value, searchParamsList, setSearchParamsList) => {
    const newList = searchParamsList.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
    );
    setSearchParamsList(newList);
};

export const getFilteredOptions = (currentIndex, options, searchParamsList) => {
    const selectedOptions = searchParamsList.map(item => item.searchType);
    return options.filter(option => !selectedOptions.includes(option.value) || option.value === searchParamsList[currentIndex].searchType);
};