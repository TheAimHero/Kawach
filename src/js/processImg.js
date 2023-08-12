import runModel from '../utils/runModel';
import checkNsfw from '../utils/checkNsfw';

const arr = [];
let status = 'open';

async function tryModel() {
  if (status === 'open') {
    const img = arr.shift();
    if (img && img.dataset) {
      status = 'close';
      const pred = await runModel(img);
      if (pred && !checkNsfw(pred)) {
        img.style.filter = 'none';
      }
      img.dataset.imgProcessed = true;
    }
    status = 'open';
    if (arr.length > 0) tryModel();
  }
}

export default function processImg(node) {
  if (node.dataset && !node.dataset.imgProcessed) {
    arr.push(node);
    tryModel();
  }
}
