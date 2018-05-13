function fillLoop() {
    var howMany = document.getElementById('times').value;

    var repeat = document.getElementById('repeat').value;

    for (i = 0; i < howMany; i++) {
        document.getElementById('outputText').innerHTML += repeat;
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

function saveWork()
{
    var storageName = document.getElementById('saveName').value;

    var savedObject = {color:document.getElementById('outputText').style.color, font:document.getElementById('outputText').style.fontFamily, textBlock:document.getElementById('outputText').innerHTML};

    var ObjectJSON = JSON.stringify(savedObject); 

    localStorage.setItem("storage" + storageName, ObjectJSON);
}

function loadWork()
{
    var loadName = document.getElementById('loadName').value

    var loadedJSON = localStorage.getItem("storage" + loadName);

    var loadedObject = JSON.parse(loadedJSON);

    document.getElementById('outputText').innerHTML = loadedObject.textBlock;

    document.getElementById('outputText').style.color = loadedObject.color;
    document.getElementById('outputText').style.fontFamily = loadedObject.font;


}

function test()
{
    var wow = "asdfasdfasdf";
    localStorage.setItem("ugh", wow);
}

function testy()
{
    var amazing = localStorage.getItem("ugh");
    document.getElementById('outputText').innerHTML = amazing;
}