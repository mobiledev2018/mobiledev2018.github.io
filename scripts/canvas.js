function rectangle()
{   
    var canvas = document.getElementById("draw");
    var create = canvas.getContext("2d");
    create.rect(10, 10, 200, 100);
    create.stroke();
    create.fillStyle = "green";
    create.fill();
}

function nameDraw()
{   
    var canvas = document.getElementById("drawName");
    var create = canvas.getContext("2d");
    create.font = "30px Verdana";
    create.strokeText("Cole Cannon",1,30);
}