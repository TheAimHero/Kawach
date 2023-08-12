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

chrome.contextMenus.create({
  id: 'uncensorImage',
  title: 'Uncensor Image',
  contexts: ['image'],
});

chrome.storage.sync.get(null, data => {
  if (!data.censorWords) {
    chrome.storage.sync.set({ censorWords: blockedWords });
  }

  if (!data.censorChar) {
    chrome.storage.sync.set({ censorChar: '*' });
  }

  if (!data.blurAmt) {
    chrome.storage.sync.set({ blurAmt: 10 });
  }

  if (!data.censorChar) {
    chrome.storage.sync.set({ censorChar: '*' });
  }

  if (!data.censorSite) {
    chrome.storage.sync.set({ censorSite: blockedDomains });
  }

  if (!data.minDim) {
    chrome.storage.sync.set({ minDim: 50 });
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  details => {
    chrome.storage.sync.get('censorSite', data => {
      const url = new URL(details.url);
      const domain = url.hostname.split('.')[1];

      if (data.censorSite.includes(domain)) {
        chrome.tabs.sendMessage(details.tabId, {
          action: 'blocked',
        });
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            const currentTab = tabs[0];
            chrome.tabs.create(
              { url: chrome.extension.getURL('./html/blocked.html') },
              function (newTab) {
                chrome.tabs.remove(currentTab.id);
              },
            );
          },
        );
      } else {
        return { cancel: false };
      }
    });
  },
  { urls: ['<all_urls>'] },
  ['blocking'],
);

const prevUrl = '';
chrome.webNavigation.onCompleted.addListener(details => {
  chrome.tabs.get(details.tabId, tab => {
    const url = tab.url;
    if (url !== prevUrl) {
      performFetch(url);
    }
  });
});

function showNotificationForHateSpeech(data) {
  const notificationOptions = {
    type: 'basic',
    title: 'Fetched Data',
    message: 'Hate Speech Detected On This Page',
    iconUrl: './img/icon128.png', // Path to your extension's icon
  };

  chrome.notifications.create('fetchNotification', notificationOptions);
}

function showNotificationForContext(data) {
  const notificationOptions = {
    type: 'basic',
    title: 'Fetched Data',
    message: `This Page Is Of Context ${data}`,
    iconUrl: './img/icon128.png', // Path to your extension's icon
  };

  chrome.notifications.create('fetchNotification', notificationOptions);
}

async function performFetch(url) {
  const response = await fetch('http://localhost:3000/hate-speech/url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link: url }),
  });

  const data = await response.json();
  console.log(data.data.result);
  if (data.data.hateSpeech !== '[]') {
    showNotificationForHateSpeech(data);
  }
  setTimeout(() => {
    showNotificationForContext(data.data.context);
  }, 2000);
  console.log(data);
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'censorText') {
    const selectedText = info.selectionText;
    chrome.tabs.sendMessage(tab.id, { action: 'censorText', selectedText });
  } else if (info.menuItemId === 'censorImage') {
    const imgSrc = info.srcUrl;
    chrome.tabs.sendMessage(tab.id, { action: 'censorImage', imgSrc });
  } else if (info.menuItemId === 'uncensorImage') {
    const imgSrc = info.srcUrl;
    chrome.tabs.sendMessage(tab.id, { action: 'uncensorImage', imgSrc });
  }
});

chrome.storage.sync.get(null, data => {
  console.log(data);
});
