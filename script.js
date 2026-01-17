let gameseq = [];
let userseq = [];

let btns = ["yellow" , "red" , "blue" , "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress" , function(){
    if(started == false){
    console.log("Game started");
    started = true;

    levelup();
 }
});

function gameflash(btn){
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash");
  } , 250);
}

function userflash(btn){
  btn.classList.add("userflash");
  setTimeout(function(){
    btn.classList.remove("userflash");
  } , 250);
}

function levelup() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomidx = Math.floor(Math.random()* btns.length);
  let randomcolor = btns[randomidx];
  let randombtn = document.querySelector(`.${randomcolor}`);
  gameseq.push(randomcolor);
  gameflash(randombtn);
}

function check(idx){
  if(userseq[idx]== gameseq[idx]){
    if(userseq.length == gameseq.length){
        setTimeout(levelup , 1000);
    }
  }
  else{
    h2.innerHTML =`Game over ! Your score was <b>${level}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
     document.querySelector("body").style.backgroundColor = "white";
    } , 150)
    reset();
  }
}

function btnPress() {
  let btn = this;

  userflash(btn);
  usercolor = btn.getAttribute("id");
  userseq.push(usercolor);
  check(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of  allbtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}