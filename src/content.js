var backgroundColor = document.body.style.backgroundColor;

window.addEventListener("load", function load(event){
    chrome.storage.local.get({isTwitterTweakedVisible: true}, function(result){
        toggleTwitterSidePanel(result.isTwitterTweakedVisible);
        toggleTwitterTweaked(result.isTwitterTweakedVisible);
        chrome.storage.local.set({isTwitterTweakedVisible: result.isTwitterTweakedVisible});
    })
    this.window.removeEventListener("load", load, false);
})



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message == "toggle"){
        toggle();
    }
})

var iframe = document.createElement('iframe'); 
iframe.style.background = backgroundColor;
iframe.style.height = "100%";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.style.border = "0px"; 
iframe.src = chrome.runtime.getURL("popup.html");

document.body.appendChild(iframe);

function toggle(){


    chrome.storage.local.get("isTwitterTweakedVisible", function(result){
        newIsTwitterTweakedVisible = !result.isTwitterTweakedVisible;
        toggleTwitterSidePanel(newIsTwitterTweakedVisible);
        toggleTwitterTweaked(newIsTwitterTweakedVisible);
        // Maybe the line below this is not needed
        chrome.storage.local.set({isTwitterTweakedVisible: newIsTwitterTweakedVisible});
    })


}

function toggleTwitterSidePanel(isTwitterTweakedVisible) {
    console.log("Called Function")
    Array.from(document.querySelectorAll("[data-testid=sidebarColumn]"))
    .forEach(function(val) {
        if (val != null) {
            if (isTwitterTweakedVisible) {
                val.style.display = "none";
            } else {
                val.style.display = "block";
            } 
        }
    });
}

function toggleTwitterTweaked(isTwitterTweakedVisible){
    if(isTwitterTweakedVisible){
        iframe.style.width="400px";
    }
    else{
        iframe.style.width="0px";
    }
}