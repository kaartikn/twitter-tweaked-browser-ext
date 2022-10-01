import { useState } from "react";
import Image from "react-bootstrap/Image";
import { favourite, formatTweetInteractionBody, retweet, unfavourite, unretweet } from "../../services/likeRetweet";
import RetweetOverlay from "./retweetOverlay";
import "./tweet.css";

export default function Tweet({props: {tweetUrl, date, content, renderedContent, replyCount, retweetCount, likeCount, quoteCount, media, quotedTweet, id, mentionedUsers, hashtags, favorited, retweeted, username, displayName, verified, profileImageUrl, profileUrl}}) {

    const [ retweetCountState, setRetweetCount ] = useState(retweetCount);
    const [ likeCountState, setLikeCount ] =  useState(likeCount);
    const [ selfLiked, setSelfLiked ] = useState(favorited);
    const [ selfRetweet, setSelfRetweet ] = useState(retweeted);
    const [ loading, setLoading ] = useState(false);

    const handleProfileClick = (e) => {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"redirect": "https://twitter.com/" + username});
        });
    } 

    const handleTweetClick = (e) => {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"redirect": tweetUrl});
        });
    } 

    const handleQuoteTweetClick = (e) => {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"redirect": "https://twitter.com/intent/tweet?url=" + tweetUrl});
        });
    }

    const handleLikeClick = (e) => {
        setSelfLiked(!selfLiked);
        if (!selfLiked) {
            favourite(formatTweetInteractionBody(id), setLoading);
            setLikeCount(likeCountState + 1);
        }else{
            unfavourite(formatTweetInteractionBody(id), setLoading);
            setLikeCount(likeCountState - 1);
        }
    }

    const handleRetweetClick = (e) => {
        setSelfRetweet(!selfRetweet);
        document.body.click(); // to close the retweet overlay
        if (!selfRetweet) {
            retweet(formatTweetInteractionBody(id), setLoading);
            setRetweetCount(retweetCountState + 1)
        } else { 
            unretweet(formatTweetInteractionBody(id), setLoading);
            setRetweetCount(retweetCountState - 1)
        };
    }


    function round(n, precision) {
        var prec = Math.pow(10, precision);
        return Math.round(n*prec)/prec;
    }
    
    function formatCount(n) {
        var pow = Math.pow, floor = Math.floor, abs = Math.abs, log = Math.log;
        var abbrev = 'kmb'; // could be an array of strings: [' m', ' Mo', ' Md']
        var base = floor(log(abs(n))/log(1000));
        var suffix = abbrev[Math.min(2, base - 1)];
        base = abbrev.indexOf(suffix) + 1;
        return suffix ? round(n/pow(1000,base),2)+suffix : ''+n;
    }

    function getTweetDate(){
        const tweetDate = new Date(date); // Returns date with day, eg: "Thu September 29 2022"
        const dateWithoutDay = tweetDate.toDateString().substring(4);
        if (tweetDate.getDate() > 9){
            return dateWithoutDay.slice(0, 6) + "," + dateWithoutDay.slice(6);
        }
        return dateWithoutDay.slice(0, 4) + dateWithoutDay.slice(5, 6) + "," + dateWithoutDay.slice(6);
    }

    function handleCopy() {

            navigator.clipboard.write([
                new ClipboardItem({
                    "text/plain": new Blob([tweetUrl], {
                        type: "text/plain",
                    }),
                }),
            ]).then(() => {
                // Alert the user that the action took place.
                // Nobody likes hidden stuff being done under the hood!
                document.getElementById(tweetUrl).innerText = "copied";
            });

    }

    return (
        <>
            <hr />
            <div className="d-flex">
                <div>
                    <Image
                        onClick={handleProfileClick}
                        className="profile-image mt-2"
                        src={profileImageUrl}
                    />
                </div>
                <div className="d-flex flex-column name-container w-100">
                    <div>
                        <p className="d-inline displayName" onClick={handleProfileClick}>{displayName}</p>
                        {
                            verified ? 
                            <svg className="verified d-inline" onClick={handleProfileClick} viewBox="0 0 24 24" aria-label="Verified account" role="img"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg> :
                            <></>
                        }
                        <p className="d-inline tweetDate">{getTweetDate()}</p>
                    </div>
                    <div className="username">
                        <p className="d-inline" onClick={handleProfileClick}>@{username}</p>
                    </div>
                    <div className="d-block">
                        <div className="nameContainer d-flex-column">
                            <p className="tweetBody" onClick={handleTweetClick}>{content}</p>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex actionReply" onClick={handleTweetClick}>
                                    <svg viewBox="0 0 24 24" fill="red" aria-hidden="true" className="tweetAction actionReply"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                                    <p className="actionText">{formatCount(replyCount)}</p>
                                </div>
                                <RetweetOverlay 
                                    handleRetweetClick = {handleRetweetClick} 
                                    selfRetweet = {selfRetweet} 
                                    formatCount = {formatCount} 
                                    retweetCountState = {retweetCountState}
                                    handleQuoteTweetClick = {handleQuoteTweetClick}
                                />
                                <div className="d-flex" onClick={handleLikeClick}>
                                    {
                                        selfLiked ?
                                        <>
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className="tweetAction actionFavourite"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path></g></svg>
                                            <p className="actionText likedText">{formatCount(likeCountState)}</p>
                                        </>  :
                                        <>
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className="tweetAction"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                                            <p className="actionText">{formatCount(likeCountState)}</p>
                                        </>
                                    }
                                </div>
                                <div className="d-flex" onClick={handleCopy}>
                                    <svg viewBox="0 0 24 24" className="tweetAction"><g><path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path><path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path></g></svg>
                                    <p className="actionText" id={id}>link</p>                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}