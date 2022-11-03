import Accordion from 'react-bootstrap/Accordion';
import { useContext } from 'react';
import { ThemeContext } from '../popup';
import { getAccessTokenFromCache, getCurrentTwidFromCache, getFollowingMapFromCache } from '../misc/miscFunctions';
import { getFollowingIds } from '../services/userDetails';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Highlights(props) {
    const { eventKey } = props;

    var contextType = useContext(ThemeContext);

    const [ accountIds, setAccountIds ] = useState(null);
    const [ profileId, setProfileId ] = useState(null);

    useEffect(() => {
      cacheFollowing();
    }, [])

    useEffect(() => {
      console.log(profileId);
      console.log(accountIds);
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
                    
                    const shuffledIds = ids
                      .map(value => ({ value, sort: Math.random() }))
                      .sort((a, b) => a.sort - b.sort)
                      .map(({ value }) => value) 
                    setAccountIds(shuffledIds);
                    setProfileId(shuffledIds.pop());
                    followingMap[currentTwid] = shuffledIds;
                    const stringifiedFollowingMap = JSON.stringify(followingMap);
                    chrome.storage.local.set({ followingData: stringifiedFollowingMap }, function () {});
                })
              });
            } else {
              console.log("cached")
              const shuffledIds = currentData
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value) 
              setAccountIds(shuffledIds);
              setProfileId(shuffledIds.pop());
            }
        })
    })
    }

    return (
        <>
      <Accordion.Item eventKey={ eventKey } style={{backgroundColor: contextType.backgroundColor, color: contextType.textColor}} >
        <Accordion.Header>Highlights</Accordion.Header>
        <Accordion.Body>
          Coming soon!
        </Accordion.Body>
      </Accordion.Item>
        </>
    );
}