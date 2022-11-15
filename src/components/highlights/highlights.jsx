import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { ThemeContext } from '../../popup';
import { displayLoadingAnimation, getAuthorizedDataFromCache, getCurrentTwidFromCache, getFollowingMapFromCache, handleViewAllTweets, parseTweetData } from '../../misc/miscFunctions';
import { getFollowingIds, getUserFromUserId, getUserFromUserIdOrUsername } from '../../services/userDetails';
import { useState } from 'react';
import { useEffect } from 'react';
import "./highlights.css";
import MainProfileHeader from '../mainProfileHeader';
import { getUsersTopTweets } from '../../services/advancedSearch';
import SearchResults from '../search/searchResults';
import { NON_ACCOUNT_URLS } from '../../misc/twitterURLS';

export default function Highlights(props) {
    const { eventKey } = props;

    var contextType = useContext(ThemeContext);

    const [ currentUser, setCurrentUser ] = useState(null);
    const [ currentTabId, setCurrentTabId ] = useState(null);
    const [ accountIdPos, setAccountIdPos ] = useState(0);
    const [ accountIds, setAccountIds ] = useState(null);
    const [ profileId, setProfileId ] = useState(null);
    const [ profileData, setProfileData ] = useState(null);
    const [ profileLoading, setProfileLoading ] = useState(true);
    const [ highlightsLoading, setHighlightsLoading ] = useState(true);
    const [ queryData, setQueryData ] = useState(null);
    const [ tweetData, setTweetData ] = useState(null);
    const [ backlog, setBacklog ] = useState([]);

    useEffect(() => {

      chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {

        setCurrentTabId(tabs[0]['id']);

        // let url = tabs[0].url;
        // if (isURLAccountURL(url)){
        //   const username = url.split("/")[3];
        //   const profileIdObject = createProfileIdObject(username, false);
        //   setProfileId(profileIdObject);
    
        // } 

      });

    }, [])

    useEffect(() => {
      if (currentTabId != null) {
        initializeAccountIdsPromise().then(() => {
            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {  
              if (tabId == currentTabId && changeInfo.url && isURLAccountURL(changeInfo.url) && changeInfo.url.startsWith("https://twitter.com/")){
                const username = changeInfo.url.split("/")[3];

                checkIfUsernameChanged(username);
              }
            });
          })
        };
    }, [currentTabId])

    function checkIfUsernameChanged(username){
      console.log("function Called");
      console.log(currentUser);
      const previous = currentUser == null ? null : currentUser['current'];
      console.log(previous);
      if (previous != username){
        var usernameObj;
        if (previous == null){
          usernameObj = {"previous": username, "current": username};
        } else {
          usernameObj = {"previous": previous, "current": username};
        }
        console.log(usernameObj);
        setCurrentUser(usernameObj);
      } else { //handling null case
        // if (currentUser == null){
        //   const usernameObj = {"previous": previous, "current": username};
        //   console.log(usernameObj);
        //   setCurrentUser(usernameObj);
        // }
      }
    }

    useEffect(() => {
      if (currentUser != null){
        console.log("in current user effect");
        const profileIdObject = createProfileIdObject(currentUser['current'], false);
        console.log(profileIdObject);
        setProfileId(profileIdObject);
      }
    }, [currentUser])


    useEffect(() => {
      if(profileId != null){
        getUserFromUserIdOrUsername(profileId['profileId'], profileId['isProfileId']).then((data) => {
          setProfileLoading(false);
          const parsedData = JSON.parse(data);
          setProfileData(parsedData);

          getAuthorizedDataFromCache().then((accessTokenObj) => {

            const access_token = accessTokenObj['access_token'];
            const access_token_secret = accessTokenObj['access_token_secret'];

            if (!parsedData['protected']) {
              getUsersTopTweets(access_token, access_token_secret, setHighlightsLoading, parsedData['username']).then((tweets) => {
                setQueryData(tweets.query);
                const parsedTweets = parseTweetData(tweets);
                // backlog.unshift();
                // if(backlog.length == 0 || !profileId['isProfileId']){
                  setHighlightsLoading(false);
                  setTweetData(parsedTweets);
                // } else {
                //   const finalElement = backlog.pop();
                //   setBacklog([finalElement]);
                // }
              });
            }

          })

        });
      }
    }, [profileId])

    // useEffect(() => {
    //   // const profileId = 
    // }, [backlog])

    const initializeAccountIdsPromise = async () => {
      return new Promise((resolve, reject) => {
        resolve(initializeAccountIds());
        reject(null);
      })  
    }    

    function initializeAccountIds() {
      getFollowingMapFromCache().then((followingMap) => {
        getCurrentTwidFromCache().then((currentTwid) => {
            
            const currentData = followingMap[currentTwid];
            if (currentData == null) {

              getAuthorizedDataFromCache().then((accessTokenObj) => {

                const access_token = accessTokenObj['access_token'];
                const access_token_secret = accessTokenObj['access_token_secret'];

                getFollowingIds(access_token, access_token_secret).then((ids) => {
                    const shuffledIds = shuffleIds(ids)
                    setAccountIds(shuffledIds);
                    const profileIdObject = createProfileIdObject(shuffledIds[accountIdPos], true);
                    setProfileId(profileIdObject);
                    followingMap[currentTwid] = shuffledIds;
                    const stringifiedFollowingMap = JSON.stringify(followingMap);
                    chrome.storage.local.set({ followingData: stringifiedFollowingMap }, function () {});
                    return;
                })
              });
            } else {
              const shuffledIds = shuffleIds(currentData)
              setAccountIds(shuffledIds);
              const profileIdObject = createProfileIdObject(shuffledIds[accountIdPos], true);
              setProfileId(profileIdObject);
              return;
            }
        })
      })
      return;
    }

    function createProfileIdObject(profileId, isProfileId) {
      const profileIdObject = {
        "profileId": profileId,
        "isProfileId": isProfileId
      }
      return profileIdObject;
    }

    const handleShuffleClick = () => {

      var newPos = (accountIdPos + 1 < accountIds.length) ? accountIdPos + 1 : 0;
      setAccountIdPos(newPos);
      const profileId = accountIds[newPos];

      // backlog.push(profileId);
      // if(!highlightsLoading){
        setProfileLoading(true);
        setHighlightsLoading(true);
  
        const profileIdObject = createProfileIdObject(profileId, true);
        setProfileId(profileIdObject);
      // }


    }

    function shuffleIds(ids) {
      return ids
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    }

    function isURLAccountURL(url) {
      return !NON_ACCOUNT_URLS.some(non_account_url => url.startsWith(non_account_url))
    }

    return (
        <>
      <Accordion.Item eventKey={ eventKey } style={{backgroundColor: contextType.backgroundColor, color: contextType.textColor}} >
        <Accordion.Header>Highlights</Accordion.Header>
        <Accordion.Body>
          {
            (profileData == null && profileLoading == true)  ?
            displayLoadingAnimation() :
            <>
              <MainProfileHeader
                shuffle = {true}
                displayName = {profileData['displayname']}
                verified = {profileData['verified']}
                protectedAccount = {profileData['protected']}
                description = {profileData['description']}
                username = {profileData['username']}
                profileImageUrl = {profileData['profileImageUrl']}
                handleShuffleClick={handleShuffleClick}
              />
            </>
          }
          {

            (profileData == null && profileLoading == true)  ?
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