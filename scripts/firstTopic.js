function fillLoop() {
    var howMany = document.getElementById('times').value;
    var number = document.getElementById('repeat').value;
    for (i = 0; i < howMany; i++) {
        document.getElementById('outputText').innerHTML += number;
    } 
}

function clearOutputDiv() {
    document.getElementById('outputText').innerHTML = "";
}

function changeColor() {
    var color = document.getElementById('colorChange').value;
    document.getElementById('outputText').style.color = color;
}

function changeFont() {
    var fontChange = document.getElementById('fontChange').value;
    document.getElementById('outputText').style.fontFamily = fontChange;
}

function createObject()
{
    var storageName = document.getElementById('storageName').value;
    var savedObject = {color:document.getElementById('colorChange').value, font:document.getElementById('fontChange').value, textBlock:document.getElementById('outputText').innerHTML};
    var ObjectJSON = JSON.stringify(savedObject); 
    store(ObjectJSON);
    localStorage.setItem("textBox", objectJSON);
}

function load(name)
{
    
}