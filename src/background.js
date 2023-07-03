// import filterDomain from './js/filterDomains';
/* eslint-disable no-console */
// Create a context menu
chrome.contextMenus.create({
  id: 'censorContextMenu',
  title: 'Censor Word',
  contexts: ['selection'],
});

chrome.storage.sync.get('censoredWords', (data) => {
  if (!data.censoredWords) {
    chrome.storage.sync.set({ censoredWords: ['sex', 'fuck', 'ass', 'tits'] });
  }
});

chrome.storage.sync.set({
  censoredDomains: ['pornhub', 'redtube', 'pornstar', 'xxx', 'xxnx'],
});

let censoredDomains;
chrome.storage.sync.get('censoredDomains', (result) => {
  censoredDomains = result.censoredDomains || [];
});
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = new URL(details.url);
    const domain = url.hostname.split('.')[1];
    if (censoredDomains.includes(domain)) {
      return { redirectUrl: chrome.extension.getURL('./html/blocked.html') };
    }
    return { cancel: false };
  },
  { urls: ['<all_urls>'] },
  ['blocking'],
);

// Add a listener for the context menu click event
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'censorContextMenu') {
    const selectedText = info.selectionText;
    chrome.tabs.sendMessage(tab.id, { action: 'censorText', selectedText });
  }
});
