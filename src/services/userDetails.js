import { useFetch } from "../misc/useFetch";
import { URL_NAME } from "./const";

export function getFollowingIds(accessToken, accessTokenSecret) {
    return useFetch(
        URL_NAME + "following", 
        "GET", 
        accessToken, 
        accessTokenSecret, 
        null, 
        (val) => {} 
    );
}

export function getUserFromUserId(userId) {
    return useFetch(
        URL_NAME + "users?user-id=" + userId,
        "GET",
        null,
        null, 
        null,
        (val) => {} 
    );
}

export function getUserFromUsername(username) {
    return useFetch(
        URL_NAME + "users?username=" + username,
        "GET",
        null, 
        null, 
        null,
        (val) => {} 
    );
}

