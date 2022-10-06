import { useFetch } from "../misc/useFetch";
import { URL_NAME } from "./const";

const accessToken = "1546282785752551426-Z6wecftUZNlF5VTqePnYTWlppvz0xT";
const accessTokenSecret = "95W4P9j0tkJJsKYrbGRRh3fXRO1KSwwTTIherhdhS8lBx";

export function retweet(body, setLoading) {
    return useFetch(
        URL_NAME + "tweets/retweet", 
        "POST", 
        accessToken, 
        accessTokenSecret, 
        body, 
        setLoading
    );
}

export function unretweet(body, setLoading) {
    return useFetch(
        URL_NAME + "tweets/unretweet", 
        "POST", 
        accessToken, 
        accessTokenSecret, 
        body, 
        setLoading
    );
}

export function favourite(body, setLoading) {
    return useFetch(
        URL_NAME + "tweets/favourite", 
        "POST", 
        accessToken, 
        accessTokenSecret, 
        body, 
        setLoading
    );
}

export function unfavourite(body, setLoading) {
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