$(document).ready(function(){
  $('.welcome-slider').slick({
    arrows: true,
    dots: true,
    speed: 800,
  });
  $(".welcome-slider").on('afterChange', function(event, slick, currentSlide){
    $("#curr-slide").text('0' + (currentSlide + 1));
 });
  $('.video-sm-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.video-slider',
    dots: true,
    arrows: true,
    speed: 800,
    easing: 'ease',
    // centerMode: true,
    focusOnSelect: true,
    initialSlide: 0,
    touchTreshold: 10,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });
  $('.video-slider').slick({
    arrows: false,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
    fade: true,
    easing: 'ease',
    infinite: true,
    initialSlide: 0,
    autoplay: false,
    touchTreshold: 10,
    asNavFor: '.video-sm-slider'
  });
});
///////////////////gallery
const gNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
const pictureInnerContainer = document.querySelector('.picture-inner-container');
let images = '';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const numbers = shuffle(gNum);

  numbers.map((img) => {
    images+=`<img class="gallery-img js-scroll fade-in-bottom" src="assets/img/galery/galery${img}.jpg" alt="galery${img}">`;
  })
  pictureInnerContainer.innerHTML = images;


  const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});

///////////////////////video
/* Get our Elements */
const player = document.querySelector('.video-slider__item');
const video = player.querySelector('.viewer');
const progressPlay = player.querySelector('.progress');
const progressVolume = player.querySelector('.progress-vol');
const playButton = player.querySelector('.play-button');
const bigPlayButton = player.querySelector('.big-play-btn');
const ranges = player.querySelectorAll('.range');
const volumeButton = player.querySelector('.volume-button');
const fullscreen = player.querySelector('.fullscr-button');

const skipForw = 25;
const skipRewert = 10;

/* Build out function */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}
function updatePlayButton() {
  const icon = this.paused ? `url('../assets/svg/play.svg')` : `url('../assets/svg/pause.svg')`;
  playButton.style.backgroundImage = icon;
}
function updateBigPlayButton() {
  const visibility = this.paused ? `inline-block` : `none`;
  bigPlayButton.style.display = visibility;
}

function handleProgress() {
  let percentage = Math.floor((100 / video.duration) * video.currentTime);
  progressPlay.value = percentage;
  progressPlay.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percentage}%, #C4C4C4 ${percentage}%, #C4C4C4 100%)`
}
function seek(e) {
  let percent = e.offsetX / this.offsetWidth;
  video.currentTime = percent * video.duration;
  e.target.value = Math.floor(percent / 100);
}
function handleVolume() {
  let v = this.value;
  video.volume = v / 100;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${v}%, #999999 ${v}%, #999999 100%)`;
  (v == '0') ? volumeButton.classList.add('muted') : volumeButton.classList.remove('muted');
}
/* Hook up the event listeners*/
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress, false);

progressPlay.addEventListener('mouseup', seek);
progressVolume.addEventListener('mouseup', handleVolume);

playButton.addEventListener('click', togglePlay);
video.addEventListener('play', updateBigPlayButton);
video.addEventListener('pause', updateBigPlayButton);
bigPlayButton.addEventListener('click', togglePlay);

volumeButton.addEventListener('click', () => {
  video.muted = !video.muted;
  volumeButton.classList.toggle('muted');
});

fullscreen.addEventListener('click', () => {
  video.requestFullscreen();
});



////////////////////ripple
const buttons = document.querySelectorAll('.ripple')

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.clientX
        const y = e.clientY

        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft

        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
    })
})
////////////////////////////burger
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.header-nav');
  const navLinks = document.querySelectorAll('.nav-item');

  burger.addEventListener('click', ()=>{
      //toggle nav
      nav.classList.toggle('nav-active');

      //animate links
      navLinks.forEach((link, index)=>{
          if(link.style.animation){
              link.style.animation='';
          } else{
              link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.1}s`;
          } 
      });
      //burger animation
      burger.classList.toggle('toggle')
      
  });
}
navSlide();

////////////////////////////explore
function initComparisons() {
  var x, i;
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    compareImages(x[i]);
  }
  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    w = img.offsetWidth;
    h = img.offsetHeight;

    img.style.width = (w / 2) + "px";

    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    img.parentElement.insertBefore(slider, img);
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchstop", slideFinish);
    
    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      if (clicked == 0) return false;
      pos = getCursorPos(e)
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      img.style.width = x + "px";
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}
initComparisons();

//////////////////tickets calculator
const typePermanent = document.querySelector('#permanent');
const typeTemporary = document.querySelector('#temporary');
const typeCombined = document.querySelector('#combined'); 
const inputsNum = document.querySelectorAll('.input-num');
const basic = document.querySelector('#basic');
const senior = document.querySelector('#senior');
const output = document.querySelector('#output');
const buyNowBtn = document.querySelector('#buy-now-btn');

//////popup
let selectTicketType = document.querySelector('#type-ticket');//select
let ticketType = selectTicketType.selectedIndex;//index
let ticketTypeValue = selectTicketType.options[ticketType].dataset.cost;//20, 25, 40

const inputsNumPop = document.querySelectorAll('.inp-num-popup');
const basicPop = document.querySelector('#basic-pop');
const seniorPop = document.querySelector('#senior-pop');

const outputBasicSum = document.querySelector('#basic-sum');
const outputSeniorSum = document.querySelector('#senior-sum');

const outputBasic = document.querySelector('#output-basic');
const outputSenior = document.querySelector('#output-senior');
const outputTotal = document.querySelector('#output-total');

const b1 = document.querySelector('.b1');
const s1 = document.querySelector('.s1');
const b2 = document.querySelector('.b2');
const s2 = document.querySelector('.s2');

let formData;

function setDefaultData() {
  if(localStorage.getItem('formData') === null) {
    formData = {
      typePermanent: true,
      typeTemporary: false,
      typeCombined: false,
      basic: 1,
      senior: 1,
      output: 30,
      ticketTypeValue: 20, //cost typeTicket
      ticketType: 0,//save index
    }
    localStorage.setItem('formData', JSON.stringify(formData));
  }   
}

function calculator() {
  let sum;
  let type;
  if (typePermanent.checked) {
    type = selectTicketType.options[0].selected = true;
    ticketType = selectTicketType.selectedIndex;
    ticketTypeValue = typePermanent.value;
    sum = Math.ceil(+typePermanent.value * +basic.value) + (+senior.value * +typePermanent.value / 2);
  }
  if (typeTemporary.checked) {
    type = selectTicketType.options[1].selected = true;
    ticketType = selectTicketType.selectedIndex;
    ticketTypeValue = typeTemporary.value;
    sum = Math.ceil(+typeTemporary.value * +basic.value) + (+senior.value * +typeTemporary.value / 2);
  }
  if (typeCombined.checked) {
    type = selectTicketType.options[2].selected = true;
    ticketType = selectTicketType.selectedIndex;
    ticketTypeValue = typeCombined.value;
    sum = Math.ceil(+typeCombined.value * +basic.value) + (+senior.value * +typeCombined.value / 2);
  }
  output.dataset.cash = sum;
  output.innerHTML = sum;
  setFormData();
}

function calcPopup() {
  let sum;
  if (selectTicketType.value === 'Permanent exhibition') {
    document.querySelector('#info-type').innerHTML = selectTicketType.value;
    typePermanent.checked = true;
    ticketType = '0';
    ticketTypeValue = '20';
   
    sum = Math.ceil(+ticketTypeValue * +basicPop.value) + (+ticketTypeValue * +seniorPop.value / 2);
  }
  if (selectTicketType.value === 'Temporary exhibition') {
    document.querySelector('#info-type').innerHTML = selectTicketType.value;
    typeTemporary.checked = true;
    ticketType = '1';
    ticketTypeValue = '25';
    sum = Math.ceil(+ticketTypeValue * +basicPop.value) + (+ticketTypeValue * +seniorPop.value / 2);
  }
  if (selectTicketType.value === 'Combined Admission') {
    document.querySelector('#info-type').innerHTML = selectTicketType.value;
    typeCombined.checked = true;
    ticketType = '2';
    ticketTypeValue = '40';
    sum = Math.ceil(+ticketTypeValue * +basicPop.value) + (+ticketTypeValue * +seniorPop.value / 2);
  }
  b1.innerHTML = ticketTypeValue;
  b2.innerHTML = ticketTypeValue;
  s1.innerHTML = +ticketTypeValue / 2;
  s2.innerHTML = +ticketTypeValue / 2;
  output.dataset.cash = sum;
  output.innerHTML = sum;
  basic.value = basicPop.value;
  senior.value = seniorPop.value;

  handlePopupForm();
  setFormData();
  console.log('type: ' + ticketType);
  console.log('val: ' + ticketTypeValue);
}
//get data from localStorage
function getFormData() {
  formData = JSON.parse(localStorage.getItem('formData'));
  typePermanent.checked = formData.typePermanent;
  typeTemporary.checked = formData.typeTemporary;
  typeCombined.checked = formData.typeCombined;
  basic.value = formData.basic;
  senior.value = formData.senior;
  output.dataset.cash = formData.output;
  output.innerHTML = formData.output;
  ticketType = formData.ticketType;
  ticketTypeValue = formData.ticketTypeValue;
  basicPop.value = formData.basic;
  seniorPop.value = formData.senior;
  b1.innerHTML = formData.ticketTypeValue;
  b2.innerHTML = formData.ticketTypeValue;
  s1.innerHTML = +formData.ticketTypeValue / 2;
  s2.innerHTML = +formData.ticketTypeValue / 2;
  selectTicketType.options[ticketType].selected = true;
  handlePopupForm();
}
//set data in localStorage
function setFormData(){
  formData = {
    typePermanent: typePermanent.checked,
    typeTemporary: typeTemporary.checked,
    typeCombined: typeCombined.checked,
    basic: basic.value,
    senior: senior.value,
    output: output.dataset.cash,
    ticketTypeValue: ticketTypeValue, //cost typeTicket
    ticketType: ticketType,//save index
  };
  localStorage.setItem('formData', JSON.stringify(formData));
}
//console.log(ticketTypePop[ticketTypePop.selectedIndex].value);

function handlePopupForm() {
  outputBasicSum.innerHTML = basicPop.value;
  outputSeniorSum.innerHTML = seniorPop.value;
  outputBasic.innerHTML = (+basicPop.value * +ticketTypeValue) + '€';
  outputSenior.innerHTML = (+seniorPop.value / 2 * +ticketTypeValue) + '€'; 
  outputTotal.innerHTML = ((+basicPop.value * +ticketTypeValue) + (+seniorPop.value / 2 * +ticketTypeValue)) + '€'; 
  if (ticketType === 0) {document.querySelector('#info-type').innerHTML = 'Permanent exhibition'}
  else if (ticketType === 1) {document.querySelector('#info-type').innerHTML = 'Temporary exhibition'}
  else if (ticketType === 2) {document.querySelector('#info-type').innerHTML = 'Combined Admission'};
  
}
setDefaultData();
getFormData();

const ticketTime = document.querySelector('#ticket-time');
const ticketDate = document.querySelector('#ticket-date');

const infoTime = document.querySelector('#info-time');
const infoDate = document.querySelector('#info-date');



typePermanent.addEventListener('click', calculator);
typeTemporary.addEventListener('click', calculator);
typeCombined.addEventListener('click', calculator);
inputsNum.forEach((input) => input.addEventListener('click', calculator));
buyNowBtn.addEventListener('click', getFormData);
inputsNumPop.forEach((input) => input.addEventListener('click', calcPopup));
selectTicketType.addEventListener('click', calcPopup);
ticketTime.addEventListener('click', () => {
  infoTime.innerHTML = ticketTime.value;
});
ticketDate.addEventListener('change', () => {
  infoDate.innerHTML = ticketDate.value;
});
///////////////////////////validation

const inpName = document.querySelector('#ticket-name');
const errName = document.querySelector('.err-name');
const inpEmail = document.querySelector('#ticket-email');
const errEmail = document.querySelector('.err-email');
const inpTel = document.querySelector('#ticket-tel');
const errTel = document.querySelector('.err-tel');

function nameIsValid() {
  inpName.validity.valid ? errName.innerHTML = '' : errName.textContent = 'Name is invalid.'
}

function emailIsValid() {
  inpEmail.validity.valid ? errEmail.innerHTML = '' : errEmail.textContent = 'E-mail is invalid.'
}

function phoneIsValid() {
  inpTel.validity.valid ? errTel.innerHTML = '' : errTel.textContent = 'Phone is invalid.'
}

inpName.addEventListener('input', nameIsValid);
inpEmail.addEventListener('input', emailIsValid);
inpTel.addEventListener('input', phoneIsValid);