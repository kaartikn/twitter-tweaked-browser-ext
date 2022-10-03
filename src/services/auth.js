import { useFetch } from "../misc/useFetch";


export function getAuthUrl(setLoading) {
    return useFetch(
        "http://127.0.0.1:8081/authURL", 
        "POST", 
        null, 
        null, 
        null, 
        setLoading
    );
}

export function storeCredentials(storeCredentialsBody, setLoading) {
    return useFetch(
        "http://127.0.0.1:8081/auth", 
        "POST", 
        null, 
        null, 
        storeCredentialsBody,
        setLoading
    );
}