var textColor;
var background;

chrome.storage.local.get(['color'], function(result) {
    backgroundColor = result.color;
    textColor = (backgroundColor == "rgb(255, 255, 255)") ? "black" : "white";
  });
window.addEventListener("load", function load(event) {
    var frame = document.body;

    frame.style.color = textColor;
    frame.style.backgroundColor = backgroundColor;
    this.window.removeEventListener("load", load, false);
});

