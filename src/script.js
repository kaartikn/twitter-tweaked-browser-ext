
window.addEventListener("load", function load(event) {
    var backgroundColor = document.body.style.backgroundColor;
    var textColor = (backgroundColor == "rgb(255,255,255)") ? "black" : "white";
    var frame = document.body;

    frame.style.color = textColor;
    this.window.removeEventListener("load", load, false);
});

