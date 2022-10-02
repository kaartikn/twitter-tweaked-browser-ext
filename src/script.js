window.addEventListener("load", function load(event) {
    var frame = document.body;

    chrome.storage.local.get("backgroundColor", function(result){
        frame.style.backgroundColor = result.backgroundColor;
        frame.style.color = (result.backgroundColor == "rgb(255, 255, 255)") ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";;
    });

    this.window.removeEventListener("load", load, false);
});

