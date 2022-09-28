import Tweet from "../tweet";

export default function SearchResults(props) {
    const { tweetData } = props;

    return(
        <>
            <Tweet 
                props={tweetData[0]}
            />
        </>
    )
}