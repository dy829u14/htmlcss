let a = document.querySelectorAll(".a"); //주자 위치 배열
let b = document.querySelector("#be") //휘두르기 버튼
let see = document.querySelector("#see") //지켜보기 버튼
let stc = document.querySelectorAll(".s") //스트라이크 원
let bac = document.querySelectorAll(".b") //볼 원
let outc = document.querySelectorAll(".o") //아웃 원
let btt = document.querySelector("#bt"); //타자 행동
let pii = document.querySelector("#pi") //투수 행동
let sta = document.querySelector("#sta") //투수 스트라이크 버튼
let baa = document.querySelector("#baa") //투수 볼 버튼
let comsocre = document.querySelector("#comscore") // 컴퓨터 점수
let userscore = document.querySelector("#userscore") // 유저 점수
let display = document.querySelector("#display"); //플레이 표시
let setuser = 0; //가변 유저 점수
let setcom = 0; //가변 컴퓨터 점수
let st = 0; //스트라이크 카운터
let ba = 0; //볼 카운터
let out = 0; //아웃 카운터
let play = true; //플레이어 공격 수비 확인
let d1 = false; //1루 존재여부
let d2 = false; //2루 존재여부
let d3 = false; //3루 존재여부
let sto = false; //2스트라이크 파울 체크용
let round = 1; // 회차에 표시될 숫자
let inout = true; // 회차 초 / 말 구분용
let roundplay = document.querySelector("#roundplay") //회차 표시
let ak = document.querySelector("#ak") //공격턴 표시화면
let timer = new Date(); //시간 생성
let timerdisplay = document.querySelector("#timedisplay"); //시간 표현
let homerun = document.querySelector("#homerun") //홈런 이미지
let homeck = false; //홈런 이미지 온오프 관리용
const sum1 = 1; //고정점수 1점
const sum2 = 2; //고정점수 2점
const sum3 = 3; //고정점수 3점
const sum4 = 4; //고정점수 4점
pii.style.opacity = "0"; // 투수 조작 숨기기
a.forEach(a=>a.style.opacity = "0") // 주자 숨기기
display.innerHTML = "경기시작" //기본 화면 세팅
roundplay.innerHTML = "1회 초" //기본 화면 세팅
ak.innerHTML = "사용자 공격 차례" //기본 화면 세팅
//실시간 시간흐리기
timerdisplay.innerHTML = `${timer.getFullYear()}년 ${timer.getMonth()}월 ${timer.getDate()}일 ${timer.getHours()}시 ${timer.getMinutes()}분 ${timer.getSeconds()}초`
setInterval(time,1000); //1초마다 시간 객체를 생성해서 시간 화면에 지정
function time(){
    let timer = new Date();
    timerdisplay.innerHTML = `${timer.getFullYear()}년 ${timer.getMonth()+1}월 ${timer.getDate()}일 ${timer.getHours()}시 ${timer.getMinutes()}분 ${timer.getSeconds()}초`
}
//휘두루기
b.addEventListener("click",aa)
function aa(){
    coloronoff(b)     //휘두루기 버튼 클릭시 색깔 추가 및 제거[버튼은 매개변수로 받는다.]
    coloronoff(sta)    //스트라이크 버튼 클릭시 색깔 추가 및 제거[버튼은 매개변수로 받는다.]
    let ch = Math.floor(Math.random()*99) // 0~99까지의 랜덤 숫자를 출력
    if(ch>=0&&ch<=9){ // 0 ~ 9가 나올경우 실행
        a1() //1루타 함수
        display.innerHTML = "1루타"
        discolor(); //색깔 변경 함수 호출
    }
    if(ch>=10&&ch<=16){ // 10 ~ 16이 나올경우 실행
        a2() //2루타 함수
        display.innerHTML = "2루타"
        discolor();
    }
    if(ch>=17&&ch<=19){ // 17~19가 나올경우 실행
        a3() // 3루타 함수
        display.innerHTML = "3루타"
        discolor();
    }
    if(ch>=20&&ch<=20){ // 20이 나올경우 실행
        a4() // 홈런 함수
    }
    if(ch>=21&&ch<=75){ // 21~75가 나올경우 실행
        let or = Math.floor(Math.random()*99) // 21~75가 나왔을때 0~99까지의 랜덤 숫자를 출력
        if(or>=0&&or<=66){ // 0 ~ 66이 나올때 실행
            display.innerHTML = "스트라이크"
            discolor();
            sto = false;
        }
        else{ // 66초과의 숫자가 나올때 실행
            display.innerHTML = "파울" //파울을 디스플레이에 출력
            discolor();
            if(st==2){
                sto = true; //스트라이크 카운터가 2일때 참
            }
        }
        see2(); // 스트라이크 함수
    }
    if(ch>=76&&ch<=99){ // 76 ~ 99사이 숫자가 나올경우 실행
        let or2 = Math.floor(Math.random()*99) //76 ~ 99가 나왔을때 0~99까지의 랜덤 숫자를 출력
        if(or2<=0&&or2>=49){ //0~49사이 숫자가 나올경우 실행
            display.innerHTML = "플라이 아웃" //디스플레이 내용을 플라이 아웃으로 변경
            discolor();
        }
        else{
            display.innerHTML = "파울 플라이 아웃" // 디스플레이 내용을 파울 플라이 아웃으로 변경
            discolor();
        }
        outt() // 아웃 함수
    }
    userscore.innerHTML = setuser //유저 점수 갱신
    comsocre.innerHTML = setcom //컴퓨터 점수 갱신
}
//주자 생성 삭제
function Positions(){
    a[1].style.opacity = d1 ? "1" : "0" //d1 = 베이스 1이 트루일때만 주자를 표시
    a[2].style.opacity = d2 ? "1" : "0" //d2 = 베이스 2가 트루일때만 주자를 표시
    a[3].style.opacity = d3 ? "1" : "0" //d3 = 베이스 3가 트루일때만 주자를 표시
}
//1루타
function a1(){
    reset(); //스트라이크 / 볼 카운터를 초기화해주는 함수
    //루가 모두 비어있을때
    if(!d1&&!d2&&!d3){ // d1 / d2 /d3는 각숫자에 해당하는 루에 선수가있는지없는지 확인하는 변수
        d1 = true; // d1 true = 1루에 선수가 있음
    }
    //1루가 채워져있을때
    else if(!d2&&!d3){
        d2 = true; // d2 true = 2루에 선수가 있음
    }
    //2루가 채워져있을때
    else if(!d1&&!d3){
        d1 = true;
        d2 = false;
        d3 = true; // d3 true = 3루에 선수가 있음
    }
    //3루가 채워져있을때
    else if(!d1&&!d2){
        d1 = true;
        d3 = false;
        sum(sum1) //매개변수를 점수에 추가
    }
    //1루 2루가 채워져있을때
    else if(!d3){
        d3 = true;

    }
    //1루 3루가 채워져있을때
    else if(!d2){
        sum(sum1)
        d2 = true;
        d3 = false;

    }
    //2루 3루가 채워져있을때
    else if(!d1){
        sum(sum1)
        d1 = true;
        d2 = false;

    }
    //만루 상황
    else{
        sum(sum1)
    }
    Positions();
}
//2루타
function a2(){
    reset();
    const sum2 = 2;
    //루가 모두 비어있을때
    if(!d1&&!d2&&!d3){
        d2 = true;
    }
    //1루가 채워져있을때
    else if(!d2&&!d3){
        d1 = false;
        d2 = true;
        d3 = true;

    }
    //2루가 채워져있을때
    else if(!d1&&!d3){
        sum(sum1)
    }
    //3루가 채워져있을때
    else if(!d1&&!d2){
        sum(sum1)
        d3 = false;

    }
    //1루 2루가 채워져있을때
    else if(!d3){
        sum(sum1)
        d1 = false;
        d3 = true;

    }
    //1루 3루가 채워져있을때
    else if(!d2){
        sum(sum1)
        d1 = false;
        d2 = true;
    }
    //2루 3루가 채워져있을때
    else if(!d1){
        sum(sum2)
        d3 = false;
    }
    //만루 상황
    else{
        sum(sum2)
        d1 = false;
    }
    Positions();
}
//3루타
function a3(){
    reset();
    //루가 모두 비어있을때
    if(!d1&&!d2&&!d3){
        d3 = true;
    }
    //1루가 채워져있을때
    else if(!d2&&!d3){
        sum(sum1)
        d1 = false;
        d3 = true;
    }
    //2루가 채워져있을때
    else if(!d1&&!d3){
        sum(sum1)
        d2 = false;
        d3 = true;
    }
    //3루가 채워져있을때
    else if(!d1&&!d2){
        sum(sum1)
    }
    //1루 2루가 채워져있을때
    else if(!d3){
        sum(sum2)
        d1 = false;
        d2 = false;
        d3 = true;
    }
    //1루 3루가 채워져있을때
    else if(!d2){
        sum(sum2)
        d1 = false;
    }
    //2루 3루가 채워져있을때
    else if(!d1){
        sum(sum2)
        d2 = false;
    }
    //만루 상황
    else{
        sum(sum3)
        d1 = false;
        d2 = false;
    }
    Positions()
}
//홈런
function a4(){
    reset();
    //모든 루가 비워져있을때
    if(!d1&&!d2&&!d3){
        sum(sum1)
    }
    //1루가 채워져있을때
    else if(!d2&&!d3){
        sum(sum2)
        d1 = false;
    }
    //2루가 채워져있을때
    else if(!d1&&!d3){
        sum(sum2)
        d2 = false;
    }
    //3루가 채워져있을때
    else if(!d1&&!d2){
        sum(sum2)
        d3 = false;
    }
    //1루 2루가 채워져있을때
    else if(!d3){
        sum(sum3)
        d1 = false;
        d2 = false;
    }
    //1루 3루가 채워져있을때
    else if(!d2){
        sum(sum3)
        d1 = false;
        d3 = false;
    }
    //2루 3루가 채워져있을때
    else if(!d1){
        sum(sum3)
        d2 = false;
        d3 = false;
    }
    //만루 상황
    else{
        sum(sum4)
        d1 = false;
        d2 = false;
        d3 = false;
    }
    Positions()
    homerun.style.width = "650px" //홈런의 가로를 650px로
    homerun.style.height = "350px" //홈런의 세로를 350px로
    homeck = true; //홈런 이미지가 떠있으면 true 없으면 false
    onoff(); //homeck에 상태에 따라 다르게 실행
    setTimeout(function(){ //일정시간후 실행[일회성]
        homerun.style.width = "0px" 
        homerun.style.height = "0px"
        homeck = false;
        onoff();
    },1500)
}
//홈런시 버튼 활성화 비활성화
function onoff(){ // homeck가 true일경우 모든 버튼을 비활성화
    if(homeck){
        be.disabled = true;
        see.disabled = true;
        sta.disabled = true;
        baa.disabled = true;
    } //homeck가 false이고 play가 true일경우 타자관련 버튼만 활성화
    else if(!homeck&&play){
        be.disabled = false;
        see.disabled = false;
    } //homeck가 false이고 play도 false일경우 투수관련 버튼만 활성화
    else if(!homeck&&!play){
        sta.disabled = false;
        baa.disabled = false;
    }
}
//지켜보기
see.addEventListener("click",see1)
function see1(){
    coloronoff(see)     //지켜보기 버튼 클릭시 색깔 추가 및 제거[버튼은 매개변수로 받는다.]
    if(st<2){ //스트라이크 카운터가 2보다 작을경우
        let stb = Math.floor(Math.random()*3+1) // 1~3까지의 랜덤한 숫자
        if(stb<=2){ // 2보다 낮은수가 나올경우
            display.innerHTML = "스트라이크"
            discolor();
            see2();
        }
        else if(stb==3){ // 3이 나올경우
            see3();
        }
        else if(stb==4){
            display.innerHTML = "인터벌"
        }
    }
    else if(st==2){ //스트라이크 카운터가 2일경우
        let sta = Math.floor(Math.random()*99) //0~99까지의 랜덤한 숫자
        if(sta>=0&&sta<=49){ // 0 ~ 49사이의 숫자가 나올경우
            display.innerHTML = "스트라이크"
            discolor();
            see2() //스트라이크
        }
        else if(sta>=50&&sta<=94) { //50 ~ 94사이의 숫자가 나올경우
            see3() //볼
        }
        else if(sta>=95){
                a1(); //1루씩 진루
                display.innerHTML = "낫아웃 1루씩 진루"
                discolor();
            // 폭투[낫아웃] (공흘림)
        }
    }
    userscore.innerHTML = setuser //유저 점수 갱신
    comsocre.innerHTML = setcom //컴퓨터 점수 갱신
}
//스트라이크
function see2(){
    st += 1; //스트라이크 카운터
    if(!sto){ //sto = 스트라이크가 2이고 파울이 발생한경우 true로 변경됨
        if(st==1){ //스트라이크 카운터가 1일경우
            stc[0].style.background = "red"; //1번 스트라이크 원을 붉은색으로
        }
        else if(st==2){ //스트라이크 카운터가 2일경우
            stc[1].style.background = "red"; //2번 스트라이크 원을 붉은색으로
        }
        else if(st==3){ //스트라이크 카운터가 3일경우
            display.innerHTML = "삼진 아웃"
            outt(); // 아웃 함수 호출
        }
    }
}
//볼
function see3(){
    coloronoff(baa)     //볼 버튼 클릭시 색깔 추가 및 제거[버튼은 매개변수로 받는다.]
        display.innerHTML = "볼"
        discolor();
        ba += 1; //함수가 실행될때마다 볼 카운터를 1증가
        if(ba==1){ // 볼 카운터에 해당하는 원에 색추가 / 4일경우 원에 색깔을 모두 제거
            bac[0].style.background = "green"
        }
        else if(ba==2){
            bac[1].style.background = "green"
        }
        else if(ba==3){
            bac[2].style.background = "green"
        }
        else if(ba==4){
            see4();
        }
    userscore.innerHTML = setuser
    comsocre.innerHTML = setcom
}
//포볼
function see4(){
    display.innerHTML = "포볼"
    discolor();
    reset();
    if(!d1&&!d2&&!d3){
        d1 = true;
    }
    //1루가 채워져있을때
    else if(!d2&&!d3){
        d2 = true;
    }
    //2루가 채워져있을때
    else if(!d1&&!d3){
        d1 = true;
    }
    //3루가 채워져있을때
    else if(!d1&&!d2){
        d1 = true;
    }
    //1루 2루가 채워져있을때
    else if(!d3){
        d3 = true;
    }
    //1루 3루가 채워져있을때
    else if(!d2){
        d2 = true;
    }
    //2루 3루가 채워져있을때
    else if(!d1){
        d1 = true;
    }
    //만루 상황
    else{
        sum(sum1)
    }
    Positions()
}
//아웃카운터
function outt(){
    reset();
    discolor();
    out += 1; // 함수가 실행될때마다 아웃카운터를 1씩 증가
    // 아웃카운터에 해당하는 원에 색깔을 추가 / 3일경우 원에 색깔을 제거
    if(out == 1){
        outc[0].style.background = "red"
    }
    else if(out == 2){
        outc[1].style.background = "red"
    }
    else if(out==3){
        tu();
    }
}
//공수교대
function tu(){ //아웃카운터가 3일경우 실행되는함수
    if(out==3){
        reset();
        display.innerHTML = "쓰리아웃 공수 교대" // 디스플레이 글씨를 수정하고
        discolor();
        out = 0 // 아웃 카운터 변수를 초기화
        outc[0].style.background = "none" //아웃카운터를 표시하는 원의 색깔을 제거
        outc[1].style.background = "none" //아웃카운터를 표시하는 원의 색깔을 제거
        d1 = false; //1루 주자를 제거
        d2 = false; //2루 주자를 제거
        d3 = false; //3루 주자를 제거
        if(play){ //play는 사용자가 공격인지를 확인하는 변수 / 사용자가 공격턴일경우
            pii.style.opacity = "1" //투수를 활성화
            btt.style.opacity = "0" //타자를 비활성화
            play = false; //사용자가 공격이 아니므로 거짓으로 변경
            b.disabled = true //휘두리기 버튼을 비활성화
            see.disabled = true //지켜보기 버튼을 비활성화
            sta.disabled = false //스트라이크 버튼을 활성화
            baa.disabled = false //볼 버튼을 활성화
            inout = false; // 회차 초에 사용자가 공격이였으니 회차 말이되므로 거짓
            if(!inout){ //회차가 진실이면 초 / 거짓이면 말
                roundplay.innerHTML = `${round}회 말` //회차의 글을 말로 변경
                ak.innerHTML = "컴퓨터 공격 차례" //컴퓨터의 공격턴을 알리는 글
            }
        }
        else {
            pii.style.opacity = "0" //투수를 비활성화
            btt.style.opacity = "1" //타자를 활성화
            play = true; //사용자 공격턴이므로 진실
            b.disabled = false //휘두르기 버튼을 활성화
            see.disabled = false //지켜보기 버튼을 활성화
            sta.disabled = true //스트라이크버튼을 비활성화
            baa.disabled = true //볼 버튼을 비활성화
            round += 1; //회차의 수를 1증가
            over(); //게임종료 함수를 출력 / 조건에 맞을경우 게임을종료하고 초기화
            inout = true; //회차 초가 되므로 진실
            if(inout){
                roundplay.innerHTML = `${round}회 초`; // 회차의 글을 초로 변경
                ak.innerHTML = "사용자 공격 차례" //컴퓨터의 공격턴을 알리는 글
            }
        }
    }
    Positions();
}
//투수 스트라이크
sta.addEventListener("click",aa); //투수가 스트라이크 버튼을 눌렀을때
//투수 볼
baa.addEventListener("click",function(){
    coloronoff(baa);
    let con = Math.floor(Math.random()*99)
    if(con>=0&&con<49){
        see3(); //볼 함수 호출
    }
    else if(con>=50&&con<67){
        display.innerHTML = "파울" //파울을 디스플레이에 출력
        discolor();
        if(st==2){
            sto = true; //스트라이크 카운터가 2일때 참
        }
        see2(); //스트라이크 함수 호출
    }
    else if(con>=67&&con<84){
        display.innerHTML = "헛스윙"
        discolor();
        sto = false;
        see2(); //스트라이크 함수 호출
    }
    else if(con>=84){
        display.innerHTML = "파울 플라이 아웃"
        discolor();
        outt(); //아웃 함수 호출
    }
}) //투수가 볼 버튼을 눌렀을때
//게임 종료
function over(){ // 조건에 맞으면 게임을 종료하는 함수
    if(round==10){ //라운드가 10일경우
        display.innerHTML = "경기시작"
        ak.innerHTML = "사용자 공격"
        round = 1;
        if(setuser==setcom){ //유저와 컴퓨터의 점수가 같으면 비겼습니다를 출력하고 게임을 초기화
            alert(`사용자 ${setuser} 대 컴퓨터 ${setcom}로 비겼습니다.`)
            setuser = 0;
            setcom = 0;
            userscore.innerHTML = setuser
            comsocre.innerHTML = setcom
            return
        }
        else if(setuser>setcom){ //유저가 컴퓨터보다 점수가 높으면 승리하셨습니다를 출력하고 게임을 초기화
            alert(`사용자 ${setuser} 대 컴퓨터 ${setcom}로 승리하셨습니다.`)
            setuser = 0;
            setcom = 0;
            userscore.innerHTML = setuser
            comsocre.innerHTML = setcom
            return
        }
        else if(setuser<setcom){ //유저가 컴퓨터보다 점수가 적을경우 패배하셨습니다를 출력하고 게임을 초기화
            alert(`사용자 ${setuser} 대 컴퓨터 ${setcom}로 패배하셨습니다.`)
            setuser = 0;
            setcom = 0;
            userscore.innerHTML = setuser
            comsocre.innerHTML = setcom
            return
        }
    }
}
//볼카운터 초기화
function reset(){ //스트라이크와 볼 카운터를 초기화주는 함수
    stc[0].style.background = "none"
    stc[1].style.background = "none"
    bac[0].style.background = "none"
    bac[1].style.background = "none"
    bac[2].style.background = "none"
    st = 0;
    ba = 0;
    sto = false;
}
//버튼 클릭시 색깔추가및 제거
function coloronoff (e) {
    e.style.background = "#bbb"
    setTimeout(function(){
    e.style.background = "#fff"
    },200)
}
//점수 추가 함수
function sum(a){ //매개변수를 점수에 추가
    if(play){ //유저가 공격일경우
        setuser += a;
    }
    else if(!play){ //컴퓨터가 공격일경우
        setcom += a;
    }
}
//디스플레이 글씨 색깔 랜덤하게 바꾸기
function discolor(){ // 1 ~ 5까지 랜덤숫자가 돌아가며 각숫자에 해당하는 색깔로 변경됨
    let randomcolor = Math.floor(Math.random()*5+1)
    if(randomcolor==1){
        display.style.color = "red"
    }
    else if(randomcolor==2){
        display.style.color = "blue"
    }
    else if(randomcolor==3){
        display.style.color = "#000"
    }
    else if(randomcolor==4){
        display.style.color = "#ccc"
    }
    else if(randomcolor==5){
        display.style.color = "green"
    }
}