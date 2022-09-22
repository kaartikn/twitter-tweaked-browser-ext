export function doAdvancedSearch() {
    return fetch("http://localhost:8081/search")
        .then(data => data.json())
}