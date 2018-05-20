var globalElement;
var globalAppend;

function create() {
    var pElement = document.createElement("p");
    var append = document.createTextNode("This p element was create using .createElement. This text was added using .createTextNode and add using .appendChild.");
    pElement.appendChild(append);
    document.body.appendChild(pElement);
    globalElement = globalElement;
    globalAppend = append;
}

function clear() {
    globalElement.removeChild(globalElement);
}