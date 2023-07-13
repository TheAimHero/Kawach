/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import runModel from '../utils/runModel';

async function filterImages(src = '') {
  try {
    let imgElement;
    if (src !== '') {
      imgElement = document.querySelector(`img[src="${src}"]`);
    } else {
      // eslint-disable-next-line prefer-destructuring
      imgElement = document.getElementsByTagName('img')[4];
    }
    imgElement.crossOrigin = 'anonymous';
    // donst prediction = await runModel(imgElement);
    // console.log(prediction);
  } catch (e) {
    console.error(e.message);
  }
}

export default filterImages;
