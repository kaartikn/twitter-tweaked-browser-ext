import "./tweetContent.css";
import Image from "react-bootstrap/Image";
import Tweet from "./tweet";
import { handleAccountClick, handleHashtagClick, handleLinkClick } from "../../misc/miscFunctions";

export default function TweetContent(props) {

    const { handleTweetClick, content, media, quotedTweet, tweetUrl, renderedContent, mentionedUsers, hashtags, tcolinks } = (props);

    var contentFinal = []

    formatParagraph();

    function formatParagraph(){
        const contentArr = content.split(/\s+/);
        contentFinal = contentArr.map((word, index) => {
            const finalWord = word.trim();
            if (finalWord.charAt(0) == '@'){
                return <span key={index} className='taggedUser' onClick={() => handleAccountClick(finalWord)}>{finalWord} </span>;
            } else if (finalWord.charAt(0) == '#') {
                return <span key={index} className='hashtaggedfinalWord' onClick={() => handleHashtagClick(finalWord)}>{finalWord} </span>;
            } else if (finalWord.substring(0, 4) == "http"){
                return <span key={index} onClick={() => handleLinkClick(finalWord)} className='linkedSite'>{finalWord} </span>;
            } else {
                return <span key={index} onClick={handleTweetClick}>{finalWord} </span>;
            }
        });
    }

    function formatMedia(){
        if (media != null){
            if (media.length % 2 == 0) {
                return (
                <div className="w-100 mt-2 mb-2 d-flex flex-wrap pointer mediaHeight" onClick={handleTweetClick}>
                    {
                        media.map((mediaElement) => {
                            return formatMediaType(mediaElement, "col-6")
                        })
                    }
                </div>
                )
            } 
            if (media.length == 3){
                return (
                <div className="w-100 mt-2 mb-2 d-flex pointer mediaHeight" onClick={handleTweetClick}>
                    {
                        formatMediaType(media[0], "col-6")
                    }
                    <div className="d-flex flex-column col-6">
                        {
                            media.slice(1).map((mediaElement) => {
                                return formatMediaType(mediaElement, "col-11")
                            })
                        }
                    </div>
                </div>
                )
            } 

            return formatMediaType(media[0], "col-6", true)
        }
        return <></>
    }

    function formatMediaType(media, colLength, single = false){
        if (media['duration'] == null){
            if (!single) {
                const classes = "mt-2 mb-2 pointer " + colLength;
                return <Image className={classes} src={media['fullUrl']} key={media['fullUrl']} />
            } else {
                return <Image className="w-100" src={media['fullUrl']} key={media['fullUrl']} />
            }
        } else {
            var classes = "mt-2 mb-2 " + colLength;
            const longVideo = media['variants'].find((variant) => variant['bitrate'] == 950000);
            if (longVideo != null && longVideo != undefined){
                if (single) {
                    classes += " w-100 longVideo"
                    return (<div className={classes}>
                        <iframe className="h-100 w-100" src={longVideo['url']} allowFullScreen></iframe>
                    </div>)
                } else {
                    return (<div className={classes}>
                        <iframe className="h-100 w-100" src={longVideo['url']} allowFullScreen></iframe>
                    </div>)
                }
            } else {
                const availableVideo = media['variants'].find((variant) => variant['bitrate'] != null);
                if(single) {
                    classes += " w-100"
                    return (<div className={classes}>
                        <iframe className="h-100 w-100" src={availableVideo['url']} allowFullScreen></iframe>
                    </div>)
                } else {
                    return (<div className={classes}>
                        <iframe className="h-100 w-100" src={availableVideo['url']} allowFullScreen></iframe>
                    </div>)
                }

            }
        }
    }

    function formatQuotedTweet(){
        if(quotedTweet!= null){
            const formattedQuoteTweet = {
                "tweetUrl": tweetUrl,
                "date": quotedTweet['date'],
                "content": quotedTweet['content'],
                "renderedContent": quotedTweet['renderedContent'],
                "replyCount": quotedTweet['replyCount'],
                "retweetCount": quotedTweet['retweetCount'],
                "likeCount": quotedTweet['likeCount'],
                "quoteCount": quotedTweet['quoteCount'],
                "media": quotedTweet['media'],
                "quotedTweet": null,
                "id": quotedTweet['id'], 
                "mentionedUsers": quotedTweet['mentionedUsers'], 
                "hashtags": quotedTweet['hashtags'],
                "tcolinks": quotedTweet['tcolinks'],
                "favorited": null,
                "retweeted": null,
                "username": quotedTweet['user']['username'],
                "displayName": quotedTweet['user']['displayname'],
                "verified": quotedTweet['user']['verified'],
                "profileImageUrl": quotedTweet['user']['profileImageUrl'],
                "profileUrl": quotedTweet['user']['linkUrl'],
                "isQuotedTweet": true
            }
            return <Tweet props={formattedQuoteTweet} />
        }
        return <></>
    }

    formatQuotedTweet();

    return (
        <>
            <p className="tweetBody">{contentFinal}</p>
            {
                formatMedia()
            }
            {
                formatQuotedTweet()
            }
        </>
    )
}