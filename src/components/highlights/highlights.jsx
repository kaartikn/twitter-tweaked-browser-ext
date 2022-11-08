import Accordion from 'react-bootstrap/Accordion';
import { useContext } from 'react';
import { ThemeContext } from '../../popup';
import { getAccessTokenFromCache, getCurrentTwidFromCache, getFollowingMapFromCache, parseTweetData } from '../../misc/miscFunctions';
import { getFollowingIds, getUserFromUserId } from '../../services/userDetails';
import { useState } from 'react';
import { useEffect } from 'react';
import "./highlights.css";
import HighlightsProfileHeader from './highlightProfileHeader';
import { getUsersTopTweets } from '../../services/advancedSearch';
import SearchResults from '../search/searchResults';

export default function Highlights(props) {
    const { eventKey } = props;

    var contextType = useContext(ThemeContext);

    const [ accountIdPos, setAccountIdPos ] = useState(0);
    const [ accountIds, setAccountIds ] = useState(null);
    const [ profileId, setProfileId ] = useState(null);
    const [ profileData, setProfileData ] = useState(null);
    const [ profileLoading, setProfileLoading ] = useState(true);
    const [ highlightsLoading, setHighlightsLoading ] = useState(true);
    const [ tweetData, setTweetData ] = useState(null);

    useEffect(() => {
      cacheFollowing();
    }, [])

    useEffect(() => {
      if(profileId != null){
        getUserFromUserId(profileId).then((data) => {
          setProfileLoading(false);
          const parsedData = JSON.parse(data);
          setProfileData(parsedData);

          getAccessTokenFromCache().then((accessTokenObj) => {

            const access_token = accessTokenObj['access_token'];
            const access_token_secret = accessTokenObj['access_token_secret'];

            if (!parsedData['protected']) {
              getUsersTopTweets(access_token, access_token_secret, setHighlightsLoading, parsedData['username']).then((tweets) => {
                console.log(tweets);
                const parsedTweets = parseTweetData(tweets)
                console.log(parsedTweets);
                setHighlightsLoading(false);
                setTweetData(parsedTweets);
              });
            }

          })

        });  
      }
    }, [profileId])

    function cacheFollowing(){

      getFollowingMapFromCache().then((followingMap) => {
        getCurrentTwidFromCache().then((currentTwid) => {
            
            const currentData = followingMap[currentTwid];
            if (currentData == null) {

              getAccessTokenFromCache().then((accessTokenObj) => {

                const access_token = accessTokenObj['access_token'];
                const access_token_secret = accessTokenObj['access_token_secret'];

                getFollowingIds(access_token, access_token_secret).then((ids) => {
                    const shuffledIds = shuffleIds(ids)
                    setAccountIds(shuffledIds);
                    setProfileId(shuffledIds[accountIdPos]);
                    followingMap[currentTwid] = shuffledIds;
                    const stringifiedFollowingMap = JSON.stringify(followingMap);
                    chrome.storage.local.set({ followingData: stringifiedFollowingMap }, function () {});
                })
              });
            } else {
              console.log("cached")
              const shuffledIds = shuffleIds(currentData)
              setAccountIds(shuffledIds);
              setProfileId(shuffledIds[accountIdPos]);
            }
        })
    })
    }

    const handleShuffleClick = () => {
      setProfileLoading(true);
      setHighlightsLoading(true);
      var newPos = (accountIdPos + 1 < accountIds.length) ? accountIdPos + 1 : 0;
      setAccountIdPos(newPos);
      setProfileId(accountIds[newPos]);
    }

    function shuffleIds(ids) {
      return ids
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    }

    function displayLoadingAnimation() {
      return (<div className='d-flex justify-content-center'>
        <div className="snippet" data-title=".dot-floating">
          <div className="stage">
            <div className="dot-pulse"></div>
            </div>
          </div>
        </div>)
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
              <HighlightsProfileHeader
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
                <p className='protectedAccountMessage'>Cannot display highlighted Tweets for protected account.</p> :
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
                </>
              }
            </>
          }
        </Accordion.Body>
      </Accordion.Item>
        </>
    );
}