
export default function TweetContent(props) {

    const { handleTweetClick, content } = (props);

    return (
        <p className="tweetBody" onClick={handleTweetClick}>{content}</p>
    )
}