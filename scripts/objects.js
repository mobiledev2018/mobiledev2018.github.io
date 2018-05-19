var firstObject = new Object();

firstObject.description = "Created by using new Object()";
firstObject.number = 1;
firstObject.string = "JavaScript";

var secondObject = new secondObject("Created with constructor", 2, "Object Creation");

function secondObject(description, number, string)
{
    this.description = description;
    this.number = number;
    this.string = string;
}

var thirdObject = Object.create(firstObject);

function loadObjects(){
    document.getElementById("output").innerHTML = "First object description: " + firstObject.description + "<br>";
    document.getElementById("output").innerHTML += "First object number: " + firstObject.number + "<br>";
    document.getElementById("output").innerHTML += "First object string: " + firstObject.string + "<br>";

    document.getElementById("output").innerHTML += "<br>";

    document.getElementById("output").innerHTML += "Second object description: " + secondObject.description + "<br>";
    document.getElementById("output").innerHTML += "Second object number: " + secondObject.number + "<br>";
    document.getElementById("output").innerHTML += "Second object string: " + secondObject.string + "<br>";

    document.getElementById("output").innerHTML += "<br>";

    document.getElementById("output").innerHTML += "Proof it copies the next example works <br>";

    document.getElementById("output").innerHTML += "Third object description: " + thirdObject.description + "<br>";
    document.getElementById("output").innerHTML += "Third object number: " + thirdObject.number + "<br>";
    document.getElementById("output").innerHTML += "Third object string: " + thirdObject.string + "<br>";

    thirdObject.description = "Created by using Object.create() This is also inheritance";
    thirdObject.number = 3;
    thirdObject.string = "Demonstration";

    document.getElementById("output").innerHTML += "<br>";

    document.getElementById("output").innerHTML += "Third object description: " + thirdObject.description + "<br>";
    document.getElementById("output").innerHTML += "Third object number: " + thirdObject.number + "<br>";
    document.getElementById("output").innerHTML += "Third object string: " + thirdObject.string + "<br>";
}