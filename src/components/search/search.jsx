import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import './search.css'
import { useContext, useState } from 'react';

import { doAdvancedSearch, formatAdvancedSearchBody } from '../../services/advancedSearch';
import SearchForm from './searchForm';
import SearchResults from './searchResults';
import { ThemeContext } from '../../popup';
import { data } from 'autoprefixer';
import { getAuthorizedDataFromCache, handleViewAllTweets, parseTweetData } from '../../misc/miscFunctions';

export default function Search(props) {

    const { eventKey } = props;

    const [ allWords, setAllWords ] = useState("");
    const [ exactPhrase, setExactPhrase ] = useState("");
    const [ anyWords, setAnyWords ] = useState("");
    const [ noneWords, setNoneWords ] = useState("");
    const [ hashtags, setHashtags ] = useState("");
    const [ language, setLanguage ] = useState("");
    const [ fromAccounts, setFromAccounts ] = useState("");
    const [ toAccounts, setToAccounts ] = useState("");
    const [ mentioningAccounts, setMentioningAccounts ] = useState("");
    const [ repliesBool, setRepliesBool ] = useState(true);
    const [ onlyShowReplies, setOnlyShowReplies ] = useState(false);
    const [ linksBool, setLinksBool ] = useState(true);
    const [ onlyShowTweetsWithLinksBool, setOnlyShowTweetsWithLinksBool ] = useState(false);
    const [ minimumReplies, setMinimumReplies ] = useState("");
    const [ minimumLikes, setMinimumLikes ] = useState("");
    const [ minimumRetweets, setMinimumRetweets ] = useState("");

    const [ startMonth, setStartMonth ] = useState("Month");
    const [ startDay, setStartDay ] = useState("Day");
    const [ startYear, setStartYear ] = useState("Year");

    const [ endMonth, setEndMonth ] = useState("Month");
    const [ endDay, setEndDay ] = useState("Day");
    const [ endYear, setEndYear ] = useState("Year");

    const [ loading, setLoading ] = useState(false);
    const [ tweetData, setTweetData ] = useState(null);
    const [ queryData, setQueryData ] = useState(null);
    const [ viewTweets, setViewTweets ] = useState(false);

    const handleSearch = (e) => {
      const advancedSearchBody = formatAdvancedSearchBody(allWords, exactPhrase, anyWords, noneWords, hashtags, fromAccounts, toAccounts, mentioningAccounts, minimumReplies, minimumLikes, minimumRetweets, language, startDay, startMonth, startYear, endDay, endMonth, endYear, repliesBool, onlyShowReplies, linksBool, onlyShowTweetsWithLinksBool);
      getAuthorizedDataFromCache().then((accessTokenObj) => {
          const accessToken = accessTokenObj['access_token'];
          const accessTokenSecret = accessTokenObj['access_token_secret'];
          doAdvancedSearch(accessToken, accessTokenSecret, advancedSearchBody, setLoading).then(
            (successData) =>{
              setQueryData(successData.query);
              const data = parseTweetData(successData);
              setTweetData(data);
              setViewTweets(true);
            }, 
            (errorData) => {
              // Handle error
            })
      });
    }

    const clearSearchQueries = (e) => {
        setAllWords("");
        setExactPhrase("");
        setAnyWords("");
        setNoneWords("");
        setHashtags("");
        setLanguage("");
        setFromAccounts("");
        setToAccounts("");
        setMentioningAccounts("");
        setRepliesBool(true);
        setOnlyShowReplies(false);
        setLinksBool(true);
        setOnlyShowTweetsWithLinksBool(false);
        setMinimumReplies("");
        setMinimumLikes("");
        setMinimumRetweets("");
        setStartMonth("Month");
        setStartDay("Day");
        setStartYear("Year");
        setEndMonth("Month");
        setEndDay("Day");
        setEndYear("Year");
    }

    var contextType = useContext(ThemeContext);
    return (
        <>
      <Accordion.Item eventKey={ eventKey } style={{backgroundColor: contextType.backgroundColor, color: contextType.textColor}}>
        <Accordion.Header className='text-white'>Search</Accordion.Header>
        <Accordion.Body  >
            {
              viewTweets ?
              <>
                <Button variant="link" className='w-100 mt-1' onClick={() => setViewTweets(false)}>Search Again</Button>
                <SearchResults tweetData = {tweetData} search={true} />
                {tweetData.length == 0 ?<></>:<><Button variant="link" className='w-100 mt-3 btn-link' onClick={() => handleViewAllTweets(queryData)} > See Full Results </Button></>}
              </> :
              <>
                <p className='text-justify'>To do a basic search, use the "All of these words" field alone. <br /> For a detailed search, use multiple fields. <br/><br/> Hit the "Search" button at the end to view the results!</p>
                <br/>
                <p style={{fontSize: "0.9em"}}><i>Note: searching takes ~ 5 seconds.</i></p>
                {/* <Button variant="link" className='w-100' onClick={clearSearchQueries}>Reset Search Fields</Button> */}
                <SearchForm allWords = {allWords} setAllWords = {setAllWords} exactPhrase = {exactPhrase} setExactPhrase = {setExactPhrase} anyWords = {anyWords} setAnyWords = {setAnyWords} noneWords = {noneWords}  setNoneWords = {setNoneWords}  hashtags = {hashtags} setHashtags = {setHashtags} language = {language} setLanguage = {setLanguage} fromAccounts = {fromAccounts} setFromAccounts = {setFromAccounts} toAccounts = {toAccounts} setToAccounts = {setToAccounts} mentioningAccounts = {mentioningAccounts} setMentioningAccounts = {setMentioningAccounts}  repliesBool = {repliesBool} setRepliesBool = {setRepliesBool} onlyShowReplies = {onlyShowReplies} setOnlyShowReplies = {setOnlyShowReplies} linksBool = {linksBool} setLinksBool = {setLinksBool} onlyShowTweetsWithLinksBool = {onlyShowTweetsWithLinksBool} setOnlyShowTweetsWithLinksBool = {setOnlyShowTweetsWithLinksBool} minimumReplies = {minimumReplies} setMinimumReplies = {setMinimumReplies} minimumLikes = {minimumLikes} setMinimumLikes = {setMinimumLikes}  minimumRetweets = {minimumRetweets} setMinimumRetweets = {setMinimumRetweets} startMonth = {startMonth} setStartMonth = {setStartMonth} startDay = {startDay} setStartDay = {setStartDay} startYear = {startYear} setStartYear = {setStartYear} endMonth = {endMonth} setEndMonth = {setEndMonth} endDay = {endDay} setEndDay = {setEndDay} endYear = {endYear} setEndYear = {setEndYear} />
                <Button  disabled={loading} className='w-100 standard-button mb-1' onClick={handleSearch}> {loading?<>Searching</> :<>Search</>}</Button>
              </>
            }



        </Accordion.Body>
      </Accordion.Item>
        </>
    );
}