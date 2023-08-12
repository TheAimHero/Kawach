let currentHref = null;

function showNotificationForHateSpeech(data) {
  const notificationOptions = {
    type: 'basic',
    title: 'Fetched Data',
    message: 'Hate Speech Detected On This Page',
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
  console.log(data);
  if (data.data.result !== '[]') {
    showNotificationForHateSpeech(data);
  }
  return;
}

async function handleHashChange(override = false) {
  const newHref = window.location.href;
  console.log(newHref,currentHref)

  if (newHref !== currentHref || override) {
    currentHref = newHref;
    await performFetch();
  }
}

export default function processSite() {
  setInterval(handleHashChange, 1000);
}
