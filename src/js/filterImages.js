import checkNsfw from '../utils/checkNsfw';
import keepVisible from '../utils/keepVisible';
import runModel from '../utils/runModel';

let imgArr;

function debounce(func, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function getImgArr() {
  imgArr = keepVisible(document.querySelectorAll('img:not(.imgProcessed)'));
}

function blurImg() {
  for (let i = 0; i < imgArr.length; i += 1) {
    imgArr[i].style.filter = 'blur(10px)';
    imgArr[i].crossOrigin = 'anonymous';
  }
}

function censorImg() {
  imgArr.forEach(async (img) => {
    const prediction = await runModel(img);
    img.classList.add('imgProcessed');
    if (prediction && !checkNsfw(prediction)) img.style.filter = '';
  });
}

let timer;
function setTimer() {
  clearTimeout(timer);
  getImgArr();
  blurImg();
  timer = setTimeout(() => {
    debounce(censorImg(), 1000);
  }, 300);
}

function filterImages() {
  clearTimeout(timer);
  getImgArr();
  blurImg();
  censorImg();
  window.addEventListener('scroll', setTimer);
}

export default filterImages;
