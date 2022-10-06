import { useFetch } from "../misc/useFetch";


export function getAuthUrl(setLoading) {
    return useFetch(
        URL_NAME + "/authURL", 
        "POST", 
        null, 
        null, 
        null, 
        setLoading
    );
}

export function storeCredentialsInBackend(storeCredentialsBody, setLoading) {
    return useFetch(
        URL_NAME + "/auth", 
        "POST", 
        null, 
        null, 
        storeCredentialsBody,
        setLoading
    );
}