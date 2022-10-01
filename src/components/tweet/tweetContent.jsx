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
                if (word.charAt(0) == '@'){
                    return <span className='taggedUser' onClick={handleAccountClick} >{word} </span>;
                } else if (word.charAt(0) == '#') {
                    return <span className='hashtaggedWord'>{word} </span>;
                } else if (word.substring(0, 4) == "http"){
                    return <span className='linkedSite'>{word} </span>;
                } else {
                    return <>{word} </>;
                }
            });
        }
    }

    const handleAccountClick = (e) => {
        // chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        //     var activeTab = tabs[0];
        //     chrome.tabs.sendMessage(activeTab.id, {"redirect": "https://twitter.com/universaluk" + tweetUrl});
        // });
        console.log(e);
        return false;
    } 

    return (
        <>
            <p className="tweetBody" onClick={handleTweetClick}>{contentFinal.map((el)=> {return el})}</p>
        </>
    )
}