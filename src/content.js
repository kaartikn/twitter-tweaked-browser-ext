const mo = new MutationObserver(onMutation);
onMutation([{addedNodes: [document.documentElement]}]);
observe();
var sidebarColumn;
var isSidepanelVisible = false;

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

function observe() {
    mo.observe(document, {
      subtree: true,
      childList: true,
    });
  }

if(window == top){
    var backgroundColor = document.body.style.backgroundColor;
    var borderColor = (backgroundColor == "rgb(255, 255, 255)") ? "rgb(139, 152, 165)" : "rgb(22, 24, 28)";
    chrome.storage.local.set({color: backgroundColor}, function() {});

    setupOnMessageListener();
    handleEventsPostLoading();
    
    var iframe = setupSidePanelCSS();
}


function setupOnMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message == "toggle") {
            toggleTwitterTweaked();
        }
    });
}

function handleEventsPostLoading() {
    window.addEventListener("load", function load(event) {
        setupTwitterTweaked();
        this.window.removeEventListener("load", load, false);
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
    iframe.style.borderWidth = "3px";
    iframe.style.borderStyle = "solid";
    iframe.style.width = "0px";
    iframe.style.borderColor = borderColor;
    iframe.src = chrome.runtime.getURL("popup.html");
    document.body.appendChild(iframe);
    return iframe;
}

function setupTwitterTweaked() {
    chrome.storage.local.get({ isTwitterTweakedVisible: true }, function (result) {
        isSidepanelVisible = !result.isTwitterTweakedVisible;
        if (isSidepanelVisible) sidebarColumn.style.display = "block";
        toggleSidePanelVisibility(result.isTwitterTweakedVisible);
        toggleTwitterTweakedVisibility(result.isTwitterTweakedVisible);
        chrome.storage.local.set({ isTwitterTweakedVisible: result.isTwitterTweakedVisible });
    });
}

function toggleTwitterTweaked(){

    chrome.storage.local.get("isTwitterTweakedVisible", function(result){
        newIsTwitterTweakedVisible = !result.isTwitterTweakedVisible;
        isSidepanelVisible = result.isTwitterTweakedVisible;
        toggleSidePanelVisibility(newIsTwitterTweakedVisible);
        toggleTwitterTweakedVisibility(newIsTwitterTweakedVisible);
        chrome.storage.local.set({isTwitterTweakedVisible: newIsTwitterTweakedVisible});
    })

}

// Need to run this every time change content
function toggleSidePanelVisibility(isTwitterTweakedVisible) {
    if (isTwitterTweakedVisible) {
        sidebarColumn.style.display = "none";
    } else {
        sidebarColumn.style.display = "block";
    } 
}

function toggleTwitterTweakedVisibility(isTwitterTweakedVisible){
    if(isTwitterTweakedVisible){
        iframe.style.width="450px";
    }
    else{
        iframe.style.width="0px";
    }
}