/* eslint-disable no-console */
// Create a context menu
chrome.contextMenus.create({
  id: 'censorContextMenu',
  title: 'Censor Word',
  contexts: ['selection'],
});

// @note: here temporarily move to options.js later
chrome.storage.sync.set({ censoredWords: ['sex', 'fuck', 'ass', 'tits'] });

// Add a listener for the context menu click event
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'censorContextMenu') {
    const selectedText = info.selectionText;
    chrome.tabs.sendMessage(tab.id, { action: 'censorText', selectedText });
  }
});
