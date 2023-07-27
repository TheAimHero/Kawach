import { blockedWords, blockedDomains } from './utils/data';
/* eslint-disable no-console */
chrome.contextMenus.create({
  id: 'censorText',
  title: 'Censor Word',
  contexts: ['selection'],
});

chrome.contextMenus.create({
  id: 'censorImage',
  title: 'Censor Image',
  contexts: ['image'],
});

chrome.storage.sync.get('censorWords', data => {
  if (!data.censorWords) {
    chrome.storage.sync.set({ censorWords: blockedWords });
  }
});

chrome.storage.sync.get('censorChar', data => {
  if (!data.censorChar) {
    chrome.storage.sync.set({ censorChar: '*' });
  }
});

chrome.storage.sync.get('blurAmt', data => {
  if (!data.blurAmt) {
    chrome.storage.sync.set({ blurAmt: '*' });
  }
});

chrome.storage.sync.get('censorSite', data => {
  if (!data.censorSite) {
    chrome.storage.sync.set({
      // prettier-ignore
      censorSite: blockedDomains,
    });
  }
});

let censorSite;
chrome.storage.sync.get('censorSite', result => {
  censorSite = result.censorSite || [];
});
chrome.webRequest.onBeforeRequest.addListener(
  details => {
    const url = new URL(details.url);
    const domain = url.hostname.split('.')[1];
    if (censorSite.includes(domain)) {
      return { redirectUrl: chrome.extension.getURL('./html/blocked.html') };
    }
    return { cancel: false };
  },
  { urls: ['<all_urls>'] },
  ['blocking']
);

// Add a listener for the context menu click event
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'censorText') {
    const selectedText = info.selectionText;
    chrome.tabs.sendMessage(tab.id, { action: 'censorText', selectedText });
  } else if (info.menuItemId === 'censorImage') {
    const imgSrc = info.srcUrl;
    chrome.tabs.sendMessage(tab.id, { action: 'censorImage', imgSrc });
  }
});

chrome.storage.sync.get(null, data => {
  console.log(data);
});
