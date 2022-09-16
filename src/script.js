
const backgroundColor = document.body;
console.log(backgroundColor);

window.addEventListener("load", function load(event) {
    const backgroundColor = this.window.getComputedStyle(document.body).backgroundColor;
    const backgroundColorFinal = backgroundColor;
    // console.log("Starting color is " + backgroundColorFinal);
    const textColor = (backgroundColor == "rgb(255,255,255)") ? "black" : "white";
    // console.log(backgroundColorFinal);

    var frame = document.body;

    frame.style.color = textColor;
    frame.style.background = backgroundColor;
    // frame.style.background = backgroundColor;
    this.window.removeEventListener("load", load, false);
});

