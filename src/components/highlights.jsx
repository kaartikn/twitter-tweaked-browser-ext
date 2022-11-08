import Accordion from 'react-bootstrap/Accordion';
import { useContext } from 'react';
import { ThemeContext } from '../popup';
import { getAccessTokenFromCache, getCurrentTwidFromCache, getFollowingMapFromCache } from '../misc/miscFunctions';
import { getFollowingIds, getUserFromUserId } from '../services/userDetails';
import { useState } from 'react';
import { useEffect } from 'react';
import "./highlights.css";
import HighlightsProfileHeader from './highlights/highlightProfileHeader';

export default function Highlights(props) {
    const { eventKey } = props;

    var contextType = useContext(ThemeContext);

    const [ accountIdPos, setAccountIdPos ] = useState(0);
    const [ accountIds, setAccountIds ] = useState(null);
    const [ profileId, setProfileId ] = useState(null);
    const [ profileData, setProfileData ] = useState(null);
    const [ profileLoading, setProfileLoading ] = useState(true);
    const [ highlightsLoading, setHighlightsLoading ] = useState(true);

    useEffect(() => {
      cacheFollowing();
    }, [])

    useEffect(() => {
      if(profileId != null){
        getUserFromUserId(profileId).then((data) => {
          setProfileLoading(false)
          setProfileData(JSON.parse(data))
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

    const handleShuffleClick = (e) => {
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

    return (
        <>
      <Accordion.Item eventKey={ eventKey } style={{backgroundColor: contextType.backgroundColor, color: contextType.textColor}} >
        <Accordion.Header>Highlights</Accordion.Header>
        <Accordion.Body>
          {
            (profileData == null && profileLoading == true)  ?
            <>
              <div className='d-flex justify-content-center'>
                  <div className="snippet" data-title=".dot-floating">
                    <div className="stage">
                      <div className="dot-pulse"></div>
                  </div>
                </div>
              </div>            
            </> :
            <HighlightsProfileHeader
              displayName = {profileData['displayname']}
              verified = {profileData['verified']}
              description = {profileData['description']}
              username = {profileData['username']}
              profileImageUrl = {profileData['profileImageUrl']}
              handleShuffleClick={handleShuffleClick}
            />
          }
        </Accordion.Body>
      </Accordion.Item>
        </>
    );
}