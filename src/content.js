if(window == top){
    var backgroundColor = document.body.style.backgroundColor;
    var borderColor;

    handleEventsPostLoading();

    setupOnMessageListener();
    
    var iframe = setupSidePanelCSS();
}


function setupOnMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message == "toggle") {
            toggleTwitterTweaked();
        }
    });
}

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
    iframe.style.borderWidth = "5px";
    iframe.style.borderStyle = "solid";
    iframe.src = chrome.runtime.getURL("popup.html");
    document.body.appendChild(iframe);
    return iframe;
}

function handleEventsPostLoading() {
    window.addEventListener("load", function load(event) {
        setupTwitterTweaked();
        setBorderColor();

        this.window.removeEventListener("load", load, false);
    });
}

function setBorderColor() {
    try {
        elemsWithBorderColor = document.getElementsByClassName("r-14wv3jr");
        var arr = Array.from(elemsWithBorderColor);
        borderColor = window.getComputedStyle(arr[0]).borderColor;
        iframe.style.borderColor = borderColor;
    } catch (e) { }
}

function setupTwitterTweaked() {
    chrome.storage.local.get({ isTwitterTweakedVisible: true }, function (result) {
        toggleSidePanelVisibility(result.isTwitterTweakedVisible);
        toggleTwitterTweakedVisibility(result.isTwitterTweakedVisible);
        chrome.storage.local.set({ isTwitterTweakedVisible: result.isTwitterTweakedVisible });
    });
}

function toggleTwitterTweaked(){

    chrome.storage.local.get("isTwitterTweakedVisible", function(result){
        newIsTwitterTweakedVisible = !result.isTwitterTweakedVisible;
        toggleSidePanelVisibility(newIsTwitterTweakedVisible);
        toggleTwitterTweakedVisibility(newIsTwitterTweakedVisible);
        chrome.storage.local.set({isTwitterTweakedVisible: newIsTwitterTweakedVisible});
    })

}

// Need to run this every time change content
function toggleSidePanelVisibility(isTwitterTweakedVisible) {
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

function toggleTwitterTweakedVisibility(isTwitterTweakedVisible){
    if(isTwitterTweakedVisible){
        iframe.style.width="450px";
    }
    else{
        iframe.style.width="0px";
    }
}