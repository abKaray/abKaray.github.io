// Hide preload
$(document).ready(function () {
    $(".loader-wrapper").addClass("animation-in");

    setTimeout(function(){
        $('body').addClass('loaded');
        $('.jsA').removeClass('jsA');
        $('.hidden-skill').removeClass('hidden-skill');
    }, 2500);
});

//draw square
setTimeout(function () {
    $(".square").addClass("add_line");
    $('.lines-skill').addClass('new-line');
}, 1500);

// move square
let container = $("body"),
    container_w = container.width(),
    container_h = container.height();

let sq = document.querySelector(".square");

document.onmousemove = function (e) {
    let pos_x = e.pageX;
    let pos_y = e.pageY;
    let left = 0;
    let top = 0;

    left = container_w / 2 - pos_x;
    top = container_h / 2 - pos_y;

    sq.style.transform = "translateX(" + left / 62 + "px) translateY(" + top / 54 + "px)";
};

//text typed
setTimeout(function () {
    var options = {
        strings: ['Hksdfjsh', 'Hi! My name is Alex Karakay'],
        typeSpeed: 50,
        backSpeed: 30
    };

    var typed = new Typed(".inner_text h3", options);
}, 2000);
setTimeout(function () {
    var opt = {
        strings: ['I\'m a beginner Front-end developer'],
        typeSpeed: 50,
        backSpeed: 30
    };
    var typed = new Typed(".outer-text p", opt);
}, 6000);

let letter = document.querySelector(".letter");
let letterMyWork = document.querySelector(".my-work");
let contactLetter = document.querySelector(".contact-letter");

let hideLinesBig = document.querySelector(".hide-lines-big");
let hideLinesSmall = document.querySelector(".hide-lines-small");
let linesSourceSmall = hideLinesSmall.getBoundingClientRect().top + window.pageYOffset - 300;
let linesSourceBig = hideLinesBig.getBoundingClientRect().top + window.pageYOffset - 300;

//ParalaxEffect
document.onscroll = function () {
    if(pageYOffset > linesSourceBig){
        hideLinesBig.classList.add("moves");
    }
    if(pageYOffset > linesSourceSmall){
        hideLinesSmall.classList.add("moves");
    }

    parallaxLetter(letter, 2);
    parallaxLetter(letterMyWork, 8);
    parallaxLetter(contactLetter, 17);

    if(letterMyWork.getBoundingClientRect().top < document.documentElement.clientHeight){
        $(".js").removeClass("js");
    }
    if(contactLetter.getBoundingClientRect().top < document.documentElement.clientHeight){
        $(".jsC").removeClass("jsC");
    }

};

function parallaxLetter(name, number){
  let top = container_h / 2 - pageYOffset;

  name.style.transform = "translateY(" + top / number + "px)";
}

document.onclick = function (e) {
    var target = e.target;

    if(target.tagName == "INPUT"){
        addFormEffect(target.previousElementSibling, target, target.nextElementSibling);
    };
    if(target.tagName == "LABEL"){
        addFormEffect(target, target.nextElementSibling,target.nextElementSibling.nextElementSibling);
    }
};

function addFormEffect(one, two, three) {
    $(one).addClass("active");
   $(two).addClass("active");
   $(three).addClass("active");
}

$(".inp").blur(function () {
   if(this.value == ""){
       $(this.previousElementSibling).removeClass("active");
       $(this.nextElementSibling).removeClass("active");
   }
});

function initMap() {
    var coordinates = {lat: 47.212325, lng: 38.933663},

        map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates
        });
}
initMap();