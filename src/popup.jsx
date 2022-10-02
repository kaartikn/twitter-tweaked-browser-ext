import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import MyDropdown from "./components/accordions";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "react-bootstrap/Image";
import { useEffect, createContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import "./popup.css"

export const ThemeContext = createContext(null)

function Popup() {

    const [isTwitterTweakedVisible, setIsTwitterTweakedVisible] = useState(false);
    const [bgColor, setBgColor] = useState(null);
    const [textColor, setTextColor] = useState(null);
    const [isStyleUpdated, setIsStyleUpdated] = useState(null);

    useEffect(() => {
        chrome.storage.local.get("isTwitterTweakedVisible", function(result){
            setIsTwitterTweakedVisible(result.isTwitterTweakedVisible);
        })
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message == "toggle") {
                chrome.storage.local.get("isTwitterTweakedVisible", function(result){
                    setIsTwitterTweakedVisible(!result.isTwitterTweakedVisible);
                })        
            }
        });
    }, [])

    chrome.storage.local.get("backgroundColor", function(result){
        setBgColor(result.backgroundColor);
        const color = (result.backgroundColor == "rgb(255, 255, 255)") ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";
        setTextColor(color);
        setIsStyleUpdated(true);
    });

    const handleClick = (e) => {
        setIsTwitterTweakedVisible(!isTwitterTweakedVisible);
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, "toggle");
        });
    }

    return (
        <>
        {
            isStyleUpdated ? // To prevent stack size exceeding error
            <ThemeContext.Provider value={{ backgroundColor: bgColor, textColor: textColor}}>
            <div>
                {
                    isTwitterTweakedVisible ?
                    <>
                        <div className="d-flex headline-container">
                            <FontAwesomeIcon className="closeButton" icon={faX} onClick={handleClick} />
                            <h4 className="col-9 welcome-text">Welcome to Twitter-Tweaked!</h4>
                        </div>
                        <MyDropdown />
                    </> :
                    <div className="d-flex align-items-center twitter-tweaked-button" onClick={handleClick}> 
                        <p className="col-1 text">«</p> 
                        <Image 
                            className="col-3 pic"
                            src="icon48.png"
                        />
                        <p className="col-8 text">Open Twitter Tweaked</p> 
                    </div>
                }
            </div>
        </ThemeContext.Provider> :
        <></>
        }
        </>
    )
}
const container = document.getElementById("react-target")
const root = createRoot(container)

root.render(<Popup />)