import { useEffect } from "react";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import "./tweet.css";

export default function Tweet({props: {tweetUrl, date, content, renderedContent, replyCount, retweetCount, likeCount, quoteCount, media, quotedTweet, username, displayName, verified, profileImageUrl, profileUrl}}) {

    const [ retweetCountState, setRetweetCount ] = useState(retweetCount);
    const [ likeCountState, setLikeCount ] =  useState(likeCount);
    const [ selfLiked, setSelfLiked ] = useState(false);
    const [ selfRetweet, setSelfRetweet ] = useState(false);

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

    const handleLikeClick = (e) => {
        setSelfLiked(!selfLiked);
        // Make API call to like to switch like property of tweet -- below just mimics logic of that
        if (!selfLiked) setLikeCount(likeCountState + 1);
        else setLikeCount(likeCountState - 1);
    }

    const handleRetweetClick = (e) => {
        setSelfRetweet(!selfRetweet);
        // Make API call to like to switch retweet property of tweet -- below just mimics logic of that
        if (!selfRetweet) setRetweetCount(retweetCountState + 1);
        else setRetweetCount(retweetCountState - 1);
    }


    function round(n, precision) {
        var prec = Math.pow(10, precision);
        return Math.round(n*prec)/prec;
    }
    
    function format(n) {
        var pow = Math.pow, floor = Math.floor, abs = Math.abs, log = Math.log;
        var abbrev = 'kmb'; // could be an array of strings: [' m', ' Mo', ' Md']
        var base = floor(log(abs(n))/log(1000));
        var suffix = abbrev[Math.min(2, base - 1)];
        base = abbrev.indexOf(suffix) + 1;
        return suffix ? round(n/pow(1000,base),2)+suffix : ''+n;
    }

    return (
        <>
            <div className="d-flex">
                <Image
                    onClick={handleProfileClick}
                    className="col-3 profile-image"
                    src={profileImageUrl}
                />
                <div className="col-9 d-flex flex-column name-container">
                    <div>
                        <p className="d-inline displayName" onClick={handleProfileClick}>{displayName}</p>
                        {
                            verified ? 
                            <svg className="verified" onClick={handleProfileClick} viewBox="0 0 24 24" aria-label="Verified account" role="img"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg> :
                            <></>
                        }
                    </div>
                    <div className="username">
                        <p className="d-inline" onClick={handleProfileClick}>@{username}</p>
                    </div>
                </div>
            </div>
            <div className="d-inline-block bodyContainer">
                <div className="nameContainer d-flex-column">
                    <p className="tweetBody" onClick={handleTweetClick}>{content}</p>
                    <div className="d-flex">
                        <div className="d-flex actionReply">
                            <svg viewBox="0 0 24 24" fill="red" aria-hidden="true" className="tweetAction actionReply"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                            <p className="actionText">{format(replyCount)}</p>
                        </div>
                        <div className="d-flex actionRetweet" onClick={handleRetweetClick}>
                            {
                                selfRetweet ? //Replace this with a state holding the prop value of selfRetweeted once backend configured to return this.
                                <>
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="tweetAction actionRetweet"><g><path d="M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.773 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z"></path></g></svg> 
                                    <p className="actionText retweetedText">{format(retweetCountState)}</p>
                                </> :
                                <>
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="tweetAction"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
                                    <p className="actionText">{format(retweetCountState)}</p>
                                </>
                            }
                        </div>
                        <div className="d-flex actionFavourite" onClick={handleLikeClick}>
                            {
                                selfLiked ? //Replace this with a state holding the prop value of selfFavourited once backend configured to return this.
                                <>
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="tweetAction actionFavourite"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path></g></svg>
                                    <p className="actionText likedText">{format(likeCountState)}</p>
                                </>  :
                                <>
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="tweetAction"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                                    <p className="actionText">{format(likeCountState)}</p>
                                </>
                            }
                        </div>
                    </div>

                </div>
            </div>

            
        </>
    )
}