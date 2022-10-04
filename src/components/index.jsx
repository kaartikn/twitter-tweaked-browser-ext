import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { getAuthUrl } from "../services/auth";
import Authorized from "./authorized";
import Cookies from 'js-cookie';

export default function Index(props){
    const [ isOauthApproved, setIsOauthApproved ] = useState(false);

    chrome.storage.local.get({ tweakedAuth: null }, function(result){ 

        const auth = JSON.parse(result.tweakedAuth);
        const currentSessionId = auth['currentTwid'];
        const authArray = auth['authArray'];
        for (let index = 0; index < authArray.length; index++) {
            const element = authArray[index];
            if(element['twitter_session_id'] == currentSessionId){
                setIsOauthApproved(true);
                break;
            }
        }
     })

    const handleClick = (e) => {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            getAuthUrl((e) => {}).then((data) => {
                chrome.tabs.sendMessage(activeTab.id, {"redirect": data['payload']});
            });
        });
    }

    return (
        <>
            {
                isOauthApproved ?
                <Authorized /> :
                <Button variant="primary" onClick={handleClick}> Log in here </Button>
            }
        </>
    )

}