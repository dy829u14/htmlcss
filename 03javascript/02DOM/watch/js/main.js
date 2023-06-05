let menu = document.querySelector("#menu").querySelectorAll("li");
let wh = window.innerHeight;
const sections = document.querySelectorAll("section");
// for(let i=0;i<menu.length;i++) {
//     menu[i].addEventListener("click",function(e) {
//         e.preventDefault();
//     window.scrollTo({top:i*wh, behavior:"smooth"});
// })
// }
menu.forEach((li,index)=>{
    li.addEventListener("click", function(e) {
        e.preventDefault();
        console.log("여기여기"+index*wh);
        window.scrollTo({top:index*wh, behavior:"smooth"});
    })
})
window.addEventListener("scroll",function() {
    let scrollTop = window.scrollY;
    console.log(scrollTop);
    if(scrollTop>=0 && scrollTop<wh) {
        menu[0].classList.add("on")
        menu[1].classList.remove("on");
        menu[2].classList.remove("on");
        menu[3].classList.remove("on");
    }
    if(scrollTop>=wh && scrollTop<wh*2) {
        menu[1].classList.add("on")
        menu[0].classList.remove("on");
        menu[2].classList.remove("on");
        menu[3].classList.remove("on");
    }
    if(scrollTop>=wh*2 && scrollTop<wh*3) {
        menu[2].classList.add("on")
        menu[0].classList.remove("on");
        menu[1].classList.remove("on");
        menu[3].classList.remove("on");
    }
    if(scrollTop>=wh*3 && scrollTop<wh*4) {
        menu[3].classList.add("on")
        menu[0].classList.remove("on");
        menu[1].classList.remove("on");
        menu[2].classList.remove("on");
    }
})
window.addEventListener("scroll", function() {
    let sct = Math.ceil(this.document.documentElement.scrollTop)+1;
    for(let i=0;i<menu.length;i++) {
        if(sct>i*wh && sct < (i+1)*wh) {
            menu.forEach(li=>li.classList.remove("on"))
            menu[i].classList.add("on");
        }
    }
})

sections[0].addEventListener("mouseenter", function(e){
    let x = e.pageX;
    let y = e.pageX;
    console.log(x);
    console.log(y);
    document.querySelector(".img11").style.right = 20+(x/30)+"px";
    document.querySelector(".img12").style.right = 20-(x/30)+"px";
})