import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { displayLoadingAnimation, getAuthorizedDataFromCache, handleViewAllTweets, parseTweetData } from '../../misc/miscFunctions';
import { useEffect, useContext } from 'react';
import { ThemeContext } from '../../popup';
import { useState } from 'react';
import ConversationSearchHeader from './conversationSearchHeader';
import SearchResults from '../search/searchResults';
import HighlightsProfileHeader from '../highlights/highlightProfileHeader';
import { getUserFromUserIdOrUsername } from '../../services/userDetails';
import { getConversationWithUser } from '../../services/advancedSearch';
import { NON_ACCOUNT_URLS } from '../../misc/twitterURLS';

export default function Conversations(props) {
    const {eventKey} = props;

    const [ profileId, setProfileId ] = useState("");
    const [ searched, setSearched ] = useState(false);
    const [ profileData, setProfileData ] = useState(null);
    const [ profileLoading, setProfileLoading ] = useState(false);
    const [ highlightsLoading, setHighlightsLoading ] = useState(false);
    const [ queryData, setQueryData ] = useState(null);
    const [ tweetData, setTweetData ] = useState(null);

    var contextType = useContext(ThemeContext);

    useEffect(() => {

      // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      //   let url = tabs[0].url;
      //   if (isURLAccountURL(url)){
      //     const username = url.split("/")[3];
      //     const profileIdObject = createProfileIdObject(username, false);
      //     setProfileId(profileIdObject);
    
      //   } 

      // });


      chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.url && isURLAccountURL(changeInfo.url) && changeInfo.url.startsWith("https://twitter.com/")){
          const username = changeInfo.url.split("/")[3];
          setProfileId(username);
          setSearched(true);
        }
      });
    }, [])

    useEffect(() => {
      if(searched && profileId != ""){
        getUserFromUserIdOrUsername(profileId, false).then((data) => {
          if (data != "null") {
            setProfileLoading(false);
            const parsedData = JSON.parse(data);
            setProfileData(parsedData);
  
            getAuthorizedDataFromCache().then((authorizedObject) => {
  
              const access_token = authorizedObject['access_token'];
              const access_token_secret = authorizedObject['access_token_secret'];
              const own_username = authorizedObject['username'];
  
              if (!parsedData['protected']) {
                getConversationWithUser(access_token, access_token_secret, setHighlightsLoading, own_username, profileId).then((tweets) => {
                  setQueryData(tweets.query);
                  const parsedTweets = parseTweetData(tweets);
                    setHighlightsLoading(false);
                    setTweetData(parsedTweets);
                    setSearched(false);
                });
              }
            })  
          } else {
            console.log("Failure");
          }
        }, (failed) => {
          console.log(failed);
        });
      }
    }, [searched])

    const handleSearchClick = () => { setSearched(true); }

    function isURLAccountURL(url) {
      return !NON_ACCOUNT_URLS.some(non_account_url => url.startsWith(non_account_url))
    }


    return (
        <>
          <Accordion.Item eventKey={eventKey} style={{backgroundColor: contextType.backgroundColor, color: contextType.textColor}}>
            <Accordion.Header>Conversations</Accordion.Header>
            <Accordion.Body>

            <p style={{fontSize: "0.9em"}} className="mb-2" >View your previous interactions with a user.</p>
            <ConversationSearchHeader props={{"otherUsername": profileId, "setOtherUsername": setProfileId, "handleSearchClick": handleSearchClick}} />

            <hr />

            {
              (profileData == null) ?
              <>
                <p className='protectedAccountMessage'>Tweets will appear here after searching for a username.</p>
              </> :
              profileLoading  ?
              displayLoadingAnimation() :
              <>
                <HighlightsProfileHeader
                  displayName = {profileData['displayname']}
                  verified = {profileData['verified']}
                  protectedAccount = {profileData['protected']}
                  description = {profileData['description']}
                  username = {profileData['username']}
                  profileImageUrl = {profileData['profileImageUrl']}
                  handleShuffleClick={() => {}}
                />
              </>
            }
  
            {

              (profileData == null)  ?
              <>
              </> :
              <>
                <hr id='highlightsSeparator' />
                {
                  (profileData['protected']) ?
                  <p className='protectedAccountMessage'>Cannot display highlighted Tweets for a protected account.</p> :
                  (tweetData == null || highlightsLoading == true) ?
                  <>
                    {displayLoadingAnimation()}
                  </>
                  :
                  <>
                    <SearchResults 
                      tweetData={tweetData}
                      search={false}
                    />
                  {tweetData.length == 0 ?<></>:<><Button variant="link" className='w-100 mt-3 btn-link' onClick={() => handleViewAllTweets(queryData)}> See more </Button></>}
                  </>
                }
              </>
            }

            </Accordion.Body>
          </Accordion.Item>
        </>
    );
}