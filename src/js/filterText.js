// Function to extract all text nodes from an element
function extractTextNodes(element) {
  const textNodes = [];
  const treeWalker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false,
  );
  let currentNode;
  while (treeWalker.nextNode()) {
    currentNode = treeWalker.nextNode();
    textNodes.push(currentNode);
  }
  // @fix: does not get all text
  return textNodes;
}
// Function to filter and replace text
function filterAndReplaceText(element) {
  // @fix: this is supposed to go in some other file
  // @note: we can use something like webpack or parcel for this when packing the code later
  const filteredWords = ['sex', 'fuck', 'Sex'];
  const textNodes = extractTextNodes(element);
  if (!textNodes) return;
  textNodes.forEach((node) => {
    // @fix: this gives error textContent not found
    // @note: make it continue instead of return
    if (!node?.textContent) return;
    const text = node.textContent;
    let replacedText = text;
    filteredWords.forEach((word) => {
      const regex = new RegExp(word, 'gi');
      // @note: here is where we replace the text to be repalced
      replacedText = replacedText.replace(regex, '***');
    });
    // @hack: es-lint does not like this but works fine
    // eslint-disable-next-line no-param-reassign
    node.textContent = replacedText;
  });
}

export default filterAndReplaceText;
