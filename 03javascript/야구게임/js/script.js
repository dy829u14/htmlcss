const turn = document.querySelector("#turn");
const intro = document.querySelector("#intro");
const startbtn = document.querySelector("#intro button");
const action_log = document.querySelector("#action-log");
const commands = document.querySelector("#commands");
const commandBtns = document.querySelectorAll("#commands button");
const ground = document.querySelector("#game");
const board = document.querySelector("#board");
const logUl = document.querySelector("#log");
const lis = document.querySelectorAll("#log li");
let isUserTurn = true;

// 이벤트 로그 추가 함수


function newLi(event){
    let createLi = document.createElement('li');
    let createTxt;
    switch(event){
        case "홈런":
            createTxt = document.createTextNode("홈런을 쳤습니다!!");
            break;
        case "안타":
            createTxt = document.createTextNode("안타를 쳤습니다");
            break;
    }
    createLi.append(createTxt);
    function maxLengthChk(){
        let num = logUl.childElementCount;
        if(num>=8){
            logUl.lastElementChild.remove();
            logUl.prepend(createLi);
        }else{
            logUl.prepend(createLi);
        }
    }
    maxLengthChk();
}
// 이벤트 로그 추가함수 끝

// 게임시작 시 UI display 조작 리스너


startbtn.addEventListener("click", function(){
    action_log.style.display = "block";
    commands.style.display = "flex";
    board.style.display = "flex";
    ground.style.display = "block";
    intro.style.display = "none";
    
    turn.style.display = "block";
    setTimeout(function(){
        turn.style.display = "none";
    }, 3000)
    isUserTurn = true;
});
// UI display 끝

// 유저 턴 일때 공격/수비 텍스트 변환 함수
function turnChk(){
    if(isUserTurn == true){
        commands.firstElementChild.innerHTML = "공격";
        commandBtns[0].innerHTML = "스윙!!";
        commandBtns[1].innerHTML = "기다리기";
    }else{
        commands.firstElementChild.innerHTML = "수비";
        commandBtns[0].innerHTML = "스트라이크";
        commandBtns[1].innerHTML = "볼";
    }
}
turnChk();
// 유저 턴 일때 공격/수비 텍스트 변환 함수 끝

// 게임 시스템 로직

// 공격상황
let random = Math.floor(Math.random()*10)+1;

let bol = document.querySelector("#bol");
let hitter = document.querySelector("#hitter");
let ru1 = document.querySelector("#ru1");
let ru2 = document.querySelector("#ru2");
let ru3 = document.querySelector("#ru3");

let gameStrike = document.querySelector("#game_strike");
let gameBall = document.querySelector("#game_ball");
let gameFaul = document.querySelector("#game_faul");
let gameStrikeout = document.querySelector("#game_strikeout");
let gameFourball = document.querySelector("#game_fourball");
let gameFlyout = document.querySelector("#game_flyout");
let gameGroundball = document.querySelector("#game_groundball");
let gameHomerun = document.querySelector("#game_Homerun");
let gameAnta = document.querySelector("#game_Anta");

bol.addEventListener("click", function() {
    bol.style.top = "400px";
});
hitter.addEventListener("click", function() {
    hitter.style.left = "630px";
    hitter.style.top = "230px";
})
ru1.addEventListener("click", function() {
    ru1.style.top = "95px";
    ru1.style.left = "410px";
})
ru2.addEventListener("click", function() {
    ru2.style.top = "230px";
    ru2.style.left = "170px";
})
ru3.addEventListener("click", function() {
    ru3.style.top = "365px";
    ru3.style.left = "410px";
})

ru1.addEventListener("click", function() {
    gameStrike.style.opacity = '1';    
    setTimeout(function() {
        gameStrike.style.opacity = '0';
    }, 1500);
  })
ru2.addEventListener("click", function() {
    gameBall.style.opacity = '1';    
    setTimeout(function() {
        gameBall.style.opacity = '0';
    }, 1500);
})
ru2.addEventListener("click", function() {
    gameFaul.style.opacity = '1';    
    setTimeout(function() {
        gameFaul.style.opacity = '0';
    }, 1500);
})
ru2.addEventListener("click", function() {
    gameStrikeout.style.opacity = '1';    
    setTimeout(function() {
        gameStrikeout.style.opacity = '0';
    }, 1500);
})
ru2.addEventListener("click", function() {
    gameFourball.style.opacity = '1';    
    setTimeout(function() {
        gameFourball.style.opacity = '0';
    }, 1500);
})
ru2.addEventListener("click", function() {
    gameFlyout.style.opacity = '1';    
    setTimeout(function() {
        gameFlyout.style.opacity = '0';
    }, 1500);
})
ru2.addEventListener("click", function() {
    gameFroundball.style.opacity = '1';    
    setTimeout(function() {
        gameGroundball.style.opacity = '0';
    }, 1500);
})
board.addEventListener("click", function() {
    gameHomerun.style.opacity = '1';    
    setTimeout(function() {
        gameHomerun.style.opacity = '0';
    }, 2500);
})
board.addEventListener("click", function() {
    gameAnta.style.opacity = '1';    
    setTimeout(function() {
        gameAnta.style.opacity = '0';
    }, 1500);
})