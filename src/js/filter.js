import processImg from './processImg';
import checkNsfw from '../utils/checkNsfw';

let censorWords;

// Function to censor the text
function censorText(node) {
  chrome.storage.sync.get(['censorWords', 'censorChar'], data => {
    censorWords = data.censorWords || [];
    censorWords.forEach(word => {
      const pattern = new RegExp(`\\b${word}\\b`, 'gi');
      if (node.nodeType === Node.TEXT_NODE && pattern.test(node.textContent)) {
        const censoredText = node.textContent.replace(
          pattern,
          data.censorChar.repeat(word.length),
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
    chrome.storage.sync.get(['minDim', 'blurAmt'], data => {
      if (node.height >= +data.minDim || node.width >= +data.minDim) {
        node.style.filter = `blur(${+data.blurAmt}px)`;
        node.crossOrigin = 'anonymous';
        processImg(node);
      }
    });
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
function filter() {
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

export default filter;
