export function doAdvancedSearch() {
    return fetch("http://localhost:8081/search")
        .then(data => data.json())
}

export function splitStringToArr(str){
    return str.trim().split(/\s+/);
}

export function removeAtFromString(str){
    return str.replace(/@/g, '');
}