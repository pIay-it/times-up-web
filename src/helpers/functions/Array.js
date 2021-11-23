export function sortAlphabeticallyByKey(array, key) {
    array.sort((a, b) => {
        const textA = a[key].normalize("NFD").replace(/[\u0300-\u036f]/ug, "");
        const textB = b[key].normalize("NFD").replace(/[\u0300-\u036f]/ug, "");
        if (textA < textB) {
            return -1;
        }
        return textA > textB ? 1 : 0;
    });
}