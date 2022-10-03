
chrome.action.onClicked.addListener(tab => {
    chrome.tabs.sendMessage(tab.id, "toggle");
});

chrome.runtime.onMessage.addListener(function(request, sender) {
    if("redirect" in request){
        chrome.tabs.update(sender.tab.id, {url: request.redirect});
    }
});

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let url = tabs[0].url;
    const urlEnd = url.split(".com/")[1];
    if (urlEnd != null){
        if(urlEnd.length > 4 && urlEnd.slice(0,4) == 'home'){
            const queries = urlEnd.slice(5).split("&");
            var oauthToken;
            var oauthVerifier;
            for (let index = 0; index < queries.length; index++) {
                const element = queries[index];
                const data = element.split("=")[1];
                if (index == 0) oauthToken = data;
                else oauthVerifier = data;
            }
            const auth = {
                "oauthToken": oauthToken,
                "oauthVerifier": oauthVerifier
            }
            chrome.tabs.sendMessage(tabs[0].id, auth);            
        }
    }
});