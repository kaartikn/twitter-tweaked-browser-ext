import LanguageMenu from './subcomponents/language_menu';
import Form from 'react-bootstrap/Form';

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
import "./searchForm.css";

export default function SearchForm(props) {

    const { allWords, setAllWords, exactPhrase, setExactPhrase, anyWords, setAnyWords, noneWords, setNoneWords, hashtags, setHashtags, language, setLanguage, fromAccounts, setFromAccounts, toAccounts, setToAccounts, mentioningAccounts, setMentioningAccounts, repliesBool, setRepliesBool, onlyShowReplies, setOnlyShowReplies, linksBool, setLinksBool, onlyShowTweetsWithLinksBool, setOnlyShowTweetsWithLinksBool, minimumReplies, setMinimumReplies, minimumLikes, setMinimumLikes, minimumRetweets, setMinimumRetweets, startMonth, setStartMonth, startDay, setStartDay, startYear, setStartYear, endMonth, setEndMonth, endDay, setEndDay, endYear, setEndYear } = props;

    return (
            <>
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
            </>
    )
}