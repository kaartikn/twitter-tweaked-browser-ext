function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

export const getCurrentTwidFromCache = async () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get({ tweakedAuth: null }, function(result){ 
            const auth = JSON.parse(result.tweakedAuth);
            const currentSessionId = auth['currentTwid'];
            resolve(currentSessionId)
            reject(null)
         })
    })
}

export const getFollowingMapFromCache = async () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get({ followingData: null }, function(result){
            const parsedFollowingData = (result.followingData != null) ? JSON.parse(result.followingData) : {};
            resolve(parsedFollowingData)
            reject(null)
         })
    })
}

export const getAccessTokenFromCache = async () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get({ tweakedAuth: null }, function(result){ 
            const auth = JSON.parse(result.tweakedAuth);
            const currentSessionId = auth['currentTwid'];
            const authArray = auth['authArray'];
            for (let index = 0; index < authArray.length; index++) {
                const element = authArray[index];
                if(element['twitter_session_id'] == currentSessionId){
                    resolve(element);
                }
            }
            reject(null)
         })
    })
}

export function parseTweetData(successData){
    const data = JSON.parse(successData.tweets);
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(element.media != null){
        element.media = JSON.parse(element.media);
      }
    }
    return data;
}

export function handleAccountClick(account) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"redirect": "https://twitter.com/" + account});
    });
} 

export function handleHashtagClick(hashtag) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"redirect": "https://twitter.com/hashtag/" + hashtag.substring(1) + "?src=hashtag_click"});
    });
}

export function handleLinkClick(link) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"redirect": link});
    });
}