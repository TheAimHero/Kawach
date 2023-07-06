// Function to censor the text
function censorImage(node) {
  if (node.tagName === 'IMG') {
    // node.style.filter = 'blur(5px)';
  }
}

// Function to recursively traverse the DOM tree and censor text
function traverseDOM(node) {
  censorImage(node);
  node.childNodes.forEach(traverseDOM);
}

// Callback function for the mutation observer
function handleMutation(mutationsList) {
  mutationsList.forEach((mutation) => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(traverseDOM);
    } else if (mutation.type === 'characterData') {
      censorImage(mutation.target);
    }
  });
}

// Create a mutation observer
const observer = new MutationObserver(handleMutation);

// Call the traverseDOM function even when the page has not finished loading
function filterImages() {
  traverseDOM(document.body);

  // Observe changes in the DOM tree
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

export default filterImages;
