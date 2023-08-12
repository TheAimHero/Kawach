// Store the current hash
let currentHref = window.location.href;

function pauseVideo(e) {
  e.target.pause();
}

async function onCheck(jsonHref) {
  console.log('jsonHref:', jsonHref);
  const res = await fetch(`http://localhost:3000/video/yt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link: currentHref }),
  }).catch(err => {
    console.error(err.message);
  });
  const data = await res.json();
  console.log(data);
  return data.data.type;
}

function addOverlay(node) {
  node.addEventListener('play', pauseVideo);
  const playBtn = document.querySelector('.ytp-play-button');
  console.log(playBtn);
  playBtn.click();
  const overlay = document.createElement('div');
  overlay.style =
    'cursor: pointer; position: relative; width: 100%; height: 100%; float: left; background-color: grey;';
  overlay.className = 'overlay';

  overlay.addEventListener('click', () => {
    node.removeEventListener('play', pauseVideo);
    playBtn.click();
    overlay.remove();
  });

  const button = document.createElement('button');
  button.innerText = 'Check Video';
  button.style =
    'width: 20%; margin: 25% 40%; background-color: black; border-radius: 20px; padding-block: 5px; color: white; ';
  button.className = 'button';
  button.addEventListener('click', async e => {
    e.stopPropagation();
    const data = await onCheck(currentHref);
    if (data === 'sfw') {
      console.log(data.data.type);
      node.removeEventListener('play', pauseVideo);
      playBtn.click();
      overlay.remove();
    }
  });
  overlay.appendChild(button);
  node.parentNode.appendChild(overlay);
}
// Function to handle URL hash changes
function handleHashChange(override = false) {
  const newHref = window.location.href;

  if (newHref !== currentHref || override) {
    currentHref = newHref;
    if (currentHref.includes('watch')) {
      const video = document.querySelector('video');
      addOverlay(video);
    }
  }
}

export default function processYoutube() {
  setInterval(handleHashChange, 1000);
  if (currentHref.includes('watch')) {
    console.log('newHref:', currentHref);
    handleHashChange(true);
  }
}
