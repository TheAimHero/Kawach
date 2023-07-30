import runModel from '../utils/runModel';
import checkNsfw from '../utils/checkNsfw';

let censorWords;
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

// Function to censor the text
function censorText(node) {
  chrome.storage.sync.get(['censorWords', 'censorChar'], data => {
    censorWords = data.censorWords || [];
    censorWords.forEach(word => {
      const pattern = new RegExp(word, 'gi');
      if (node.nodeType === Node.TEXT_NODE && pattern.test(node.textContent)) {
        const censoredText = node.textContent.replace(
          pattern,
          data.censorChar.repeat(word.length)
        );
        node.textContent = censoredText;
      }
    });
  });
}

// Function to recursively traverse the DOM tree and censor text
function traverseDOM(node) {
  censorText(node);
  if (node.nodeName === 'IMG') {
    if (node.height >= 100 || node.width >= 100) {
      node.style.filter = 'blur(20px)';
      node.crossOrigin = 'anonymous';
      processImg(node);
    }
  }
  node.childNodes.forEach(traverseDOM);
}

// Callback function for the mutation observer
function handleMutation(mutationsList) {
  mutationsList.forEach(mutation => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(traverseDOM);
    } else if (mutation.type === 'characterData') {
      censorText(mutation.target);
    }
  });
}

// Create a mutation observer
const observer = new MutationObserver(handleMutation);

// Call the traverseDOM function even when the page has not finished loading
function filterText(addWord) {
  if (addWord && addWord !== '') {
    const word = addWord.trim().toLowerCase();
    if (word.length === 0) return;
    censorWords.push(word);
    chrome.storage.sync.set({ censorWords });
  }

  if (window.self === window.top) {
    // Observe changes in the DOM tree
    observer.observe(document, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
      attributeFilter: ['src'],
    });
  }
}

export default filterText;
