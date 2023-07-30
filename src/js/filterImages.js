import runModel from '../utils/runModel';
import checkNsfw from '../utils/checkNsfw';

const arr = [];
let status = 'open';

async function tryModel() {
  if (status === 'open') {
    status = 'close';
    const img = arr.shift();
    if (img && img.dataset) {
      const pred = await runModel(img);
      if (pred && !checkNsfw(pred)) {
        img.style.filter = 'none';
      } else {
        console.log('pred:', pred, 'img:', img);
      }
      img.dataset.imgProcessed = true;
    }
    status = 'open';
    if (arr.length > 0) tryModel();
  }
}

function processImg(node) {
  if (node.dataset && !node.dataset.imgProcessed) {
    arr.push(node);
    tryModel();
  }
}

function traverseDOM(node) {
  if (node.nodeName === 'IMG') {
    if (node.height >= 100 || node.width >= 100) {
      node.style.filter = 'blur(20px)';
      node.crossOrigin = 'anonymous';
      processImg(node);
    }
  }
  node.childNodes.forEach(traverseDOM);
}

function callback(mutationList) {
  mutationList.forEach(mutation => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(traverseDOM);
    }
  });
}

const observer = new MutationObserver(callback);

export default function filterImages() {
  if (window.self === window.top) {
    observer.observe(document, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
      attributeFilter: ['src'],
    });
    tryModel();
  }
}
