import { storeCredentialsInBackend } from "./services/auth";

const mo = new MutationObserver(onMutation);
onMutation([{addedNodes: [document.documentElement]}]);
observe();
var sidebarColumn;
var isSidepanelVisible = false;

if(window == top){
    var backgroundColor = document.body.style.backgroundColor;
    var borderColor = (backgroundColor == "rgb(255, 255, 255)") ? "rgb(139, 152, 165)" : "rgb(22, 24, 28)";
    chrome.storage.local.set({backgroundColor: backgroundColor});

    const cookies = document.cookie.split(";");
    var userTwitterSessionId;

    setUserTwitterSessionId(cookies);

     // To check if user logged into twitter and only show sidebar if they are (so they don't see the sidebar on the loginpage of twitter.com)
    if (userTwitterSessionId != null) {

        setCurrentTwidInLocalStorage();
        setupOnMessageListener();
        handleEventsPostLoading();
        
        var iframe = setupSidePanelCSS();
    }
}

function setCurrentTwidInLocalStorage() {
    chrome.storage.local.get({ tweakedAuth: null }, function (result) {
        var authObject;
        if (result.tweakedAuth == null) {
            authObject = { "currentTwid": userTwitterSessionId, "authArray": [] };
        } else {
            authObject = { "currentTwid": userTwitterSessionId, "authArray": JSON.parse(result.tweakedAuth)["authArray"] };
        }
        const stringifiedAuthObject = JSON.stringify(authObject);
        chrome.storage.local.set({ tweakedAuth: stringifiedAuthObject });
    });
}

function setUserTwitterSessionId(cookies) {
    for (let index = 0; index < cookies.length; index++) {
        if (cookies[index].trim().slice(0, 4) == "twid") {
            userTwitterSessionId = cookies[index].slice(6);
        }
    }
}

function onMutation(mutations) {
    let stopped;
    for (const {addedNodes} of mutations) {
      for (const n of addedNodes) {
        if (n.tagName) {
          if (n.matches("[data-testid=sidebarColumn]")) {
            stopped = true;
            mo.disconnect();
            sidebarColumn = n;
            if (!isSidepanelVisible) sidebarColumn.style.display = "none";
          } else if (n.firstElementChild && n.querySelector("[data-testid=sidebarColumn]")) {
            stopped = true;
            mo.disconnect();
            for (const el of n.querySelectorAll("[data-testid=sidebarColumn]")){{ 
                sidebarColumn = el;
                if (!isSidepanelVisible) sidebarColumn.style.display = "none";
            }};
          }
        }
      }
    }
    if (stopped) observe();
}

// Linked to the on Mutation function by specifying the mutation properties to look out for
function observe() {
    mo.observe(document, {
      subtree: true,
      childList: true,
    });
  }

// Communicates with the background script to handle the on Message listener
function setupOnMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message == "toggle") {
            toggleTwitterTweaked();
        } else if (typeof(message) == "object"){
            if ("redirect" in message){
                chrome.runtime.sendMessage({redirect: message.redirect});
            }
            if ("oauthToken" in message && "oauthVerifier" in message){
                const auth = {
                    "twitter_session_id": userTwitterSessionId,
                    "oauth_token": message['oauthToken'],
                    "oauth_verifier": message['oauthVerifier']
                }
                storeCredentialsInBackend(auth, (loading) => {});
                storeCredentialsInLocalStorage(auth);
            }
        } 
    });
}

function storeCredentialsInLocalStorage(auth) {
    chrome.storage.local.get({ tweakedAuth: null }, function (result) {

        var parsedAuthArray;
        if (result.tweakedAuth == null)
            parsedAuthArray = [];
        else
            parsedAuthArray = JSON.parse(result.tweakedAuth)["authArray"];

        var isAuthInAuthArr = false;
        for (let index = 0; index < parsedAuthArray.length; index++) {
            if (parsedAuthArray[index]["twitter_session_id"] == userTwitterSessionId) {
                isAuthInAuthArr = true;
            };
        }
        if (!isAuthInAuthArr) {
            parsedAuthArray.push(auth);
        }
        parsedAuthArray;

        const authObject = { "currentTwid": userTwitterSessionId, "authArray": (parsedAuthArray) };
        const stringifiedAuthObject = JSON.stringify(authObject);

        chrome.storage.local.set({ tweakedAuth: stringifiedAuthObject }, function () {
            chrome.runtime.sendMessage({ redirect: "https://twitter.com/home" });
        });

    });
}

// Shows / hides the twitter side panel & twitter tweaked accordingly depending on the user's settings.
function handleEventsPostLoading() {
    window.addEventListener("load", function load(event) {
        chrome.storage.local.get({ isTwitterTweakedVisible: false }, function (result) {
            const isSidepanelVisible = !result.isTwitterTweakedVisible;
            if (isSidepanelVisible) sidebarColumn.style.display = "block";
            toggleSidePanelVisibility(result.isTwitterTweakedVisible);
            toggleTwitterTweakedVisibility(result.isTwitterTweakedVisible);
            chrome.storage.local.set({ isTwitterTweakedVisible: result.isTwitterTweakedVisible });
        });
        this.window.removeEventListener("load", load, false);
    });    
}

// Sets up the iframe to be injected as Twitter Tweaked.
function setupSidePanelCSS() {
    var iframe = document.createElement('iframe');
    iframe.style.background = backgroundColor;
    iframe.style.height = "100%";
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.right = "0px";
    iframe.style.zIndex = "9000000000000000000";
    iframe.style.margin = "0px";
    iframe.style.padding = "0px";
    iframe.style.borderWidth = "3px";
    iframe.style.borderStyle = "solid";
    iframe.style.width = "0px";
    iframe.style.borderColor = borderColor
    iframe.allow = "clipboard-write";
    iframe.src = chrome.runtime.getURL("popup.html");
    document.body.appendChild(iframe);
    return iframe;
}

// Access chrome storage memory to amend the user's setting and toggles the Twitter sidepanel and Twtitter Tweaked iframe correspondingly
function toggleTwitterTweaked(){

    chrome.storage.local.get("isTwitterTweakedVisible", function(result){
        const newIsTwitterTweakedVisible = !result.isTwitterTweakedVisible;
        console.log(newIsTwitterTweakedVisible);
        isSidepanelVisible = result.isTwitterTweakedVisible;
        toggleSidePanelVisibility(newIsTwitterTweakedVisible);
        toggleTwitterTweakedVisibility(newIsTwitterTweakedVisible);
        chrome.storage.local.set({isTwitterTweakedVisible: newIsTwitterTweakedVisible});
    })

}

// toggles the Twitter sidepanel visibility
function toggleSidePanelVisibility(isTwitterTweakedVisible) {
    if (isTwitterTweakedVisible) {
        sidebarColumn.style.display = "none";
    } else {
        sidebarColumn.style.display = "block";
    } 
}

// toggles Twitter Tweaked visibility
function toggleTwitterTweakedVisibility(isTwitterTweakedVisible){
    if(isTwitterTweakedVisible){
        iframe.style.width="450px"; // Make this width responsive in the long term
        iframe.style.height = "100%";
        iframe.style.padding = "0px";
        iframe.style.borderRadius = "0px";    
    }
    else{
        iframe.style.width="200px";
        iframe.style.height = "50px";
        iframe.style.padding = "2px";
        iframe.style.borderRadius = "0px 0px 0px 10px";    
    }
}