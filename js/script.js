

//Highscore
var highScore = 0;
var highScoreTxt = document.querySelector("#high_score_txt");
var scoreTxt = document.querySelector("#score_txt");
var timerTxt = document.querySelector("#timer_txt");

//Score
var currScore = 0;
//Timer
const TimerMax = 60;
var secPassed = 0;
var paused = true;
var canClick = false;
var alt = false;

//Music
//some music mp3 thing here
//Reset
//Start
//Flashy Title
var pause_btn = document.querySelector("#btn_pause");
var reset_btn = document.querySelector("#btn_reset");
var start_btn = document.querySelector("#btn_start");
var checkeriMG = document.querySelector("#shape");
var pause_iMG = document.querySelector("#pause_im");
var event_Txt = document.querySelector("#event_Txt");
var timer_cont = document.querySelector("#timer_container");

var randNum = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

var music = document.querySelector("#music");

var click_eff_2 = document.querySelector("#eff_2");
var click_eff_3 = document.querySelector("#eff_3");

var soundArr = new Array(click_eff_2,click_eff_3);

//establish documetn
//select that div
//set randomw point on the screen
//set setimage at reandom
//onclick event that calls both of those methods


//Targeting Elements in the DOM
// var ranShapeClass = new Array("circle","triangle_down","square","parallelogram");
var ranShapeClass = new Array("circle","square","parallelogram",);
var checkerDiv = document.querySelector("#checker");
var boardDiv = document.querySelector("#board");


event_Txt.innerHTML = "AUTOBUS ARCADE EMPIRE";

secPassed = 0;
paused = true;
timerTxt.innerHTML = TimerMax - secPassed;  


checkerDiv.style.background = "black";

checkerDiv.addEventListener("click", (clicked) =>
{
    if (paused)
        return;
    soundArr[0].play();
    music.play();

        // vary size for fun
        var randSize = randNum(30, 100);
        checkerDiv.style.width = randSize + "px";
        checkerDiv.style.height = randSize + "px";

    currScore++;
    scoreTxt.innerHTML = currScore;

    var posx = randNum(0, boardDiv.offsetWidth -  50);
    var posy = randNum(0, boardDiv.offsetHeight -  50);

    checkerDiv.style.left = posx + "px";
    checkerDiv.style.top = posy + "px";

    var ranColor = `rgb(${(randNum(0,255))},${(randNum(0,255))},${(randNum(0,255))})`;
    var ranClass = ranShapeClass[randNum(0,ranShapeClass.length -1 )];

    checkerDiv.className = ranClass;
    checkerDiv.style.background = ranColor;

});




pause_btn.addEventListener("click", (pause) => 
{

    console.log("pause clicked");
    paused = !paused;

    if (paused) 
    {
        pause_iMG.setAttribute("src", "images/play_img.png");
        event_Txt.style.display = "block";
        event_Txt.innerHTML = "Paused";
        pause_btn.querySelector("span").innerHTML = "Unpause";
        music.pause();
    }
    else 
    {
        pause_iMG.setAttribute("src", "images/pause_img.png");
        event_Txt.style.display = "none";
        event_Txt.innerHTML = "";
        pause_btn.querySelector("span").innerHTML = "Pause";
        music.play();

    }

});


start_btn.addEventListener("click", (start) => 
{
    var music = document.querySelector("#music");

    //reset everything, set timer, addlistener, show the div
    timer_cont.style.color = "yellow";  

    console.log("Game started");
   // music.play();

    event_Txt.style.display = "none";
    event_Txt.innerHTML = "";
    if (currScore > highScore) {
        highScore = currScore;
        highScoreTxt.innerHTML = highScore;
    }

    currScore = 0;
    scoreTxt.innerHTML = currScore;
    paused = false;
    secPassed = 0;
    checkerDiv.style.display = "block";
});


reset_btn.addEventListener("click", (reset) => {
    console.log("reset clicked");

    //zero score, remove the listener, hid the div, compare score
    timer_cont.style.color = "yellow";  


    if (currScore > highScore) {
        highScore = currScore;
        highScoreTxt.innerHTML = highScore;
    }
    currScore = 0;
    scoreTxt.innerHTML = currScore;

    secPassed = 0;
    paused = true;
    timerTxt.innerHTML = TimerMax - secPassed;  



    checkerDiv.style.left = 0 + "px";
    checkerDiv.style.right = 0 + "px";
    checkerDiv.style.display = "block";

    event_Txt.style.display = "block";
    event_Txt.innerHTML = "AUTOBUS ARCADE EMPIRE";
    music.pause();


});


setInterval(() => 
{
    alt = !alt;
    console.log("alt "+alt);

    if (TimerMax - secPassed < 0)
        secPassed = TimerMax;


    if (currScore > highScore) 
    {
        highScoreTxt.style.color = "yellow";
    }


    if (!paused) 
    {
        secPassed++;
        timerTxt.innerHTML = TimerMax - secPassed;  

        if(TimerMax - secPassed <= 10)
        {
            console.log("less")
            if(alt)
            {
                timer_cont.style.color = "red";  

            }
            else
            {
                timer_cont.style.color = "yellow";  

            }
            soundArr[1].play();
        }



        if (secPassed === TimerMax) 
        {
            if (currScore > highScore) 
            {
                highScore = currScore;
                highScoreTxt.innerHTML = highScore;
            }
            
            event_Txt.style.display = "block";
            event_Txt.innerHTML = "ROUTE FINISHED!" + " Score: " + currScore;
            currScore = 0;
            scoreTxt.innerHTML = currScore;
            checkerDiv.style.display = "none";
            paused = true;
            music.pause();

        }
    }
}, 1000);
