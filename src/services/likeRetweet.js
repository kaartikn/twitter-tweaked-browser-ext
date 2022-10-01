import { useFetch } from "../misc/useFetch";

const accessToken = "1546282785752551426-Z6wecftUZNlF5VTqePnYTWlppvz0xT";
const accessTokenSecret = "95W4P9j0tkJJsKYrbGRRh3fXRO1KSwwTTIherhdhS8lBx";
const baseEndpoint = "http://127.0.0.1:8081/";

export function retweet(body, setLoading) {
    return useFetch(
        baseEndpoint + "tweets/retweet", 
        "POST", 
        accessToken, 
        accessTokenSecret, 
        body, 
        setLoading
    );
}

export function unretweet(body, setLoading) {
    return useFetch(
        baseEndpoint + "tweets/unretweet", 
        "POST", 
        accessToken, 
        accessTokenSecret, 
        body, 
        setLoading
    );
}

export function favourite(body, setLoading) {
    return useFetch(
        baseEndpoint + "tweets/favourite", 
        "POST", 
        accessToken, 
        accessTokenSecret, 
        body, 
        setLoading
    );
}

export function unfavourite(body, setLoading) {
    return useFetch(
        baseEndpoint + "tweets/unfavourite", 
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