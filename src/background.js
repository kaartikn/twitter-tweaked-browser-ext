
chrome.action.onClicked.addListener(tab => {
    chrome.tabs.sendMessage(tab.id, "toggle");
});

chrome.runtime.onMessage.addListener(function(request, sender) {
    if("redirect" in request){
        chrome.tabs.update(sender.tab.id, {url: request.redirect});
    }
});