import addOverlay from '../utils/addOverlay';

async function onCheck(jsonHref) {
  console.log('jsonHref:', jsonHref);
  const res = await fetch(`http://localhost:3000/video/reddit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link: jsonHref }),
  }).catch(err => {
    console.error(err.message);
  });
  const data = await res.json();
  console.log('data:', data);
  return data.result;
}

function processPlayer(shredditPlayer) {
  shredditPlayer.removeAttribute('autoplay');
  shredditPlayer.dataset.checkStatus = 'tagged';
  addOverlay(shredditPlayer, onCheck);
}

function handleMutation(mutationsList) {
  mutationsList.forEach(mutation => {
    if (mutation.target.nodeName === 'SHREDDIT-PLAYER') {
      const shredditPlayer = mutation.target;
      if (!shredditPlayer.dataset.checkStatus) {
        processPlayer(shredditPlayer);
      }
    }
  });
}

const observer = new MutationObserver(handleMutation);

export default function processReddit() {
  if (window.self === window.top) {
    // Observe changes in the DOM tree
    observer.observe(document, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
  return observer;
}
