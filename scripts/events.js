//listeners

var touch = document.getElementById("touchEvents");

touch.addEventListener("touchstart", startTouch, false);
touch.addEventListener("touchend", endTouch, false);
touch.addEventListener("touchmove", moveTouch, false);

//touch event functions

function startTouch()
{
    document.getElementById("outputTouch").innerHTML += "<br>Touch start"
}

function endTouch()
{
    document.getElementById("outputTouch").innerHTML += "<br>Touch end"
}

function moveTouch()
{
    document.getElementById("outputTouch").innerHTML += "<br>Touch move"
}

//transition listeners

var transition = document.getElementById("transition");

transition.addEventListener("transitionstart", startTransition, false);

transition.addEventListener("transitionend", endTransition, false);

//transition event functions

function startTransition()
{
    document.getElementById("outputTransition").innerHTML += "<br>Transition start<br>"
}

function endTransition()
{
    document.getElementById("outputTransition").innerHTML += "<br>Transition end<br>"
}

//animation listeners

var animation = document.getElementById("spin");

animation.addEventListener("animationiteration", animationIteration, false);

//animation event functions

var count = 0;

function animationIteration()
{
   count++; document.getElementById("outputAnimation").innerHTML = count;
}