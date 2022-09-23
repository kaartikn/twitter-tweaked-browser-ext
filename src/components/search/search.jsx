import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LanguageMenu from './subcomponents/language_menu';
import './search.css'
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import AllWords from './subcomponents/allWords';
import ExactPhrase from './subcomponents/exactPhrase';
import AnyWords from './subcomponents/anyWords';
import NoneWords from './subcomponents/noneWords';
import HashtagWords from './subcomponents/hashtags';
import FromAccounts from './subcomponents/fromAccounts';
import ToAccounts from './subcomponents/toAccounts';
import MentioningAccounts from './subcomponents/mentioningAccounts';
import MinimumReplies from './subcomponents/minimumReplies';
import MinimumLikes from './subcomponents/minimumLikes';
import MinimumRetweets from './subcomponents/minimumRetweets';
import Replies from './subcomponents/replies';
import Links from './subcomponents/links';
import StartDate from './subcomponents/startDate';
import EndDate from './subcomponents/endDate';
import { doAdvancedSearch, formatAdvancedSearchBody } from '../../services/advancedSearch';

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

    const handleClick = (e) => {
      const advancedSearchBody = formatAdvancedSearchBody(allWords, exactPhrase, anyWords, noneWords, hashtags, fromAccounts, toAccounts, mentioningAccounts, minimumReplies, minimumLikes, minimumRetweets, language, startDay, startMonth, startYear, endDay, endMonth, endYear, repliesBool, onlyShowReplies, linksBool, onlyShowTweetsWithLinksBool);
      doAdvancedSearch(advancedSearchBody, setLoading);
    } 

    return (
        <>
      <Accordion.Item eventKey={ eventKey }>
        <Accordion.Header>Search</Accordion.Header>
        <Accordion.Body>
            {/* Once results appear, offer the user the ability to search again */}
            {/* Swap main advanced search component for the results */}

            <Button disabled={loading} className='w-100' onClick={handleClick}> 
                Search
            </Button>

            <hr />

            <h5>Words</h5>
            <Form>

              <AllWords props = {{"allWords": allWords, "setAllWords": setAllWords}} />
              <ExactPhrase props = {{"exactPhrase": exactPhrase, "setExactPhrase": setExactPhrase}} />
              <AnyWords props = {{"anyWords": anyWords, "setAnyWords": setAnyWords}} />
              <NoneWords props = {{"noneWords": noneWords, "setNoneWords": setNoneWords}} />
              <HashtagWords props = {{"hashtags": hashtags, "setHashtags": setHashtags}} />
              <LanguageMenu props = {{"language": language, "setLanguage": setLanguage}} />

              <hr />

              <h5>Accounts</h5>

              <FromAccounts props = {{"fromAccounts": fromAccounts, "setFromAccounts": setFromAccounts}} />
              <ToAccounts props = {{"toAccounts": toAccounts, "setToAccounts": setToAccounts}} />
              <MentioningAccounts props = {{"mentioningAccounts": mentioningAccounts, "setMentioningAccounts": setMentioningAccounts}} />

              <hr />

              <h5>Filters</h5>

              <Replies props = {{"repliesBool": repliesBool, "setRepliesBool": setRepliesBool, "onlyShowReplies": onlyShowReplies, "setOnlyShowReplies": setOnlyShowReplies}} />
              <hr />
              <Links props = {{"linksBool": linksBool, "setLinksBool": setLinksBool, "onlyShowTweetsWithLinksBool": onlyShowTweetsWithLinksBool, "setOnlyShowTweetsWithLinksBool": setOnlyShowTweetsWithLinksBool}} />
              <hr />

              <h5>Engagement</h5>

              <MinimumReplies props = {{"minimumReplies": minimumReplies, "setMinimumReplies": setMinimumReplies}} />          
              <MinimumLikes props = {{"minimumLikes": minimumLikes, "setMinimumLikes": setMinimumLikes}} />          
              <MinimumRetweets props = {{"minimumRetweets": minimumRetweets, "setMinimumRetweets": setMinimumRetweets}} /> 

              <hr/>

              <h5>Dates</h5>
              <StartDate props = {{"startMonth": startMonth, "setStartMonth": setStartMonth, "startDay": startDay, "setStartDay": setStartDay, "startYear": startYear, "setStartYear": setStartYear}} />
              <EndDate props = {{"endMonth": endMonth, "setEndMonth": setEndMonth, "endDay": endDay, "setEndDay": setEndDay, "endYear": endYear, "setEndYear": setEndYear}} />

              <hr />

            </Form>
        </Accordion.Body>
      </Accordion.Item>
        </>
    );
}