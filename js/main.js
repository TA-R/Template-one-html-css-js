/* ---------start load------------------------------------------------------------------- */
window.onload = function () {
    document.body.style.overflow = "hidden";
    let load = document.getElementById("load");

    setTimeout(() => {
        load.style.display = "none";
        document.body.style.overflow = "auto";
    }, 100);
}

/* ---------end load------------------------------------------------------------------- */

/* ---------local storage------------------------------------------------------------------- */
// if local Storage not null in color
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));    
    document.querySelector(".about-us .imge-box img").style.filter = `hue-rotate(${localStorage.getItem("color_img")})`;
            // add active class and remove
            document.querySelectorAll(".colors-list li").forEach(ele => {
                // add active
                ele.classList.remove("active");
                // remove active
                if (ele.dataset.color === mainColor) {
                    ele.classList.add("active");
                }
            })    
}

// if local Storage not null in random background
// -----
let backgroundOptaion = true;
let backgroundinterfel;

let randomBackLocal = localStorage.getItem("back-opt");
if (randomBackLocal !== null) {
    if (randomBackLocal === "yes") {
        randomBack();
    }else{
        backgroundOptaion = false;
        clearInterval(backgroundinterfel);
    }
        // // add active class and remove
        document.querySelectorAll(".random-back span").forEach(ele => {
            // add active
            ele.classList.remove("active");
            // remove active
            if (ele.dataset.back === randomBackLocal) {
                ele.classList.add("active");
            }
        })    
}

// setting page ------------------------------------------------------------------------------
document.querySelector(".icon-s i").onclick = function () {
    
    this.classList.toggle("fa-spin");
    document.querySelector(".settings").classList.toggle("open");
};

// chang color in main color--------
const colorList = document.querySelectorAll(".colors-list li");
colorList.forEach(li => {

    li.addEventListener("click", e => {     
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        
        // chang color imge 
        let aboutImg = document.querySelector(".about-us .imge-box img");
        aboutImg.style.filter = `hue-rotate(${e.target.dataset.c})`;
        // add data color in local storeg 
        localStorage.setItem("color_option", e.target.dataset.color);
        localStorage.setItem("color_img", e.target.dataset.c);

        handlActive(e);
    });
});

// chang background in setting--------
const backRand = document.querySelectorAll(".random-back span");

backRand.forEach(span => {
        span.addEventListener("click", e => {     
                
                // add active class and remove
                handlActive(e);
        
                // chose random background yes or no 
                if (e.target.dataset.back === "yes") {
                    backgroundOptaion = true;
                    randomBack();
                }else{
                    backgroundOptaion = false;
                    clearInterval(backgroundinterfel);
                }
                
                // add in local storeg 
                localStorage.setItem("back-opt", e.target.dataset.back);
            });
});        

// bullet show or hide-------- 
const bullet = document.querySelectorAll(".bullet-optaion span");
bullet.forEach(span => {
        span.addEventListener("click", e => {     
                
                // add active class and remove
                handlActive(e);
        
                // chose random background yes or no 
                if (e.target.dataset.display === "show") {
                    document.querySelector(".nav-bul").style.display = "block";
                }else{
                    document.querySelector(".nav-bul").style.display = "none";
                }
                
                // add in local storeg 
                localStorage.setItem("show-display", e.target.dataset.display);
            });
});
// localstoreg show bullets
let localShowBullet = localStorage.getItem("show-display");

if (localShowBullet !== null) {

    bullet.forEach(span => {
        span.classList.remove("active");
    });


    if (localShowBullet == "show") {
        document.querySelector(".nav-bul").style.display = "block";
        document.querySelector(".bullet-optaion .yes").classList.add("active");
    } else if (localShowBullet == "hide"){
        document.querySelector(".nav-bul").style.display = "none";
        document.querySelector(".bullet-optaion .no").classList.add("active");
    }
}

// buttin rest 
let restOption = document.querySelector(".rest-optaion .yes")
restOption.addEventListener("click", (e)=>{
    // كود الزيرو-----------------
    localStorage.clear();
    window.location.reload();
    
})

let sett = document.querySelector(".settings");
sett.addEventListener("click", e => {

    e.stopPropagation();

})
document.addEventListener("click", (e) => {
    if (e.target !== sett && e.target !== document.querySelector(".icon-s i")){
        sett.classList.remove("open");
        document.querySelector(".icon-s i").classList.remove("fa-spin");
    }
})

// end setting page ------------------------------------------------------------------------------

// strat nav bul page ------------------------------------------------------------------------------
let bults = document.querySelectorAll(".nav-bul .bul");
let allLinks = document.querySelectorAll(".links a");


function scrollToSomewhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            
            e.preventDefault();
            document.querySelector(e.target.dataset.sec).scrollIntoView({
                behavior: 'smooth'
            });
        })
    });
}
scrollToSomewhere(bults);
scrollToSomewhere(allLinks);
// end nav bul page ------------------------------------------------------------------------------


// start landing page ------------------------------------------------------------------------
let land = document.querySelector(".landing-page");

// Array imges
/* 2 3 5 8 7 9 12 13*/
let arrayImg = ["2.jpg","3.jpg","5.jpg","7.jpg","8.jpg","9.jpg","12.jpg","13.jpg"];

function randomBack() {
    if (backgroundOptaion === true) {
        
        backgroundinterfel = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * arrayImg.length);
            
            land.style.backgroundImage = `url(img/${arrayImg[randomNumber]})`
            
        }, 3000);
    }
};
randomBack();

// toogle menu 
let toggle = document.querySelector(".landing-page .header .toogle");
toggle.addEventListener("click", e => {

    e.stopPropagation();

    document.querySelector(".landing-page .header .links").classList.toggle("open");
    
    toggle.classList.toggle("active");
})

document.addEventListener("click", (e) => {
    if (e.target !== toggle && e.target !== document.querySelector(".landing-page .header .links")) {
        toggle.classList.remove("active")
        
        document.querySelector(".landing-page .header .links").classList.remove("open");
    }
})
// end landing page ------------------------------------------------------------------------


// start skils page ------------------------------------------------------------------------

let skilsPage = document.querySelector(".skils");
let skilBox = document.querySelectorAll(".skils .skil-box");

window.onscroll = function () {
    
    // offsetTop skils page موقع العنصر في السكرول 
    let posation = skilsPage.offsetTop;
    
    // hight of skils page مساحة طول العنصر
    let hightSkils = skilsPage.offsetHeight;

    // hight of window مساحة طول الصفحة
    let windowHeight = this.innerHeight;

    // window scroll Top 
    let windowScoll = this.pageYOffset;

    if (windowScoll > (posation + hightSkils - windowHeight) - 100)  {
            let progSkil = document.querySelectorAll(".skils .skil-progres span");

            progSkil.forEach((skil) => {
                skil.style.width = skil.dataset.width;
            })
            document.querySelector(".top").classList.add("active");
        }
    if (windowScoll > (posation + hightSkils - windowHeight) - 700)  {
            document.querySelector(".top").classList.add("active");
        }else{
            document.querySelector(".top").classList.remove("active");
        }
};


// end skils page ------------------------------------------------------------------------


// start gallery page ------------------------------------------------------------------------

let imgInGallery = document.querySelectorAll(".gallery .img-box div");
imgInGallery.forEach(img =>{
    img.addEventListener("click", a =>{
        let overly = document.createElement("div");

        overly.className = "popup-overly";

        document.body.appendChild(overly);

        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        let popupimg = document.createElement("img");
        popupimg.src = img.dataset.img;

        popupBox.appendChild(popupimg);

        document.body.appendChild(popupBox);

        // close 
        let closeBut = document.createElement("span");
        closeBut.className = "close-but";
        closeBut.textContent = "X";
        popupBox.appendChild(closeBut);
    })
});

document.addEventListener("click", (e) =>{
    if (e.target.className === "close-but") {
        e.target.parentElement.remove();
        document.querySelector(".popup-overly").remove();
    }
});
// end gallery page ------------------------------------------------------------------------

function handlActive(ele) {
    // add active class and remove
        ele.target.parentElement.querySelectorAll(".active").forEach(ele => {
            ele.classList.remove("active");
        });
        ele.target.classList.add("active");
}
