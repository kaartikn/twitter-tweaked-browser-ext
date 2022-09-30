import Tweet from "../tweet";

export default function SearchResults(props) {
    const { tweetData } = props;
    const tweetsLength = tweetData.length;
    return(
        <>
            {
                (tweetsLength != 0) ?
                <>
                    { 
                        tweetData.map((tweet) => {
                            return <Tweet props={tweet} key={tweet.tweetUrl} /> 
                        })
                    }
                </> :
                <p>No results here!</p>
            }
        </>
    )
}