import "./tweetContent.css";

export default function TweetContent(props) {

    const { handleTweetClick, content, renderedContent, mentionedUsers, hashtags, tcolinks } = (props);

    var mentionedUsersFinal = []
    var hashtagsFinal = []
    var tcolinksFinal = []
    var highlightedContent = [];
    var contentFinal = []

    cleanContent();
    formatParagraph();

    function cleanContent(){
        if(mentionedUsers != null) mentionedUsersFinal = mentionedUsers.map((user) => user.username);
        if(hashtags != null) hashtagsFinal = hashtags;
        if(tcolinks != null) tcolinksFinal = tcolinks;
        highlightedContent = mentionedUsersFinal.concat(hashtagsFinal, tcolinksFinal);
    }

    function formatParagraph(){
        if (highlightedContent.length != 0){
            const contentArr = content.split(" ");
            contentFinal = contentArr.map((word) => {
                const finalWord = word.trim();
                if (finalWord.charAt(0) == '@'){
                    return <span key={finalWord} className='taggedUser' onClick={() => handleAccountClick(finalWord)}>{finalWord} </span>;
                } else if (finalWord.charAt(0) == '#') {
                    return <span key={finalWord} className='hashtaggedfinalWord' onClick={() => handleHashtagClick(finalWord)}>{finalWord} </span>;
                } else if (finalWord.substring(0, 4) == "http"){
                    return <span key={finalWord} onClick={() =>handleLinkClick(finalWord)} className='linkedSite'>{finalWord} </span>;
                } else {
                    return <span key={finalWord} onClick={handleTweetClick}>{finalWord} </span>;
                }
            });
        }
    }

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
        </>
    )
}