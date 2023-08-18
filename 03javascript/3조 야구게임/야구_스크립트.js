let startPage = document.querySelector("#start");
let btn = document.querySelector("#choose"); 
let message = document.querySelector("#message");
let led = document.querySelector("#LED");
let btn_1 = document.querySelector("#choose button:nth-child(1)");
let btn_2 = document.querySelector("#choose button:nth-child(2)");
let team_Now = "userHit"; 
let base = [0,0,0,0];
let ball;
let strike;
let out;
let score;
let pitcher = document.querySelector("#person-투수");
let catcher = document.querySelector("#person-포수");
let hitter = document.querySelector("#person-타자");
let p1 = document.querySelector("#person-1루");
let p2 = document.querySelector("#person-2루");
let p3 = document.querySelector("#person-3루");


function press_Start(){
    btn.style.opacity = "1";
    text.style.opacity = "1";
    led.style.opacity = "1";
    startPage.style.display = "none";
    document.querySelector("#blackbg").style.display = "none";
}
// PressStart버튼 누르기
let startbtn = document.querySelector("#start button");
startbtn.addEventListener("click", function(){
    press_Start();
    game_on("userHit");
})

let inning_count = 0;

function change_team(){
    if (team_Now=="userHit"){
        team_Now="comHit";
        base = [0,0,0,0];
        game_on("comHit");
        change_clear();
    }
    else{
        team_Now="userHit";
        base = [0,0,0,0];
        game_on("userHit");
        change_clear();
    }
}

function change_clear() {
    console.log("플레이어 초기화 실행")
    p1.style.display = "none"
    p2.style.display = "none"
    p3.style.display = "none"    
}

function game_on(team){
    if(team == "userHit"){
        pitcher.style.backgroundImage = "url(./images/투수_red.png)";
        hitter.style.backgroundImage = "url(./images/타자1_blue.png)";
        catcher.style.backgroundImage = "url(./images/포수_red.png)";
        p1.style.backgroundImage = "url(./images/스탠딩_blue.png";
        p2.style.backgroundImage = "url(./images/스탠딩_blue.png";
        p3.style.backgroundImage = "url(./images/스탠딩_blue.png";
        inning_count++;
        console.log("유저팀 게임시작");
        const p = document.createElement("p")
        document.querySelector("#message").prepend(p);
        p.innerHTML = `${inning_count}회차 초`
        console.log(base);
        ball=0;
        strike=0
        out=0;
        score=0;
        btn_transition();
        next_player();
    }
    else if(team == "comHit"){
        pitcher.style.backgroundImage = "url(./images/투수_blue.png)";
        hitter.style.backgroundImage = "url(./images/타자1_red.png)";
        catcher.style.backgroundImage = "url(./images/포수_blue.png)";
        p1.style.backgroundImage = "url(./images/스탠딩_red.png";
        p2.style.backgroundImage = "url(./images/스탠딩_red.png";
        p3.style.backgroundImage = "url(./images/스탠딩_red.png";
        
        console.log("컴팀 게임시작");
        const p = document.createElement("p")
        document.querySelector("#message").prepend(p);
        p.innerHTML = `${inning_count}회차 말`
        console.log(base);
        ball=0;
        strike=0;
        out=0;
        score=0;
        btn_transition();
        next_player();
    }
    return;
}


// 버튼 스타일&&이벤트
function btn_transition(){
    console.log("teamNow"+team_Now+"!!!!!!!!!!!!!!!!!!!!!!!!")
    if(team_Now == "userHit"){ //유저 순서

        btn_1.innerHTML = "지켜보기";
        btn_2.innerHTML = "스윙하기";
        btn_1.addEventListener("mouseenter",function(){
            btn_1.style.background = "#84CCFC";
        })
        btn_1.addEventListener("mouseleave",function(){
            btn_1.style.background = "none";
        })
        btn_2.addEventListener("mouseenter",function(){
            btn_2.style.background = "#84CCFC";
        })
        btn_2.addEventListener("mouseleave",function(){
            btn_2.style.background = "none";
            
        })
       
    }
    else if(team_Now == "comHit"){
        let btn_1 = document.querySelector("#choose button:nth-child(1)");
        let btn_2 = document.querySelector("#choose button:nth-child(2)");

        btn_1.innerHTML = "스트라이크";
        btn_2.innerHTML = "볼";
        btn_1.addEventListener("mouseenter",function(){
            btn_1.style.background = "#F98289";
        })
        btn_1.addEventListener("mouseleave",function(){
            btn_1.style.background = "none";
        })
        btn_2.addEventListener("mouseenter",function(){
            btn_2.style.background = "#F98289";
        })
        btn_2.addEventListener("mouseleave",function(){
            btn_2.style.background = "none";
        })
        
    }
    return
}

//버튼 클릭
btn_1.addEventListener("click", function(){
    if(team_Now=="userHit"){
        console.log("지켜보기 선택");
        seeing();
        console.log(`볼: ${ball} 스트라이크: ${strike} 아웃: ${out}`);
        return;
    }
    else{
        console.log("스트라이크 선택");
        select_strike();
        console.log(`볼: ${ball} 스트라이크: ${strike} 아웃: ${out}`);
        return;
    }
})
btn_2.addEventListener("click", function(){
    if(team_Now=="userHit"){
        console.log("스윙하기 선택");
        swing();
        console.log(`볼: ${ball} 스트라이크: ${strike} 아웃: ${out}`);
        return;
    }
    else{
        console.log("볼 선택");
        select_ball();
        console.log(`볼: ${ball} 스트라이크: ${strike} 아웃: ${out}`);
        return;
    }
})

// ---------------------------------- 확률

// 지켜보기
function seeing(){
    let hit = Math.random();
    if(hit<=0.6) {
        const p = document.createElement("p");
        document.querySelector("#message").prepend(p);
        p.innerHTML = `<p>볼 입니다!</p>`;
        bso_count("ball");

    } else {
        const p = document.createElement("p");
        document.querySelector("#message").prepend(p);
        p.innerHTML = `<p>스트라이크 입니다!</p>`;
        bso_count("strike");

    }
    return;
}

// 스윙
function swing(){
    let hit = Math.random();
    if(hit<=0.05) { // 홈런
        const p = document.createElement("p");
        document.querySelector("#message").prepend(p);
        p.innerHTML = `<p>홈런 입니다!</p>`;
        base_move("홈런");//점수 주고있음
        //추가
        ball = 0;
        strike = 0;
        disballs.forEach((b) => {
            b.style.background = "none";
        })
        disstlikes.forEach((s) => {
            s.style.background = "none";
        })
        homerun_set.style.width="1200px";
        homerun_set.style.height="1200px";
        setTimeout(function(){
            homerun_set.style.width="0%";
            homerun_set.style.height="0px";
        },1200)
    } 
    else if(0.05<hit && hit<=0.2) {
        if(0.07<=hit && hit<0.1) {
            console.log("스윙 : 안타아웃");
            const p = document.createElement("p");
            document.querySelector("#message").prepend(p);
            p.innerHTML = `<p>안타를 쳤지만 아웃 입니다!</p>`;
            bso_count("out");
            console.log("안타아웃최종베이스상황");
            console.log(base);
            out_set.style.width="100%";
            out_set.style.height="100px";
            setTimeout(function(){
                out_set.style.width="0%";
                out_set.style.height="0px";
            },800)
            base_move("안타아웃");
            // base[0]=1; // 안타 이후 아웃
        } 
        else {
            console.log("스윙 :안타");
            const p = document.createElement("p");
            document.querySelector("#message").prepend(p);
            p.innerHTML = `<p>안타 입니다!</p>`;
            base_move("안타"); //점수주고있음
            }
        //추가    
        ball = 0;
        strike = 0;
        disballs.forEach((b) => {
            b.style.background = "none";
        })
        disstlikes.forEach((s) => {
            s.style.background = "none";
        })
    } 
    else if(0.2<hit && hit<=0.3) {
        console.log("스윙 : 파울");
        const p = document.createElement("p");
        document.querySelector("#message").prepend(p);
        p.innerHTML = `<p>파울 입니다!</p>`;
        bso_count("strike");
    } 
    else {
        console.log("스윙 : 스트라이크");
        const p = document.createElement("p");
        document.querySelector("#message").prepend(p);
        p.innerHTML = `<p>스트라이크 입니다!</p>`;
        bso_count("strike");
    }
    return;
}


//스트라이크 던지기
function select_strike(){
    let comslect = Math.random();
    if(comslect <= 0.5){
        console.log("컴퓨터 스윙");
        swing();
    }
    else if(comslect>0.5){
        console.log("컴퓨터 스트라이크");
        const p = document.createElement("p");
        document.querySelector("#message").prepend(p);
        p.innerHTML = `<p>스트라이크 입니다!</p>`;
        bso_count("strike");
    }
    return;
}

// 볼 던지기
function select_ball(){
    let comslect = Math.random();
    if(comslect <= 0.5){
        console.log("컴퓨터 50% 스윙")
        swing();
    }
    else if(comslect > 0.5){
        console.log("컴퓨터 50% 볼")
        const p = document.createElement("p");
        document.querySelector("#message").prepend(p);
        p.innerHTML = `<p>볼 입니다!</p>`;
        bso_count("ball");
    }
    return;
}

let disballs = document.querySelectorAll("#disball div");
let disstlikes = document.querySelectorAll("#disstlike div");
let disouts = document.querySelectorAll("#disout div");

// 볼 스트라이크 아웃
function bso_count(what){
    if(what == "ball"){
        ball++;
        console.log(`볼이 ${ball}개가 되었습니다`);
        bso_color("ball");
    } 
    else if(what == "strike"){
        strike++;
        console.log(`스트라이크가 ${strike}개가 되었습니다`); 
        bso_color("strike");
    }
    else if(what == "out"){
        out++;
        if(out>=3){
            //변경
            if(team_Now === "comHit" && inning_count > 2) {
                console.log("게임종료실행")
                gameOver();
            }
            else{
                bso_color("out")
                console.log("아웃이 3개가 되었어요");
                console.log("공격전환");
                const p = document.createElement("p");
                document.querySelector("#message").prepend(p);
                p.innerHTML = `공격전환`;
                change.style.width="250px";
                change.style.height="250px";
                setTimeout(function(){
                change.style.width="0%";
                change.style.height="0px";
                },1000)
                change_team();  
            }

        }
        else{
            console.log("아웃이 "+ out+ "개");
            next_player();
            bso_color("out");
        }

    }
    return;
}

function bso_color(what){   //동그라미 색
    if(what == "out"){
        if(out>=3){
            ball = 0;
            strike = 0;
            disballs.forEach((b) => {
                b.style.background = "none";
            })
            disstlikes.forEach((s) => {
                s.style.background = "none";
            }) 
            disouts.forEach((o) => {
                o.style.background = "none";
            }) 
        }
        else{
            disouts[out-1].style.backgroundColor = "rgb(255, 0, 0)";
        }
    }
    else if(what == "ball"){
        if(ball==4){
            ball=0;
            strike=0;
            base.pop();
            base.unshift(1);
            console.log("타자 1루 진출");
            call();
            const p = document.createElement("p");
            document.querySelector("#message").prepend(p);
            p.innerHTML = `<p>볼넷으로 출루합니다</p>`;

            if(base[3]==1){
                console.log("홈에 선수가 들어옴")
                const p = document.createElement("p");
                document.querySelector("#message").prepend(p);
                p.innerHTML = `<p>홈에 선수가 들어왔습니다</p>`;
                base[3]=0;
                console.log(base);
                score++;
                //추가
                plus_set.style.width="150px";
                plus_set.style.height="80px";
                setTimeout(function(){
                    plus_set.style.width="0px";
                    plus_set.style.height="0px";
                },1000)
                Score(score);
                //
                console.log(" base_move 점수는 "+score);
            }
            next_player();
            disballs.forEach((b) => {
                b.style.background = "none";
            })
            disstlikes.forEach((s) => {
                s.style.background = "none";
            }) 
        }
        else{
            disballs[ball-1].style.backgroundColor = "rgb(9, 255, 0)";
        }
    }
    else if(what == "strike"){
        if(strike ==3){
            console.log("bso_color > strike ==3")
            strike=0;
            ball=0;
            out++;
            out_set.style.width="100%";
            out_set.style.height="100px";
            setTimeout(function(){
                out_set.style.width="0%";
                out_set.style.height="0px";
            },800)
            disballs.forEach((b) => {
                b.style.background = "none";
            })
            disstlikes.forEach((s) => {
                s.style.background = "none";
            }) 
            if(out==3){

                if(team_Now == "userHit" && score == 0) {
                    inning_top[inning_count].innerHTML = 0;
                } 
                else if(team_Now == "comHit" && score == 0) {
                    inning_bottom[inning_count].innerHTML = 0;
                }

                console.log("bso_color > strike ==3> out==3")
                bso_count("out");
            }
            else{
                // disstlikes.forEach((s) => {
                //     s.style.background = "none";
                // })
                disouts[out-1].style.backgroundColor= "rgb(255, 0, 0)";
                next_player();
            }
        }
        else{
            disstlikes[strike-1].style.backgroundColor = "rgb(238, 255, 0)";
        }
    }
    return;
}


function really_homerun(){
    
    // base=[1,0,0,0]
    ball = 0;
    strike = 0;
    console.log("홈런침");
    console.log(base);
    base.pop();
    console.log("타자 1루 진출");
    base.unshift(1);
    call();

    setTimeout(() => {
        console.log("--홈런치고 1번째");
        if(base[3]==1){
            console.log("홈에 선수가 들어옴");
            base[3]=0;
            console.log(base);
            score++;
            Score(score);
            base[3]=0;
            plus_set.style.width="150px";
            plus_set.style.height="80px";
            setTimeout(function(){
                plus_set.style.width="0px";
            },1000)
            plus_set.style.height="0px";
            console.log(" base_move 점수는 "+score);
        }
        console.log("인덱스 마지막 제거");
        base.pop();
        console.log("타자 다음루 진출");
        base.unshift(0);
        console.log(base);
        call();
    }, 2300);

    setTimeout(() => {
        console.log("--홈런치고 2번째");
        if(base[3]==1){
            console.log("홈에 선수가 들어옴");
            base[3]=0;
            console.log(base);
            score++;
            Score(score);
            base[3]=0;
            plus_set.style.width="150px";
            plus_set.style.height="80px";
            setTimeout(function(){
                plus_set.style.width="0px";
            },1000)
            plus_set.style.height="0px";
            console.log(" base_move 점수는 "+score);
        }
        console.log("인덱스 마지막 제거");
        base.pop();
        console.log("타자 다음루 진출");
        base.unshift(0);
        console.log(base);
        call();
    }, 4600);

    setTimeout(() => {
        console.log("--홈런치고 3번째");
        if(base[3]==1){
            console.log("홈에 선수가 들어옴");
            base[3]=0;
            console.log(base);
            score++;
            Score(score);
            base[3]=0;
            plus_set.style.width="150px";
            plus_set.style.height="80px";
            setTimeout(function(){
                plus_set.style.width="0px";
            },1000)
            plus_set.style.height="0px";
            console.log(" base_move 점수는 "+score);
        }
        console.log("인덱스 마지막 제거");
        base.pop();
        console.log("타자 다음루 진출");
        base.unshift(0);
        console.log(base);
        call();
    }, 6900);

    setTimeout(() => {
        console.log("--홈런치고 4번째");
        if(base[3]==1){
            console.log("홈에 선수가 들어옴");
            base[3]=0;
            console.log(base);
            score++;
            Score(score);
            base[3]=0;
            plus_set.style.width="150px";
            plus_set.style.height="80px";
            setTimeout(function(){
                plus_set.style.width="0px";
            },1000)
            plus_set.style.height="0px";
            console.log(" base_move 점수는 "+score);
        }
        console.log("인덱스 마지막 제거");
        base.pop();
        console.log("타자 다음루 진출");
        base.unshift(0);
        console.log(base);
        call();
    }, 9200);
}
// dd()

//베이스~~
// let base = [0,0,0,0];
function base_move(hit){
    if(hit == "홈런"){
        really_homerun();
        next_player();
    }
    else if(hit == "안타"){
        ball = 0;
        strike = 0;
        console.log("안타 입니다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        base.pop();
        console.log("타자 1루 진출");
        base.unshift(1);
        console.log(base);
        hit_set.style.width="100%";
        hit_set.style.height="60px";
        setTimeout(function(){
            hit_set.style.width="0%";
            hit_set.style.height="0px";
        },800)
        call();
        next_player();

        if(base[3]==1){
            console.log("홈에 선수가 들어옴!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            const p = document.createElement("p");
            document.querySelector("#message").prepend(p);
            p.innerHTML = `<p>홈에 선수가 들어왔습니다</p>`;
            base[3]=0;
            console.log(base);
            score++;
            Score(score);
            plus_set.style.width="150px";
            plus_set.style.height="80px";
            setTimeout(function(){
                plus_set.style.width="0px";
                plus_set.style.height="0px";
            },1000)
            console.log(" base_move 점수는 "+score);
        }
    } else if(hit == "안타아웃") {
        console.log("안타아웃입니다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        base.pop();
        base.unshift(0);
        console.log(base);
        call();
        p1.style.display = "none"
        out_set.style.width="100%";
        out_set.style.height="100px";
        setTimeout(function(){
            out_set.style.width="0%";
            out_set.style.height="0px";
        },800)
    }
    else if(hit == "아웃") {
        console.log("아웃입니다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        base.pop();
        base[0] = 0;
        // base.unshift(1);
        base.unshift(0);
        console.log(base);
        call();
        p1.style.display = "none"
        out_set.style.width="100%";
        out_set.style.height="100px";
        setTimeout(function(){
            out_set.style.width="0%";
            out_set.style.height="0px";
        },800)

        if(base[3]==1){
            console.log("홈에 선수가 들어옴!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            const p = document.createElement("p");
            document.querySelector("#message").prepend(p);
            console.log("인덱스 마지막 제거");
            p.innerHTML = `<p>홈에 선수가 들어왔습니다</p>`;
            base[3]=0;
            console.log(base);
            score++;
            Score(score);
            plus_set.style.width="150px";
            plus_set.style.height="80px";
            setTimeout(function(){
                plus_set.style.width="0px";
                plus_set.style.height="0px";
            },1000)
            console.log(" base_move 점수는 "+score);
        }
    }
}

//점수 갱신
let inning_top = document.querySelectorAll("#LED div div:nth-child(1)"); //초
let inning_bottom = document.querySelectorAll("#LED div div:nth-child(2)"); //말
let User_total_total=0;
let Com_total_total=0;

function Score(num) {

    if(team_Now == "userHit"){ //유저가 공격일 경우 = 초  
        inning_top[inning_count].innerHTML = num;
        let user_total = 0; 

        //유저 총점
        for(let i=1; i<=9; i++){ 
            user_total += Number(inning_top[i].innerHTML);
        }
        inning_top[10].innerHTML = user_total;
        User_total_total=user_total;
    }
    else if(team_Now == "comHit"){ //컴퓨터가 공격일 경우 = 말 s
        inning_bottom[inning_count].innerHTML = num;
        let com_total = 0;
        //컴퓨터 총점
        for(let i=1; i<=9; i++){
            com_total += Number(inning_bottom[i].innerHTML);
        }
        inning_bottom[10].innerHTML = com_total;
        Com_total_total = com_total
        
    } 
}

// 타자
let User_player = 0;
let Com_player = 0;
function next_player(){
    if(team_Now == "userHit"){ //유저차례일 경우
        //홈런 or 안타
        User_player++;
        ball = 0;
        strike = 0
        if(User_player < 10){
            let p = document.createElement("p");
            document.querySelector("#message").prepend(p);
            p.innerHTML = `user팀 ${User_player}번 타자가 타석에 들어왔습니다 `;
            console.log(`user팀 ${User_player}번 타자가 타석에 들어왔습니다 `)
            console.log(`볼: ${ball} 스트라이크: ${strike} 아웃: ${out}`);
        }
        else if(User_player == 10){
            User_player = 1;
            let p = document.createElement("p");
            document.querySelector("#message").prepend(p);
            p.innerHTML = `user팀 ${User_player}번 타자가 타석에 들어왔습니다 `;
            console.log(`user팀 ${User_player}번 타자가 타석에 들어왔습니다 `)
            console.log(`볼: ${ball} 스트라이크: ${strike} 아웃: ${out}`);
        }
    }
    else{
        //홈런 or 안타
        Com_player++;
        if(Com_player<10){
            let p = document.createElement("p");
            document.querySelector("#message").prepend(p);
            p.innerHTML = `com팀 ${Com_player}번 타자가 타석에 들어왔습니다 `;
            console.log(`com팀 ${Com_player}번 타자가 타석에 들어왔습니다 `)
            console.log(`볼: ${ball} 스트라이크: ${strike} 아웃: ${out}`);
        }
        else if(Com_player==10){
            let p = document.createElement("p");
            document.querySelector("#message").prepend(p);
            Com_player=1;
            p.innerHTML = `com팀 ${Com_player}번 타자가 타석에 들어왔습니다 `;
            console.log(`com팀 ${Com_player}번 타자가 타석에 들어왔습니다 `)
            console.log(`볼: ${ball} 스트라이크: ${strike} 아웃: ${out}`);
        }
    }
}


//게임 끝
function gameOver() {
    console.log(inning_count+ "말//////////////게임종료실행")
    btn_1.style.display = 'none';
    btn_2.style.display = 'none';
    const p = document.createElement("p");
    document.querySelector("#message").prepend(p);
    if(User_total_total > Com_total_total){
        p.innerHTML = `<p>user팀의 승리입니다.</p>
        <p>user팀 ${User_total_total}점 com팀 ${Com_total_total}점</p>
        <p>게임이 종료되었습니다.</p>`;
    }
    else if(User_total_total == Com_total_total){
        p.innerHTML = `<p>user팀과 com팀은 비겼습니다</p>
        <p>user팀 ${User_total_total}점 com팀 ${Com_total_total}점</p>
        <p>게임이 종료되었습니다.</p>`;
    }
    else{
        p.innerHTML = `<p>com팀의 승리입니다.</p>
        <p>user팀 ${User_total_total}점 com팀 ${Com_total_total}점</p>
        <p>게임이 종료되었습니다.</p>`;
    }

}

// 타자 움직이기

function call(){
    move4();
    move3();
    move2();
    move1();
}
function move1() {
    if(base[0]==1){
        hitter.style.backgroundImage = "url(./images/run1.gif)";
        // hitter.classList.add("run1");
        hitter.classList.add("go1");
        setTimeout(function() {
            hitter.classList.remove("go1");
            hitter.classList.remove("run1");
            p1.style.display = "block";
            if(team_Now =="userHit"){
                hitter.style.backgroundImage = "url(./images/타자1_blue.png)";
            }
            else{
                hitter.style.backgroundImage = "url(./images/타자1_red.png)";
            }
        }, 2000);
    }
    // else{return}
    else{
        hitter.classList.remove("go1");
        hitter.classList.remove("run1");
    }
}
function move2() {
    if(base[1]==1){
        p1.style.backgroundImage = "url(./images/run2.gif)";
        p1.classList.add("go2");
        console.log("누름");
        setTimeout(function() {
            p1.classList.remove("go2");
            p1.classList.remove("run2");
            p1.style.display = "none";
            p2.style.display = "block";
            if(team_Now =="userHit"){
                p1.style.backgroundImage = "url(./images/스탠딩_blue.png)";
            }
            else{
                p1.style.backgroundImage = "url(./images/스탠딩_red.png)";
            }
        }, 2000);

    }
    // else{return}
    else{
        p1.classList.remove("run2");
        p1.classList.remove("go2");
        p1.style.display = "none"
    }
}
function move3() {
    if(base[2]==1){
        p2.style.backgroundImage = "url(./images/run1.gif)";
        p2.classList.add("go3");
        console.log("누름")
        setTimeout(function() {
            p2.classList.remove("go3");
            p2.classList.remove("run3");
            p2.style.display = "none";
            p3.style.display = "block";
            if(team_Now =="userHit"){
                p2.style.backgroundImage = "url(./images/스탠딩_blue.png)";
            }
            else{
                p2.style.backgroundImage = "url(./images/스탠딩_red.png)";
            }
        }, 2000);
    }
    // else{return}
    else{
        p2.classList.remove("go3");
        p2.classList.remove("run3");
        p2.style.display = "none"
    }

}
function move4() {
    if(base[3]==1){
        p3.style.backgroundImage = "url(./images/run2.gif)";
        // p3.classList.add("run_home");
        p3.classList.add("go_home");
        console.log("누름")
        setTimeout(function() {
            p3.classList.remove("go_home");
            p3.classList.remove("run_home");
            p3.style.display = "none";
            if(team_Now =="userHit"){
                p3.style.backgroundImage = "url(./images/스탠딩_blue.png)";
            }
            else{
                p3.style.backgroundImage = "url(./images/스탠딩_red.png)";
            }
        }, 2000);
    }
    // else{return}
    else{
        p3.classList.remove("go_home");
        p3.classList.remove("run_home");
        p3.style.display = "none";
    }
}
