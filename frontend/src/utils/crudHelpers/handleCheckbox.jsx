export const handleCheckboxChange = (event, setSelectedItems, idPropertyName, item) => {
    if (event.target.checked) {
        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    } else {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((selectedItem) => selectedItem[idPropertyName] !== item[idPropertyName])
        );
    }
};

export const handleSelectAllChange = (event, setSelectAll, setSelectedItems, items) => {
    setSelectAll(event.target.checked);
    setSelectedItems(event.target.checked ? items : []);
};

export const clearCheckbox = (setSelectedItems, setSelectAll) => {
    setSelectedItems([]);
    setSelectAll(false);
};
