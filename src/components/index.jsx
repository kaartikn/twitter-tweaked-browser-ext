import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { getAuthUrl } from "../services/auth";
import Authorized from "./authorized";
import Cookies from 'js-cookie';

export default function Index(props){
    const [ isOauthApproved, setIsOauthApproved ] = useState(false);

    chrome.storage.local.get({ tweakedAuth: null }, function(result){ 

        const parsedAuthArray = result.tweakedAuth;
        console.log(parsedAuthArray);

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