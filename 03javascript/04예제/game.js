//html요소
const shotleftElem = document.querySelector("#shot-left");
const comScoreElem = document.querySelector("#computer-score");
const userScoreElem = document.querySelector("#user-score");
const textElem = document.querySelector("#text");
const comBtn = document.querySelector(".btn-computer");
const userBtns = document.querySelectorAll(".btn-user");

//변수설정
//컴퓨터점수, 사람점수, 남은 슛 횟수
let comScore = 0;
let userScore = 0;
let shotLeft = 5;
let isComputerTurn = true;

//컴퓨터 먼저 슛을 한다
//2점슛인지 3점슛인지 랜덤으로 결정
//2점슛 50%확률로 성공, 3점슛은 30%확률로 성공
//컴퓨터가 슛을 할때 동작하는 함수
function onComputerShoot() {
    let shootType = Math.random() > 0.5 ? 2 : 3;
    if(shootType==2) {
        //50%확률로 성공
        //성공했을때 글자를 변경 컴퓨터 점수 업데이트
        if(Math.random()<0.5) {
            comScore = comScore+2;
            comScoreElem.innerHTML = comScore;
            textElem.innerHTML = "컴퓨터 2점슛 성공";
        }else {
            textElem.innerHTML = "실패";
        }
    }else {
        //30%확률로 성공
        if(Math.random()<0.3) {
            comScore = comScore+3;
            comScoreElem.innerHTML = comScore;
            textElem.innerHTML = "컴퓨터 3점슛 성공";
        }else {
            textElem.innerHTML = "실패";
        }
    }
    isComputerTurn = false;
    comBtn.disabled = true;
    userBtns.forEach(btn=>{
        btn.disabled = false;
    })
}
//유저가 슛을 클릭했을때 실행되는 함수
function onUserShoot(num) {
    let ran = num== 2 ? 0.5 : 0.3;
    if(Math.random()<ran) {
        userScore = userScore+num;
        userScoreElem.innerHTML = userScore;
        textElem.innerHTML = "유저 "+num+"점슛 성공";
    }else {
        textElem.innerHTML = "실패";
    }
    //남은 슛 횟수를 1씩 뺌
    shotLeft = shotLeft-1;
    shotleftElem.innerHTML = shotLeft;
    isComputerTurn = true;
    comBtn.disabled = false;
    userBtns.forEach(btn=>{
        btn.disabled = true;
    })
    if(shotLeft==0) {
        gameOver();
    }
}
function gameOver() {
    if(userScore>comScore) {
        textElem.innerHTML = "유저 승리"
    }else if(userScore==comScore) {
        textElem.innerHTML = "무승부"
    }else {
        textElem.innerHTML = "컴퓨터 승리"
    }
    comBtn.disabled = true;
    userBtns.disabled = true;
}

comBtn.addEventListener("click",onComputerShoot);
userBtns[0].addEventListener("click",function() {
    onUserShoot(2);
});
userBtns[1].addEventListener("click",function() {
    onUserShoot(3);
});