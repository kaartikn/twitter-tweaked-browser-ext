import "./tweetContent.css";

export default function TweetContent(props) {

    const { handleTweetClick, content, renderedContent, mentionedUsers, hashtags, tcolinks } = (props);

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