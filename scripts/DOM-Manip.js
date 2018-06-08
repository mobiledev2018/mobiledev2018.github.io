var globalElement;

function create() {
    globalElement = document.createElement("p");
    var append = document.createTextNode("This p element was create using .createElement. This text was added using .createTextNode and add using .appendChild.");
    globalElement.setAttribute("id", "hi");
    globalElement.appendChild(append);
    document.body.appendChild(globalElement);
}

function clearElements() {
    var x = document.querySelectorAll("#hi");

    for(var i = 0; i < x.length; i++)
    {
        x[i].outerHTML = "";
    }
}

function appendText() {
    var newAppend = document.createTextNode(" I am appended");
   
    globalElement.appendChild(newAppend);
}

function insertTextChild() {
    var insertAppend = document.createTextNode(" I am .insertBefore");
    globalElement.appendChild(insertAppend);
    globalElement.insertBefore(insertAppend, globalElement.childNodes[0]);
}