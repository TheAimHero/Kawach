import checkNsfw from '../utils/checkNsfw';
import keepVisible from '../utils/keepVisible';
import runModel from '../utils/runModel';

let imgArr;

function debounce(func, delay) {
  let timerId;
  return (...args) => {
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
  chrome.storage.sync.get('blurAmt', data => {
    for (let i = 0; i < imgArr.length; i += 1) {
      imgArr[i].style.filter = `blur(${data.blurAmt}px)`;
      imgArr[i].crossOrigin = 'anonymous';
    }
  });
}

async function censorImg() {
  const img = imgArr.pop();
  const prediction = await runModel(img);
  img.classList.add('imgProcessed');
  if (prediction && !checkNsfw(prediction)) img.style.filter = '';
  if (imgArr.length !== 0) censorImg();
}

let timer;
function setTimer() {
  clearTimeout(timer);
  getImgArr();
  blurImg();
  timer = setTimeout(() => {
    debounce(censorImg(), 100);
  }, 100);
}

function filterImages() {
  const scrollEvent = new Event('scroll');
  window.addEventListener('scroll', setTimer);
  window.dispatchEvent(scrollEvent);
}

export default filterImages;
