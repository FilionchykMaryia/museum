$(document).ready(function(){
  $('.welcome-slider').slick({
    arrows: true,
    dots: true
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
    speed: 500,
    easing: 'ease',
    initialSlide: 1,
    touchTreshold: 10,
  });
  $('.video-slider').slick({
    arrows: false,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 700,
    easing: 'ease',
    infinite: true,
    initialSlide: 0,
    autoplay: false,
    asNavFor: '.video-sm-slider'
  });
});

///////////////////////video
const progress = document.querySelector('.progress');
const progressVol = document.querySelector('.progress-vol');
 
function range () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #999999 ${value}%, #999999 100%)`
}
progress.addEventListener('input', range);
progressVol.addEventListener('input', range);

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
    images+=`<img class="gallery-img" src="assets/img/galery/galery${img}.jpg" alt="galery${img}">`;
  })
  pictureInnerContainer.innerHTML = images;
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