let censoredWords;
// Function to censor the text
function censorText(node) {
  chrome.storage.sync.get('censoredWords', (data) => {
    censoredWords = data.censoredWords || [];
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

// Call the traverseDOM function even when the page has not finished loading
function filterText(addWord) {
  if (addWord && addWord !== '') {
    const word = addWord.trim().toLowerCase();
    if (word.length === 0) return;
    censoredWords.push(word);
    chrome.storage.sync.set({ censoredWords });
  }
  traverseDOM(document.body);

  // Observe changes in the DOM tree
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

export default filterText;
