import Tweet from "../tweet/tweet";

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
                            return <Tweet props={tweet} key={tweet.id} /> 
                        })
                    }
                </> :
                <p className="text-center mt-2">No results based on your search!</p>
            }
        </>
    )
}