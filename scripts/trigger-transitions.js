function add()
{
    var element = document.querySelectorAll(".box");


    for(var i = 0; i < element.length; i++)
    {
        element[i].classList.remove("box");
        element[i].classList.add("move");
    }

}

function remove()
{
    var element = document.querySelectorAll(".move");


    for(var i = 0; i < element.length; i++)
    {
        element[i].classList.remove("move");
        element[i].classList.add("box");
    }

}

function startAnimations()
{
    document.getElementById("spin").style.animationPlayState = "running";
    document.getElementById("skewYdir").style.animationPlayState = "running";
    document.getElementById("translateXdir").style.animationPlayState = "running";
}

function stopAnimations()
{
    document.getElementById("spin").style.animationPlayState = "paused";

    document.getElementById("skewYdir").style.animationPlayState = "paused";
    document.getElementById("translateXdir").style.animationPlayState = "paused";
}

