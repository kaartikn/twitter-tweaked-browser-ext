import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import './search.css'
import { useContext, useState } from 'react';

import { doAdvancedSearch, formatAdvancedSearchBody } from '../../services/advancedSearch';
import SearchForm from './searchForm';
import SearchResults from './searchResults';
import { ThemeContext } from '../../popup';

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
    const [ minimumReplies, setMinimumReplies ] = useState(0);
    const [ minimumLikes, setMinimumLikes ] = useState(0);
    const [ minimumRetweets, setMinimumRetweets ] = useState(0);

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
      const tweets = doAdvancedSearch(advancedSearchBody, setLoading);
      tweets.then(
        (successData) =>{
          setQueryData(successData.query);
          const data = JSON.parse(successData.tweets);
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if(element.media != null){
              element.media = JSON.parse(element.media);
            }
          }
          setTweetData(data);
          setViewTweets(true);
        }, 
        (errorData) => {
          // Handle error
        })
    }

  const handleViewAllTweets = (e) => {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        var formattedSearchQuery = queryData.replaceAll(" ", "%20")
        const redirectUrl = "https://twitter.com/search?q=" + formattedSearchQuery;
        chrome.tabs.sendMessage(activeTab.id, {"redirect": redirectUrl});
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
        setMinimumReplies(0);
        setMinimumLikes(0);
        setMinimumRetweets(0);
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
                <SearchResults tweetData = {tweetData} />
                {tweetData.length == 0 ?<></>:<><Button variant="link" className='w-100 mt-3 btn-link' onClick={handleViewAllTweets} > See Full Results </Button></>}
              </> :
              <>
                <p className='text-justify'>To do a basic search, use the "All of these words" fields. <br /> For an advanced search, use multiple fields. <br/><br/> Hit the "Search" button at end to see the results!</p>
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