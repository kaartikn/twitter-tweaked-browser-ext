import Tweet from "../tweet/tweet";

export default function SearchResults(props) {
    const { tweetData, search } = props;
    const tweetsLength = tweetData.length;

    return(
        <>
            {
                (tweetsLength != 0) ?
                <>
                    {
                        search? 
                        <hr />:
                        <></>
                    }
                    { 
                        tweetData.map((tweet) => {
                            return <Tweet props={tweet} key={tweet.id} /> 
                        })
                    }
                </> :
                <p className="text-center mt-2" style={{fontSize: "0.8em"}}>No results!</p>
            }
        </>
    )
}