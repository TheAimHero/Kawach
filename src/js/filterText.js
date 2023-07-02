const censoredWords = ['sex', 'fuck'];

// Regular expression pattern to match the words

// Function to censor the text
function censorText(node) {
  censoredWords.forEach((word) => {
    const pattern = new RegExp(word, 'gi');
    if (node.nodeType === Node.TEXT_NODE && pattern.test(node.textContent)) {
      const censoredText = node.textContent.replace(
        pattern,
        '*'.repeat(word.length),
      );
      node.textContent = censoredText;
    }
  });
}

// Function to recursively traverse the DOM tree and censor text
function traverseDOM(node) {
  censorText(node);
  node.childNodes.forEach(traverseDOM);
}

// Callback function for the mutation observer
function handleMutation(mutationsList) {
  mutationsList.forEach((mutation) => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(traverseDOM);
    } else if (mutation.type === 'characterData') {
      censorText(mutation.target);
    }
  });
}

// Create a mutation observer
const observer = new MutationObserver(handleMutation);

// Call the traverseDOM function when the page has finished loading
function filterText() {
  window.addEventListener('load', () => {
    traverseDOM(document.body);

    // Observe changes in the DOM tree
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  });
}

export default filterText;
