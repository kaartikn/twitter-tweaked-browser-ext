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

export function getUserFromUserIdOrUsername(userId, isUserId){
    if (isUserId){
        return getUserFromUserId(userId);
    } else {
        return getUserFromUsername(userId);
    }
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

export function getUsernameForUser(accessToken, accessTokenSecret){
    return useFetch(
        URL_NAME + "user",
        "GET",
        accessToken,
        accessTokenSecret,
        () => {}
    )
}
