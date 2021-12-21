'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to");
const scrollTo = document.querySelector("#section--1");
///////////////////////////////////////
// Modal window


const openModal = function() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
//scrolling
btnScrollTo.addEventListener('click', function(e) {
    const slcords = scrollTo.getBoundingClientRect();
    console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
    console.log(slcords);
    //window.scrollTo(slcords.left + window.pageXOffset,slcords.top+window.pageYOffset);
    /*window.scrollTo({
        left:slcords.left + window.pageXOffset,
        top:slcords.top + window.pageYOffset,
        behavior:'smooth',
    }
    )*/
    scrollTo.scrollIntoView({ behavior: 'smooth' });
})

////////////
//page navigation
/*document.querySelectorAll('.nav__link').forEach(
function(el)
  {
    el.addEventListener('click',function(e){
      e.preventDefault();
      const id = this.getAttribute("href");
      console.log(id);
      document.querySelector(id).scrollIntoView({behavior:'smooth'});
    })
  })*/
//js event delegation
//1)Add event listener to common parent element
//2)determine what element originated the event
document.querySelector(".nav__links").addEventListener('click', function(e) {
    console.log(e.target);
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    };
});

//tabs opeartions
const tabs = document.querySelectorAll(".operations__tab");
const tabscontainer = document.querySelector(".operations__tab-container");
const tabscontent = document.querySelectorAll(".operations__content");
tabscontainer.addEventListener("click", function(e) {
    const clicked = e.target.closest(".operations__tab");

    //gard clause
    if (!clicked) return;

    //tabs active
    tabs.forEach(t => t.classList.remove("operations__tab--active"));
    tabscontent.forEach(t => t.classList.remove("operations__content--active"))
    clicked.classList.add("operations__tab--active");

    //tabs  content
    //const content = document.querySelectorAll(".operations__content--active");
    //console.log(clicked.dataset.tab);
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
    //console.log(document.querySelector(`operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active"));
});


//Menu Fade animation
const nav = document.querySelector(".nav");
const handover = function(e) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");
        siblings.forEach(el => {
            if (el !== link) {
                el.style.opacity = this;
            }
        });
        logo.style.opacity = this;
    }
}
nav.addEventListener("mouseover", handover.bind(0));
nav.addEventListener("mouseout", handover.bind(1));

//sticky navigation
/*const initalCord = scrollTo.getBoundingClientRect();
console.log(initalCord);
window.addEventListener("scroll",function(){
  //console.log(window.scrollY);
  if(window.scrollY > initalCord.top){
    nav.classList.add("sticky");
  }
  else{
    nav.classList.remove("sticky");
  }
})*/
const header = document.querySelector(".header");
const stickyNav = function(entries) {
    // console.log(entries);
    const [entry] = entries;
    //console.log(entry);
    if (!entry.isIntersecting) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
}
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: '-90px',
});
headerObserver.observe(header);


//reveal elements on scrolling
const revealSection = function(entries, obsever) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    obsever.unobserve(entry.target);
    console.log(entry);
}
const sections = document.querySelectorAll(".section");
const revealObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
sections.forEach(function(section) {
        revealObserver.observe(section);
        // section.classList.add("section--hidden");
    })
    //lazy load images
const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);
const loadimg = function(entries, obsever) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    //replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img');
    });
    obsever.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadimg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
});
imgTargets.forEach(function(img) {
        imgObserver.observe(img);
    })
    //slider
const slider = function() {
    const slides = document.querySelectorAll(".slide");
    const slider = document.querySelector(".slider");
    const btnRight = document.querySelector(".slider__btn--left");
    const btnLeft = document.querySelector(".slider__btn--right");
    const maxLen = slides.length;
    let curSlide = 0;
    /*slider.style.transform = 'scale(0.4) translateX(-800px)';
    slider.style.overflow = 'visible';
    slides.forEach(function(s,i){
      s.style.transform = `translateX(${100 * i}%)`
      //0 100 200 300
    })*/
    const goToSlide = function(slide) {
        slides.forEach(function(s, i) {
            s.style.transform = `translateX(${100 * (i-slide)}%)`
        })
    }
    goToSlide(0)
        //btn left listener
    btnLeft.addEventListener('click', function() {
            if (curSlide === maxLen - 1) {
                curSlide = 0;
            } else {
                curSlide++;
            }
            slides.forEach(function(s, i) {
                s.style.transform = `translateX(${100 * (i-curSlide)}%)`
                    //0 100 200 300
            })
            activeDot(curSlide);
        })
        //btn left listener
    btnRight.addEventListener('click', function() {
        if (curSlide === 0) {
            curSlide = maxLen - 1;
        } else {
            curSlide--;
        }
        slides.forEach(function(s, i) {
            s.style.transform = `translateX(${100 * (i-curSlide)}%)`
                //0 100 200 300
        })
        activeDot(curSlide);
    });
    //keys event listener
    document.addEventListener('keydown', function(e) {
        console.log(e);
        if (e.key === 'ArrowLeft') {
            if (curSlide === 0) {
                curSlide = maxLen - 1;
            } else {
                curSlide--;
            }
            slides.forEach(function(s, i) {
                s.style.transform = `translateX(${100 * (i-curSlide)}%)`
                    //0 100 200 300
            })
        }
        if (e.key === 'ArrowRight') {
            if (curSlide === maxLen - 1) {
                curSlide = 0;
            } else {
                curSlide++;
            }
            slides.forEach(function(s, i) {
                s.style.transform = `translateX(${100 * (i-curSlide)}%)`
                    //0 100 200 300
            })
        }
    });
    // dots sliding
    const dotcontainer = document.querySelector(".dots");
    const createDots = function() {
        slides.forEach(function(S, i) {
            dotcontainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide = "${i}"></button>
    `)
        })
    }
    createDots();
    const activeDot = function(slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    }
    activeDot(0);
    dotcontainer.addEventListener('click', function(e) {
        if (e.target.classList.contains("dots__dot")) {
            const { slide } = e.target.dataset;
            console.log(slide);
            goToSlide(slide);
            activeDot(slide);
        }
    })
}
slider()