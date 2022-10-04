import "./tweetContent.css";
import Image from "react-bootstrap/Image";
import Tweet from "./tweet";

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
            if(media[0]['duration'] == null){
                if (media.length % 2 == 0) {
                    return (
                    <div className="w-100 mt-2 mb-2 d-flex flex-wrap pointer" onClick={handleTweetClick}>
                        {
                            media.map((img) => {
                                return <Image className="col-6 ml-1" src={img['fullUrl']} />
                            })
                        }
                    </div>
                    )
                } 
                if (media.length == 3){
                    return (
                    <div className="w-100 mt-2 mb-2 d-flex pointer" onClick={handleTweetClick}>
                        <Image className="col-6 mr-1" src={media[0]['fullUrl']} />
                        <div className="d-flex flex-column col-6">
                            {
                                media.slice(1).map((img) => {
                                    return <Image className="col-6 ml-1 w-100" src={img['fullUrl']} />
                                })
                            }
                        </div>
                    </div>
                    )
                }

                return <Image className="w-100 mt-2 mb-2 pointer" src={media[0]['fullUrl']} />

            } else {
                return (
                    <div className="embed-responsive embed-responsive-16by9 mt-2 mb-2 w-100">
                        <iframe className="embed-responsive-item w-100" src={media['variants'][1]['url']} allowFullScreen></iframe>
                    </div> 
              )
            }
        }
        return <></>
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

    function handleAccountClick(account) {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"redirect": "https://twitter.com/" + account});
        });
    } 

    function handleHashtagClick(hashtag) {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"redirect": "https://twitter.com/hashtag/" + hashtag});
        });
    }

    function handleLinkClick(link) {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"redirect": link});
        });
    } 

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