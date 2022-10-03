import { useState } from "react";
import Image from "react-bootstrap/Image";
import { favourite, formatTweetInteractionBody, retweet, unfavourite, unretweet } from "../../services/likeRetweet";
import RetweetButton from "./retweetButton";
import LikeButton from "./likeButton";
import "./tweet.css";
import CopyButton from "./copyButton";
import ReplyButton from "./replyButton";
import ProfileHeader from "./profileHeader";
import TweetContent from "./tweetContent";

export default function Tweet({props: { tweetUrl, date, content, renderedContent, replyCount, retweetCount, likeCount, quoteCount, media, quotedTweet, id, mentionedUsers, hashtags, tcolinks, favorited, retweeted, username, displayName, verified, profileImageUrl, profileUrl, isQuotedTweet }}) {

    const [ retweetCountState, setRetweetCount ] = useState(retweetCount + quoteCount);
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
        document.body.click(); // to close the retweet overlay
        setSelfRetweet(!selfRetweet);
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
                document.getElementById(id).innerText = "copied";
            });

    }

    function formatTweetUI() {

        if(isQuotedTweet) {
            // Look into specified rule to solve this
            return (<div className="my-3" style={{borderRadius: "0.375em", border: "1px solid rgb(56, 68, 77)", padding: "0.4em"}} >  { tweet() } </div>)
        }

        return (<> <hr /> { tweet() }</> )

    }

    function tweet() { 
        return (<div className="d-flex">
            <div>
                <Image
                    onClick={handleProfileClick}
                    className="profile-image mt-2"
                    src={profileImageUrl}
                />
            </div>
            <div className="d-flex flex-column body-container w-100">
                <ProfileHeader
                    handleProfileClick = {handleProfileClick} 
                    displayName = {displayName} 
                    verified = {verified} 
                    getTweetDate = {getTweetDate} 
                    username = {username}
                />
                <div className="d-block">
                    <div className="d-flex-column">
                        <TweetContent 
                            handleTweetClick = {handleTweetClick}
                            content = {content}
                            media = {media}
                            quotedTweet = {quotedTweet}
                            tweetUrl = {tweetUrl}
                            renderedContent = {renderedContent}
                            mentionedUsers = {mentionedUsers}
                            hashtags = {hashtags}
                            tcolinks = {tcolinks}
                        />
                        {
                            isQuotedTweet ?
                            <></> :
                            <div className="d-flex justify-content-between">
                                <ReplyButton
                                    handleTweetClick = { handleTweetClick }
                                    formatCount = { formatCount } 
                                    replyCount = { replyCount }
                                />
                                <RetweetButton 
                                    handleRetweetClick = {handleRetweetClick} 
                                    selfRetweet = {selfRetweet} 
                                    formatCount = {formatCount} 
                                    retweetCountState = {retweetCountState}
                                    handleQuoteTweetClick = {handleQuoteTweetClick}
                                />
                                <LikeButton 
                                    handleLikeClick = {handleLikeClick} 
                                    selfLiked = {selfLiked} 
                                    likeCountState = {likeCountState}
                                    formatCount = {formatCount}
                                />

                                <CopyButton
                                    handleCopy = {handleCopy}
                                    id = {id}
                                />
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>)
    }

    return (
        <>
            {
                formatTweetUI()
            }
        </>
    )
}