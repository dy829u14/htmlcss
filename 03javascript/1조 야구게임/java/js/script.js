//HTML 요소

//캐릭터
let hit = document.querySelector("#hitter");
let pit = document.querySelector("#pitcher");
let run1 = document.querySelector("#runner1");
let run2 = document.querySelector("#runner2");
let run3 = document.querySelector("#runner3");

//이닝 표시
let inningEl = document.querySelector("#inningNum");
let inningHoe = document.querySelector("#inningHoe");

//전광판 SBO 표시
let strikeEl = document.querySelectorAll(".strike");
let ballEl = document.querySelectorAll(".ball"); 
let outEl = document.querySelectorAll(".out");

//점수
let comScoreEl = document.querySelector("#cpuscore");
let userScoreEl = document.querySelector("#userscore");

//팀 이름앞 턴 표시 화살표
let turnEl = document.querySelectorAll(".inning_arrow");
let cominningEl = document.querySelector("#inning_arrow1");
let userinningEl = document.querySelector("#inning_arrow2");

//이펙트박스
let effectboxEl = document.querySelector(".effectbox");
//이펙트
let effectEl = document.querySelector(".effect");
//텍스트 박스 알림
let textboxEl = document.querySelector(".textbox");
let textbox2El = document.querySelector(".textbox2");

//버튼
let btn1 = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");
let btnSpecial = document.querySelector(".btnSpecial");



//변수설정

//컴퓨터 턴 확인
let isComputer = true;

//컴퓨터 점수
let comScore = 0;
let comScoreNum = 0;

//유저점수
let userScore = 0;
let userScoreNum = 0;

//투구
let comPitching;
let userPitching;

//com타격시도
let comBatting;
//com타격시도했으나 아웃
let comBattingOut;
//com멍때릴때
let com_ball;

//user타격시도
let userBatting;
//user타격시도했으나 아웃
let userBattingOut;

//카운트
let strike_count = 0;
let ball_count = 0;
let out_count = 0;

//SBO
let strike;
let ball;
let out;

//이닝카운트
let game_inning = 1;

//안타
let single;
//홈런
let homerun;
//주자
let runner = 0;

// 구현필요
// 주자가 2루타 일때는 2개씩 
// 주자가 3루타 일때는 3개씩 

//턴표시 화살표 활성화
cominningEl.classList.add("on");
//텍스트박스 게임 시작전 비활성화
textbox2El.classList.remove("on");
textboxEl.classList.remove("on");
btn1.classList.remove("on");
btn2.classList.remove("on");

gameStart();


function gameStart() {
    btn1.classList.add("on");
    btn2.classList.add("on");
    btn1.addEventListener("click", function(){
        bat1();
    })
    //이펙트 초기화
    effect_reset();
    textbox2El.classList.remove("on");
    textboxEl.classList.remove("on");
    function bat1(){
        //버튼 누르면 텍스트박스 호출
        textbox2El.classList.add("on");
        textboxEl.classList.add("on");
        text_reset();
        //컴퓨터 턴 확인
        if(isComputer) {
            comBatting = Math.random();
            //com이 타격시도하고 안타쳤을때 
            if(comBatting >= 0.6) {
                //안타를 쳤기때문에 스트라이크, 볼 카운트 초기화 및 왼쪽 전광판 SB 초기화
                sb_reset();
                //com이 타격시도하고 홈런쳤을때
                homerun = Math.random();
                //안타중 홈런의 비율 10%
                if(homerun < 0.1){
                    //홈런시 이미지 호출
                    effect_reset();
                    effectEl.classList.add("homerun");
                    //홈런시 주자 초기화
                    runner_reset();
                    //주자 숫자별 점수 
                    if(runner==0) {
                        userScoreNum = 0;
                        comscore();
                        textbox2El.innerHTML = (`챗GPT 솔로 홈런!`);
                    }
                    if(runner==1) {
                        comScoreNum = 1;
                        comscore();
                        textbox2El.innerHTML = (`챗GPT 투런 홈런!`);
                    }
                    if(runner==2) {
                        comScoreNum = 2;
                        comscore();
                        textbox2El.innerHTML = (`챗GPT 쓰리런 홈런!`);
                    }
                    if(runner==3) {
                        comScoreNum = 3;
                        comscore();
                        textbox2El.innerHTML = (`챗GPT 만루 홈런! 그랜드슬램!!!`);
                    }
                    runner = 0;
                } else {
                    //홈런을 제외하고 나머지는 안타
                    effect_reset();
                    effectEl.classList.add("hit"); 
                    runnercount();
                    //주자가 3명 이상일때 안타가 나오면 1점 득점
                    if(runner>3) {
                        comScoreNum = 0;
                        comscore();
                        textbox2El.innerHTML = (`챗GPT 안타를 쳤습니다! 득점!`);
                    } else {
                        textbox2El.innerHTML = (`챗GPT 안타를 쳤습니다!`);
                    }
                }
            } else {
            //com이 타격시도했지만 아웃일때
                comBattingOut = Math.random();
                if (comBattingOut < 0.2) {
                    effect_reset();
                    effectEl.classList.add("out"); 
                    //아웃일때 스트라이크, 볼 카운트 초기화 아웃함수로 아웃 +1
                    sb_reset();
                    outcount(); 
                    textbox2El.innerHTML=(`아웃! 내야 땅볼 입니다.`)
                }
                if (comBattingOut <0.4 && comBattingOut >= 0.2) {
                    effect_reset();
                    effectEl.classList.add("out");
                    sb_reset();
                    outcount(); 
                    textbox2El.innerHTML=(`아웃! 내야 플라이 입니다.`)
                }
                if (comBattingOut <0.6 && comBattingOut >= 0.4) {
                    effect_reset();
                    effectEl.classList.add("out");
                    sb_reset();
                    outcount();
                    textbox2El.innerHTML=(`아웃! 외야 플라이 입니다.`)
                }
                if (comBattingOut <0.8 && comBattingOut >= 0.6) {
                    effect_reset();
                    effectEl.classList.add("out");
                    sb_reset();
                    outcount(); 
                    textbox2El.innerHTML=(`파울 플라이 아웃 입니다!`)
                }
                if (comBattingOut <1 && comBattingOut >= 0.8) {
                    effect_reset();
                    //타격했지만 헛스윙으로 스트라이크 함수적용
                    strikecount();
                    textbox2El.innerHTML=(`챗GPT 헛스윙!`)
                    
                }
            }
        //유저 턴 확인
        } else if(!isComputer) { 
            //com이 스트라이크를 던질지 볼을 던질지 확률
            comPitching = Math.random();
            //com이 스트라이크를 던질 확률 70%
            if(comPitching < 0.7){ 
                let single = Math.random();
                //스트라이크중에서 안타일 확률 43% 
                //스트라이크비율 70% 그중 43%면 com투구를 총 100%로 볼때 30.1%로 컴퓨터와 최대한 확률 맞춤
                if(single >= 0.6){ 
                    //안타이니 스트라이크 볼 카운트 및 전광판 SB 초기화 
                    sb_reset();
                    homerun = Math.random();
                    //안타중 홈런 확률 com과 동일
                    if(homerun < 0.08){
                        effect_reset();
                        effectEl.classList.add("homerun");
                        runner_reset();
                        if(runner==0) {
                            userScoreNum = 0;
                            userscore();
                            textbox2El.innerHTML = (`휴먼 솔로 홈런!`);
                        }
                        if(runner==1) {
                            userScoreNum = 1;
                            userscore();
                            textbox2El.innerHTML = (`휴먼 투런 홈런!`);
                        }
                        if(runner==2) {
                            userScoreNum = 2;
                            userscore();
                            textbox2El.innerHTML = (`휴먼 쓰리런 홈런!`);
                        }
                        if(runner==3) {
                            userScoreNum = 3;
                            userscore();
                            textbox2El.innerHTML = (`휴먼 만루 홈런!! 그랜드슬램!!!`);
                        }
                        runner = 0;
                    } else {
                        effect_reset();
                        effectEl.classList.add("hit");
                        runnercount();
                        if(runner>3) {
                            userScoreNum = 0;
                            userscore();
                            textbox2El.innerHTML = (`휴먼 안타를 쳤습니다! 득점!`);
                        } else {
                            textbox2El.innerHTML = (`휴먼 안타를 쳤습니다!`);
                        }
                    }
                } else {
                    userBattingOut = Math.random();
                    if (userBattingOut < 0.25) {
                        effect_reset();
                        effectEl.classList.add("out");
                        sb_reset();
                        outcount(); 
                        textbox2El.innerHTML=(`아웃! 내야 땅볼 입니다.`)
                    }
                    if (userBattingOut <0.5 && userBattingOut >= 0.25) {
                        effect_reset();
                        effectEl.classList.add("out");
                        sb_reset();
                        outcount(); 
                        textbox2El.innerHTML=(`아웃! 내야 플라이 입니다.`)
                    }
                    if (userBattingOut <0.75 && userBattingOut >= 0.5) {
                        effect_reset();
                        effectEl.classList.add("out");
                        sb_reset();
                        outcount(); 
                        textbox2El.innerHTML=(`아웃! 외야 플라이 입니다.`)
                    }
                    if (userBattingOut <1 && userBattingOut >= 0.75) {
                        effect_reset();
                        effectEl.classList.add("out");
                        sb_reset();
                        outcount(); 
                        textbox2El.innerHTML=(`파울 플라이 아웃 입니다!`)
                        
                    }
                }
            //com이 볼을 던졌으나 타격시도하여 헛스윙인 상황
            } else {
                effect_reset();
                strikecount();
                textbox2El.innerHTML=(`휴먼 헛스윙!`)
            }
        }
    }
    btn2.addEventListener("click", function(){
        comwait();
    })
    //이펙트 초기화
    effect_reset();
    text_reset();
    //버튼 누르면 텍스트박스 호출
    function comwait() {
        //버튼 누르면 텍스트박스 호출
        textbox2El.classList.add("on");
        textboxEl.classList.add("on");
        if(isComputer) {
            let com_ball = Math.random();
                //user가 볼을 던졌을때 com이 헛스윙할 확률 60%
                if(com_ball<0.7) {
                    strikecount();
                    textbox2El.innerHTML=(`챗GPT 헛스윙!`)   
                //user가 볼을 던졌을때 com이 바라볼 확률 40%
                } else {
                    ballcount();
                    textbox2El.innerHTML = (`바라봅니다!`);
                }
        } else if(!isComputer) {
            let com_ball = Math.random();
                //user가 멍때릴때 스트라이크 확률 70%
                if(com_ball<0.7) {
                    strikecount();
                    textbox2El.innerHTML=(`바라만 봅니다. 스트라이크!!`)
                //user가 멍때렸을때 볼확률 30%
                } else {
                    ballcount();
                    textbox2El.innerHTML = (`바라봅니다!`);
                }
        }
    }
    //필살기버튼
    btnSpecial.addEventListener("click", function(){
        special();   
    })
    function special() {
        //버튼 누르면 텍스트박스 호출
        textbox2El.classList.add("on");
        textboxEl.classList.add("on");
        //챗GPT가 공격일때 무조건 삼진아웃
        if(isComputer) {
            sb_reset();
            outcount();
            textboxEl.innerHTML=(`투수 마구입니다!!`)
            textbox2El.innerHTML=(`삼진아웃!`)
            //한번만 사용 가능하기때문에 사용하자마자 바로 비활성화
            btnSpecial.disabled = true;
            btnSpecial.classList.add("remove");			
        }
        //휴먼이 공격일때 무조건 홈런
        else if(!isComputer) {
            //주자 초기화
            runner_reset();
            //주자 숫자별 점수 
            if(runner==0) {
                userScoreNum = 0;
                userscore();
                textbox2El.innerHTML = (`휴먼 솔로 홈런!`);
            }
            if(runner==1) {
                userScoreNum = 1;
                userscore();
                textbox2El.innerHTML = (`휴먼 투런 홈런!`);
            }
            if(runner==2) {
                userScoreNum = 2;
                userscore();
                textbox2El.innerHTML = (`휴먼 쓰리런 홈런!`);
            }
            if(runner==3) {
                userScoreNum = 3;
                userscore();
                textbox2El.innerHTML = (`휴먼 만루 홈런! 그랜드슬램!!!`);
            }
            runner = 0;
            textboxEl.innerHTML=(`홈런을 예고했습니다!!`)
            //한번만 사용 가능하기때문에 사용하자마자 바로 비활성화
            btnSpecial.disabled = true;	
            btnSpecial.classList.add("remove");	

        }
    }
}

// SBO표시 함수
function strikeCircle() {
    if(strike_count==0) {
        strikeEl[0].style.backgroundColor = "";
        strikeEl[1].style.backgroundColor = "";
    }
    if(strike_count==1) {
        strikeEl[0].style.backgroundColor = "yellow";
        strikeEl[1].style.backgroundColor = "";
    }
    if(strike_count==2) {
        strikeEl[0].style.backgroundColor = "yellow";
        strikeEl[1].style.backgroundColor = "yellow";
    }
}
function ballCircle() {
    if(ball_count==0) {
        ballEl[0].style.backgroundColor = "";
        ballEl[1].style.backgroundColor = "";
        ballEl[2].style.backgroundColor = "";
    }
    if(ball_count==1) {
        ballEl[0].style.backgroundColor = "green";
        ballEl[1].style.backgroundColor = "";
        ballEl[2].style.backgroundColor = "";
    }
    if(ball_count==2) {
        ballEl[0].style.backgroundColor = "green";
        ballEl[1].style.backgroundColor = "green";
        ballEl[2].style.backgroundColor = "";
    }
    if(ball_count==3) {
        ballEl[0].style.backgroundColor = "green";
        ballEl[1].style.backgroundColor = "green";
        ballEl[2].style.backgroundColor = "green";
    }
    
}
function outCircle() {
    if(out_count==0) {
        outEl[0].style.backgroundColor = "";
        outEl[1].style.backgroundColor = "";
    }
    if(out_count==1) {
        outEl[0].style.backgroundColor = "red";
        outEl[1].style.backgroundColor = "";
    }
    if(out_count==2) {
        outEl[0].style.backgroundColor = "red";
        outEl[1].style.backgroundColor = "red";
    }
}

//아웃 카운터
function outcount(){
    out_count++;
    //1아웃
    if (out_count==1){ 
        //텍스트 출력
        textboxEl.innerHTML = "1아웃!"
        //스트라이크 카운트 초기화
        sb_reset();
        //전광판 아웃카운트1 불켜짐
        outCircle();
    }
    //2아웃
    if (out_count==2){
        textboxEl.innerHTML = "2아웃!"
        sb_reset();
        outCircle();
    } 
    //3아웃
    if(out_count==3){
        sb_reset();
        runner_reset();
        out_count = 0;
        runner = 0;
        textboxEl.innerHTML = "3아웃! 공수체인지!"
        outCircle();
        //SBO 전광판 초기화
        //턴교체
        if(isComputer) {
            //com턴이 true일때, com턴 false로 변경
            isComputer = false;
            cominningEl.classList.remove("on");
            userinningEl.classList.add("on");
            btn1.innerHTML = "타격";
            btn2.innerHTML = "바라보기";
            btnSpecial.innerHTML = "예고홈런";
        } else {
            //com턴이 false일때, com턴 true로 변경
            isComputer = true;
            cominningEl.classList.add("on");
            userinningEl.classList.remove("on");
            btn1.innerHTML = "스트라이크";
            btn2.innerHTML = "볼";
            btnSpecial.innerHTML = "마구";
            //이닝 + 1
            game_inning = game_inning + 1;
            inningEl.innerHTML = game_inning;
            if(game_inning == 10) {
                inningEl.innerHTML = (`게임종료`);
                inningHoe.innerHTML = (``);
                inningEl.innerHTML = (``);
                cominningEl.classList.remove("on");
                userinningEl.classList.remove("on");
                btn1.disabled = true;
                btn2.disabled = true;
                if(comScore > userScore){
                    textboxEl.innerHTML = (`챗GPT가 이겼습니다! 운이 없군요!`)
                    effectEl.classList.add("lose")
                }else if(comScore < userScore){
                    textboxEl.innerHTML = (`휴먼이 이겼습니다! 축하합니다!`)
                    effectEl.classList.add("win")
                }else if(comScore == userScore) {
                    textboxEl.innerHTML = (`챗GPT와 휴먼이 비겼습니다! 아깝네요!`)
                    effectEl.classList.add("draw")
                }
            }
        }
    }      
}

//볼카운터
function ballcount(){
    ball_count++;
    //1볼
    if (ball_count==1){ 
        effect_reset();
        //전광판 볼카운트1 불켜짐 
        ballCircle();
        textboxEl.innerHTML = "원볼!" 
    }
    //2볼
    if (ball_count==2){
        ballCircle();
        textboxEl.innerHTML = "투볼!" 
    }
    //3볼
    if (ball_count==3){
        ballCircle();
        textboxEl.innerHTML = "쓰리볼!"
    }
    //4볼
    if (ball_count==4){
        textboxEl.innerHTML = "볼넷!! 1루 진출합니다."
        runnercount(); 
        if(runner>3) {
            if(isComputer) {
                comScoreNum = 0;
                comscore();
            } else {
                userScoreNum = 0;
                userscore();
            }
        } 
        //볼,스트라이크 초기화
        ball_count=0;   
        strike_count=0;
        ballCircle();
        strikeCircle(); 
    }
}

// 스트라이크 함수
function strikecount(){
    strike_count++; //스트라이크 카운터 증가
    if (strike_count==1){
        effect_reset();
        strikeCircle();
        textboxEl.innerHTML = "원 스트라이크!"
    }
    if (strike_count==2){
        strikeCircle();
        textboxEl.innerHTML = "투 스트라이크!"
    } 
    if (strike_count==3){ //3스트라이크시 불 다꺼지 아웃함수 호충
        console.log(strike_count);
        effectEl.classList.add("strikeout");
        sb_reset();
        outcount();  
        textboxEl.innerHTML = "삼진아웃!"
    }
}

//점수 함수
function comscore() {
    comScoreNum++;
    comScore += comScoreNum;
    comScoreEl.innerHTML = comScore;
}
function userscore() {
    userScoreNum++;
    userScore += userScoreNum;
    userScoreEl.innerHTML = userScore;
}

//주자 함수
//1,2,3루 주자 활성화
function runner1() {
    run1.classList.add("on");
} 
function runner2() {
    run2.classList.add("on");
}
function runner3() {
    run3.classList.add("on");
}
//1,2,3루 주자 비활성화
function runner1remove() {
    run1.classList.remove("on");
} 
function runner2remove() {
    run2.classList.remove("on");
}
function runner3remove() {
    run3.classList.remove("on");
}
function runnercount() {
    runner++;
    if(runner==1) {
        runner1();
    }
    if(runner==2) {
        runner2();
    }
    if(runner==3) {
        runner3();
    }
}

//초기화

//스트라이크, 볼 초기화
function sb_reset(){
    ball_count=0;   
    strike_count=0;
    ballCircle();
    strikeCircle(); 
}
//이펙트 초기화
function effect_reset(){
    effectEl.classList.remove("hit");
    effectEl.classList.remove("out");
    effectEl.classList.remove("strikeout");
    effectEl.classList.remove("homerun");
}
//주자 초기화
function runner_reset() {
    runner1remove();
    runner2remove();
    runner3remove();
}
//텍스트 초기화
function text_reset() {
    textbox2El.innerHTML="";
    textboxEl.innerHTML="";
}











