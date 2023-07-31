function filterText(selectedText, filteredText) {
  if (!selectedText) return;
  const textToFilter = selectedText.trim();
  if (textToFilter.length === 0) return;
  const textNodes = getTextNodes();
  chrome.storage.sync.get('censorWords', data => {
    const newCensorWords = [...data.censorWords, textToFilter];
  });
  textNodes.forEach(node => {
    chrome.storage.sync.get('censorChar', data => {
      node.nodeValue = node.nodeValue.replace(
        new RegExp(selectedText, 'gi'),
        data.censorChar.repeat(textToFilter.length),
      );
    });
  });
}

function getTextNodes() {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false,
  );
  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  return textNodes;
}

export default filterText;
