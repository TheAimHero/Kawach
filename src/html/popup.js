const option = document.getElementById('option');
const info = document.getElementById('info');
// const level = document.getElementById('level');
const imgBlock = document.getElementById('imgBlock');
const siteBlock = document.getElementById('siteBlock');

option.onclick = () => {
  chrome.runtime.openOptionsPage();
};

info.onclick = () => {
  chrome.tabs.create({ url: 'https://github.com/TheAimHero' });
};

chrome.storage.sync.get(['blockedSites', 'blockedImg'], items => {
  if (items.blockedSites) {
    siteBlock.innerHTML = items.blockedSites;
  } else {
    siteBlock.innerHTML = '0';
  }
  if (items.blockedImg) {
    imgBlock.innerHTML = items.blockedImg;
  } else {
    imgBlock.innerHTML = '0';
  }
});
