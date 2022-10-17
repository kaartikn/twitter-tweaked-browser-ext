import { useFetch } from "../misc/useFetch";
import { URL_NAME } from "./const";

export function retweet(accessToken, accessTokenSecret, body, setLoading) {
    return useFetch(
        URL_NAME + "tweets/retweet", 
        "POST", 
        accessToken, 
        accessTokenSecret, 
        body, 
        setLoading
    );
}

export function unretweet(accessToken, accessTokenSecret, body, setLoading) {
    return useFetch(
        URL_NAME + "tweets/unretweet", 
        "POST", 
        accessToken, 
        accessTokenSecret, 
        body, 
        setLoading
    );
}

export function favourite(accessToken, accessTokenSecret, body, setLoading) {
    return useFetch(
        URL_NAME + "tweets/favourite", 
        "POST", 
        accessToken, 
        accessTokenSecret, 
        body, 
        setLoading
    );
}

export function unfavourite(accessToken, accessTokenSecret, body, setLoading) {
    return useFetch(
        URL_NAME + "tweets/unfavourite", 
        "POST", 
        accessToken, 
        accessTokenSecret, 
        body, 
        setLoading
    );
}

export function formatTweetInteractionBody(tweetId) {
    return {
        id: tweetId
    }
}