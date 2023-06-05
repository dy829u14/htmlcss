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
const round = document.querySelector("#round");
const juja = document.querySelectorAll("#minimap>div");
let strikescore = document.querySelector("#strike strong");
let ballscore = document.querySelector("#ball strong");
let outscore = document.querySelector("#out>p");
let isUserTurn = true;
let resetCount = 0;
let strikeNum = 0;
let ballNum = 0;
let outNum = 0;
let roundtext = 1;
let userScore = 0;
let comScore = 0;
//종
let bol = document.querySelector("#bol");
let hitter = document.querySelector("#hitter");
let pitcher = document.querySelector("#pitcher");
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

//미니맵 재근씨 추가;
let first_stat = juja[0].dataset.value;
let second_stat = juja[1].dataset.value;
let third_stat = juja[2].dataset.value;
function first_status(idx){
    first_stat = idx;
    if(first_stat == 0){
        juja[0].style.background = "#fff";
    }else{
        juja[0].style.background = "yellow";
    }
}
function second_status(idx){
    second_stat = idx;
    if(second_stat == 0){
        juja[1].style.background = "#fff";
    }else{
        juja[1].style.background = "yellow";
    }
}
function third_status(idx){
    third_stat = idx;
    if(third_stat == 0){
        juja[2].style.background = "#fff";
    }else{
        juja[2].style.background = "yellow";
    }
}

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
        case "헛스윙":
            createTxt = document.createTextNode("헛스윙~ 이게뭔가요~");
            break;
        case "볼":
            createTxt = document.createTextNode("볼~!");
            break;
        case "스트라이크":
            createTxt = document.createTextNode("스트라이크 ~");
            break;
        case "스트라이크아웃":
            createTxt = document.createTextNode("스트라이크 아웃!");
            break;
        case "볼넷":
            createTxt = document.createTextNode("볼 넷 ! 1루 진루 !");
            break;
        case "쓰리아웃":
            createTxt = document.createTextNode("쓰리아웃 체인지~!");
            break;
        case "스트라이크던짐":
            createTxt = document.createTextNode("스트라이크존에 던졌습니다.");
            break;
        case "볼던짐":
            createTxt = document.createTextNode("볼 존에 던졌습니다.");
        break;
        case "파울":
            createTxt = document.createTextNode("파울입니다.");
        break;
        case "땅볼아웃":
            createTxt = document.createTextNode("땅볼아웃입니다.");
        break;
        case "플라이아웃":
            createTxt = document.createTextNode("플라이아웃입니다.");
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
    round.firstElementChild.innerHTML = `${roundtext}회초`;
    

    commands.firstElementChild.innerHTML = "공격";
    commandBtns[0].innerHTML = "스윙!!";
    commandBtns[1].innerHTML = "기다리기";
    turn.style.display = "block";
    setTimeout(function(){
        turn.style.display = "none";
    }, 3000)
    isUserTurn = true;
});
// UI display 끝
// 유저 턴 일때 공격/수비 텍스트 변환 함수
function turnChk(){
    if(isUserTurn){
        ++roundtext;
        commands.firstElementChild.innerHTML = "공격";
        commandBtns[0].innerHTML = "스윙!!";
        commandBtns[1].innerHTML = "기다리기";
        turn.style.display = "block";
        turn.firstElementChild.innerHTML = "공격 턴 입니다.";
        setTimeout(function(){
            turn.style.display = "none";
        }, 2000)
        round.firstElementChild.innerHTML = `${roundtext}회초`;
    }else{
        commands.firstElementChild.innerHTML = "수비";
        commandBtns[0].innerHTML = "스트라이크";
        commandBtns[1].innerHTML = "볼";
        turn.style.display = "block";
        turn.firstElementChild.innerHTML = "수비 턴 입니다.";
        setTimeout(function(){
            turn.style.display = "none";
        }, 2000)
        round.firstElementChild.innerHTML = `${roundtext}회말`;
    }
}


// 유저 턴 일때 공격/수비 텍스트 변환 함수 끝

// 게임 시스템 로직

// 공격상황
    
    commandBtns[0].addEventListener("click",function(){
        bolthrow();
        let random = Math.random();
        if(isUserTurn){
            let throw1 = random<0.5 ? "스트라이크" : "볼";
            let random1 = Math.random();
            if(throw1==="스트라이크"){
                if(random1<0.1){
                    newLi("홈런");
                    plus_score();
                    outoutout();
                    strikeOut();
                    ballOut();
                    homerunEffect();
                    homerunMove();
                    console.log("스트라이크 홈런")
                }else if(random1<0.3){
                    newLi("파울");
                    faulEffect()
                    faulcount();
                }else if(random1<0.5){
                    let aaa = Math.random();
                    aaa<0.5 ? (newLi("땅볼아웃"),outCount(),strikeOut(),ballOut(),groundballEffect()) : (newLi("플라이아웃"),outCount(),strikeOut(),ballOut(),flyoutEffect());
                }else{
                    random1<0.9 ? (newLi("안타"),run(),strikeOut(),ballOut(),antaEffect()) : (newLi("헛스윙"),strikeCount(),strikeEffect());
                }
                boardRefresh();
            }else{
                if(random1<0.1){
                    newLi("홈런");
                    plus_score();
                    outoutout();
                    strikeOut();
                    homerunEffect();
                    homerunMove();
                    ballOut();
                    console.log("ball homerun")
                }else if(random1<0.3){
                    newLi("파울");
                    faulEffect()
                    faulcount();
                }else if(random1<0.6){
                    let aaa = Math.random();
                    aaa<0.5 ? (newLi("땅볼아웃"),outCount(),strikeOut(),ballOut(),groundballEffect()) : (newLi("플라이아웃"),outCount(),strikeOut(),ballOut(),flyoutEffect());
                }else{
                    random1<0.6 ? newLi("안타",run(),strikeOut(),ballOut(),antaEffect()) : (newLi("헛스윙"),strikeCount(),strikeEffect());
                }
            }
            boardRefresh();
        }else {
            newLi("스트라이크던짐");
            if(random<0.1){
                newLi("홈런");
                plus_score();
                outoutout();
                strikeOut();
                ballOut();
                homerunEffect();
                homerunMove();
            }else if(random<0.3){
                newLi("파울");
                faulEffect()
                faulcount();
            }else if(random<0.6){
                let aaa = Math.random();
                aaa<0.5 ? (newLi("땅볼아웃"),outCount(),strikeOut(),ballOut(),groundballEffect()) : (newLi("플라이아웃"),outCount(),strikeOut(),ballOut(),flyoutEffect());
            }else{
                random<0.8 ? (newLi("안타"),run(),strikeOut(),ballOut(),antaEffect()) : (newLi("헛스윙"),strikeCount(),strikeEffect());
            }
            boardRefresh();
        }
        
    });
    commandBtns[1].addEventListener("click",function(){
        bolthrow();
        let random = Math.random();
        if(isUserTurn){
            random<0.5 ? (newLi("스트라이크"),strikeCount(),strikeEffect()) : (newLi("볼"),ballCount());
        }else{
            newLi("볼던짐");
            if(random<0.1){
                newLi("홈런");
                plus_score();
                outoutout();
                strikeOut();
                ballOut();
                homerunEffect();
                homerunMove();
            }else if(random1<0.3){
                newLi("파울");
                faulEffect()
                faulcount();
            }else if(random1<0.6){
                let aaa = Math.random();
                aaa<0.5 ? (newLi("땅볼아웃"),outCount(),strikeOut(),ballOut(),groundballEffect()) : (newLi("플라이아웃"),outCount(),strikeOut(),ballOut(),flyoutEffect());
            }else if(random<0.3){
                newLi("안타");
                antaEffect()
                strikeOut();
                ballOut();
            }else{
                random<0.6 ? (newLi("헛스윙"),strikeCount(),strikeEffect()) : (newLi("볼"),ballCount());
            }
            boardRefresh();
        } 
    });

//함수지정
function strikeCount(){
    strikeNum += 1;
    strikescore.innerHTML = strikeNum;
    if(strikeNum==3){
        newLi("스트라이크아웃");
        strikeOutEffect();
        strikeOut();
        ballOut();
        outCount();
    }
}
function strikeOut(){
    strikescore.innerHTML = resetCount;
    strikeNum = resetCount;
}
function faulcount(){
    let aa = Math.random();
    if(strikeNum==2){
        return;
    }else{
        strikeCount();
    }
    
}
function ballCount(){
    ballNum += 1;
    ballscore.innerHTML = ballNum;
    if(ballNum==4){
        newLi("볼넷");
        fourballEffect();
        strikeOut();
        ballOut();
        outCount();
        run()
    }else{
        ballEffect();
    }
}
function ballOut(){
    ballscore.innerHTML = resetCount;
    ballNum = resetCount;
}
function outCount(){
    outNum +=1;
    outscore.innerHTML = outNum;
    if(outNum==3){
        outCountOut();
        newLi("쓰리아웃");
        outoutout();
        if(isUserTurn){
            isUserTurn = false;
        }else{
            isUserTurn = true;
        }
        change();
        turnChk();
        ru1.style.opacity = 0;
        ru2.style.opacity = 0;
        ru3.style.opacity = 0;
    }
}
function outCountOut(){
    outscore.innerHTML = resetCount;
    outNum = resetCount;
}

function run(){

    if(first_stat == 0){
        first_status(1);
        hittermove();
        setTimeout(function(){
            ru1.style.opacity="1";            
        },2000);
        
    }else{
        if(second_stat == 0){
            second_status(1);
            hittermove();
            ru1move();
            setTimeout(function(){
                ru1.style.opacity="1";
                ru2.style.opacity="1";                
            },2000);
            
            

        }else{
            if(third_stat == 0){
                third_status(1);
                hittermove();
                ru1move();
                ru2move();
                setTimeout(function(){
                    ru1.style.opacity="1";
                    ru2.style.opacity="1";
                    ru3.style.opacity="1";                
                },2000);
            }else{
                hittermove();
                ru1move();
                ru2move();
                ru3move();
                if(isUserTurn){
                    userScore++;
                }else{
                    comScore++;
                }
            }
        }
    }
}
function boardRefresh(){
    document.querySelector("#userScore").innerHTML = userScore;
    document.querySelector("#comScore").innerHTML = comScore;
}
function outoutout(){
    first_status(0);
    second_status(0);
    third_status(0);
    
}
function plus_score(){
    let sum = 1;
    sum = sum + Number(first_stat) + Number(second_stat) + Number(third_stat);
    if(isUserTurn){
        userScore += sum;
    }else{
        comScore += sum;
    }
}

//종
function bolthrow() {
    bol.style.top = "400px";
    setTimeout(function(){
        bol.style.opacity = "0";
        setTimeout(function(){
            bol.style.top = "";
            setTimeout(function(){
                bol.style.opacity = "1";
            },500)
        },500)
    },500)
}
function hittermove() {
    setTimeout(function(){
        hitter.style.left = "630px";
        hitter.style.top = "230px";
        setTimeout(function(){
            hitter.style.opacity = 0;
            setTimeout(function(){
                hitter.style.top = "";
                hitter.style.left = "";
                setTimeout(function(){
                    hitter.style.opacity = 1;
                },500) 
            },500)  
        },500)   
    },500)  
}
function ru1move() {
    ru1.style.top = "95px";
    ru1.style.left = "410px";
    setTimeout(function(){
        ru1.style.opacity = 0;
        setTimeout(function(){
            ru1.style.top = "";
            ru1.style.left = "";
            setTimeout(function(){
                ru1.style.opacity = 1;
            },500) 
        },500)  
    },500)
}
function ru2move() {
    ru2.style.top = "230px";
    ru2.style.left = "170px";
    setTimeout(function(){
        ru2.style.opacity = 0;
        setTimeout(function(){
            ru2.style.top = "";
            ru2.style.left = "";
            setTimeout(function(){
                ru2.style.opacity = 1;
            },500) 
        },500)  
    },500)
}
function ru3move() {
    ru3.style.top = "365px";
    ru3.style.left = "410px";
    setTimeout(function(){
        ru3.style.opacity = 0;
        setTimeout(function(){
            ru3.style.top = "";
            ru3.style.left = "";
            setTimeout(function(){
                ru3.style.opacity = 1;
            },500) 
        },500)  
    },500)
}
function homerunMove(){
    hitter.style.left = "630px";
    hitter.style.top = "230px";
    ru1.style.top = "95px";
    ru1.style.left = "410px";
    ru2.style.top = "230px";
    ru2.style.left = "170px";
    ru3.style.top = "365px";
    ru3.style.left = "410px";
    setTimeout(function(){
        hitter.style.top = "95px";
        hitter.style.left = "410px";
        ru1.style.top = "230px";
        ru1.style.left = "170px";
        ru2.style.top = "365px";
        ru2.style.left = "410px";
        setTimeout(function(){
            hitter.style.top = "230px";
            hitter.style.left = "170px";
            ru1.style.top = "365px";
            ru1.style.left = "410px";
            setTimeout(function(){
                hitter.style.top = "365px";
                hitter.style.left = "410px";
                setTimeout(function(){
                    ru1.style.opacity = 0;
                    ru2.style.opacity = 0;
                    ru3.style.opacity = 0;
                    setTimeout(function(){
                        hitter.style.left = "";
                        hitter.style.top = "";
                        ru1.style.top = "";
                        ru1.style.left = "";
                        ru2.style.top = "";
                        ru2.style.left = "";
                        ru3.style.top = "";
                        ru3.style.left = "";
                    },500)                                                            
                },500)
            },500)
        },500)
    },500)
}

//이펙트

function strikeEffect() {
    gameStrike.style.opacity = '1';    
    setTimeout(function() {
        gameStrike.style.opacity = '0';
    }, 1000);
  }
function ballEffect() {
    gameBall.style.opacity = '1';    
    setTimeout(function() {
        gameBall.style.opacity = '0';
    }, 1000);
}
function faulEffect() {
    gameFaul.style.opacity = '1';    
    setTimeout(function() {
        gameFaul.style.opacity = '0';
    }, 1000);
}
function strikeOutEffect() {
    setTimeout(function(){
        gameStrikeout.style.opacity = '1'; 
        setTimeout(function() {
            gameStrikeout.style.opacity = '0';
        }, 1000);
    },1000)           
}
function fourballEffect() {
    gameFourball.style.opacity = '1';    
    setTimeout(function() {
        gameFourball.style.opacity = '0';
    }, 1000);
}
function flyoutEffect() {
    gameFlyout.style.opacity = '1';    
    setTimeout(function() {
        gameFlyout.style.opacity = '0';
    }, 1000);
}
function groundballEffect() {
    gameGroundball.style.opacity = '1';    
    setTimeout(function() {
        gameGroundball.style.opacity = '0';
    }, 1000);
}
function homerunEffect() {
    gameHomerun.style.opacity = '1';    
    setTimeout(function() {
        gameHomerun.style.opacity = '0';
    }, 2500);
}
function antaEffect() {
    gameAnta.style.opacity = '1';    
    setTimeout(function() {
        gameAnta.style.opacity = '0';
    }, 1500);
}
function change(){

    function colorChange() {
        hitter.style.backgroundImage = "url('images/taja2.png')";
        ru1.style.backgroundImage = "url('images/zuza2.png')";
        ru2.style.backgroundImage = "url('images/zuza2.png')";
        ru3.style.backgroundImage = "url('images/zuza2.png')";
        pitcher.style.backgroundImage = "url('images/pitcher2.png')";
    }
    function colorChange2() {
        hitter.style.backgroundImage = "url('images/taja.png')";
        ru1.style.backgroundImage = "url('images/zuza.png')";
        ru2.style.backgroundImage = "url('images/zuza.png')";
        ru3.style.backgroundImage = "url('images/zuza.png')";
        pitcher.style.backgroundImage = "url('images/pitcher.png')";
    }
    if(isUserTurn){
        colorChange2();
    }
    else{
        colorChange();
    }
}
