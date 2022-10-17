import { useState } from "react";
import { getAuthUrl } from "../services/auth";
import Authorized from "./authorized";
import Unauthorized from "./unauthorized";

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
                const requestToken = data['payload']['request_token'];
                const requestSecret = data['payload']['request_secret'];
                const requestCredentials = {
                    "requestToken": requestToken,
                    "requestSecret": requestSecret
                }
                const requestCredentialsStringified = JSON.stringify(requestCredentials);
                chrome.storage.local.set({ requestCredentials: requestCredentialsStringified });
               
                chrome.tabs.sendMessage(activeTab.id, {"redirect": data['payload']['auth_url']});
            });
        });
    }

    return (
        <>
            {
                isOauthApproved ?
                <Authorized /> :
                <Unauthorized handleClick={handleClick} />
            }
        </>
    )

}