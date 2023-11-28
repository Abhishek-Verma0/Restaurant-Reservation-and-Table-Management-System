const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 300,fill:"forwards"  });
}


let index = 0,
    interval = 1000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}

gsap.registerPlugin(ScrollTrigger);

const textElements = gsap.utils.toArray('.text');

textElements.forEach(text => {
  gsap.to(text, {
    backgroundSize: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: text,
      start: 'center 60%',
      end: 'center 20%',
      scrub: true,
    },
  });
});




var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click')
  cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
})


document.getElementById("cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("card")){
    
        const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;


        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        

    }
}







  console.clear();

  //SLIDES
  var slideDelay = 5;
  var slideDuration = 1.5;
  
  var slides = document.querySelectorAll(".slide");
  
  var numSlides = slides.length;
  
  for (var i = 0; i < numSlides; i++) {
    gsap.set(slides[i], {
      xPercent: i * 100
    });
  }
  
  var timer = gsap.delayedCall(slideDelay, autoPlay);
  
  var animation = gsap.to(slides, {
    duration: 1, 
    xPercent: "+=" + (numSlides * 100),
    ease: "none",
    paused: true,
    repeat: -1,
    modifiers: {
      xPercent: gsap.utils.wrap(-100, (numSlides - 1) * 100)
    }
  });
  
  var proxy = document.createElement("div");
  gsap.set(proxy, { x: 0 });
  var slideAnimation = gsap.to({}, {duration: 0.1});
  var slideWidth = 0;
  var wrapWidth = 0;
  resize();
  
  window.addEventListener("resize", resize);
  
  function animateSlides(direction) {
    timer.restart(true);
    slideAnimation.kill();
    
    var x = gsap.getProperty(proxy, "x") + direction * slideWidth;
    
    slideAnimation = gsap.to(proxy, {
      duration: slideDuration,
      x: x,
      onUpdate: updateProgress
    });  
  }
  
  function autoPlay() {  
      animateSlides(-1);
  }
  
  function updateProgress() {  
    animation.progress(gsap.utils.wrap(0, 1, gsap.getProperty(proxy, "x") / wrapWidth));
  }
  
  function resize() {
    var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;
    
    slideWidth = slides[0].offsetWidth;
    wrapWidth = slideWidth * numSlides;
    
    gsap.set(proxy, {
      x: norm * wrapWidth
    });
    
    animateSlides(0);
    slideAnimation.progress(1);
  }
  
  //PROGRESS BAR
  var progressBar = "#progressBar";
  var progressAnimation = gsap.timeline({
    paused: true,
    delay:1.5,
    repeat:-1
  });
  
  progressAnimation.to(progressBar, {
    width:'100%',
    ease:'none',
    duration: 3.5
  });
  progressAnimation.to(progressBar, {
    opacity:0,
    ease:'none',
    duration: 1.5
  });
  
  progressAnimation.play();
  
  //BACKGROUND
  var bg = ".slide";
  var bgAnimation = gsap.timeline({
    paused: true,
    delay:5.5,
    repeat:-1,
    repeatDelay:4
  });
  
  bgAnimation
  .set(bg, {
    backgroundSize:'140%'
  })
  .to(bg, {
    backgroundSize:'-=10%',
    ease:'none',
    duration: 1
  });
  
  bgAnimation.play();










/** text*/
console.clear();
const content = document.querySelector(".contnt");
/*const link = document.querySelector("a");
const linkIcon = document.querySelector(".btn-icon");*/
let linkAnimated = false;

let dTo = gsap.quickTo(".hidden-content", "--d", {
    duration: 0.4,
    ease: "power4.out"
  }),
  hTo = gsap.quickTo(".hidden-content", "--h", {
    duration: 0.4,
    ease: "power4.out"
  });

let tl = gsap.timeline({ paused: true });
tl.to(".hidden-content", {
  "--size": 250,
  duration: 0.75,
  ease: "back.out(1.7)"
});

let hoveringContent = gsap.utils.toArray(".para", content);

hoveringContent.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    tl.restart();
  });
  el.addEventListener("mouseleave", () => {
    tl.reverse();
  });
});


/***************************************
    Add Mask on First Mouse Movement
***************************************/
window.addEventListener("mousemove", onFirstMove);

function onFirstMove(e) {
  window.removeEventListener("mousemove", onFirstMove);
  gsap.set(".hidden-content", { autoAlpha: 1, "--d": e.pageX, "--h": e.pageY });

  window.addEventListener("mousemove", (e) => {
    if (!linkAnimated) {
      hTo(e.pageY);
      dTo(e.pageX);
    }
  });
}

/***************************************
      Only for the preview image
***************************************/
gsap.set(".hidden-content", {
  autoAlpha: 1,
  "--d": window.innerWidth / 3,
  "--h": window.innerHeight / 2
});
tl.progress(0.2);



// ------- for review  cards









/*dialog box*/
function dbox (msg) {
  if (msg != undefined) {
    document.getElementById("boxTxt").innerHTML = msg;
    document.getElementById("boxBack").classList.add("show");
  } else { document.getElementById("boxBack").classList.remove("show"); }
}
