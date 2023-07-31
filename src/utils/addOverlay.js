export default function addOverlay(node, onCheck) {
  const overlay = document.createElement('div');
  overlay.style =
    'cursor: pointer; width: 100%; height: 100%; float: left; background-color: grey; z-index: 10;';
  overlay.className = 'overlay';

  overlay.addEventListener('click', () => {
    overlay.remove();
    const videoPlayBtn = node.shadowRoot.querySelector('vds-play-button');
    videoPlayBtn.click();
    node.setAttribute('autoplay', null);
    const video = node.shadowRoot.querySelector('video');
    video.play();
  });

  const button = document.createElement('button');
  button.innerText = 'Check Video';
  button.style = 'width: 20%; margin: 10% 40%;';
  button.className = 'button';
  button.addEventListener('click', async e => {
    e.stopPropagation();
    const video = node.shadowRoot.querySelector('video');
    const post = node.closest('shreddit-post');
    if (!video || !post) {
      overlay.remove();
      return;
    }
    const dataHref = post.querySelector('a').getAttribute('href');
    if (!dataHref) overlay.remove();
    const jsonHref = `https://www.reddit.com${dataHref}.json`;
    const response = await onCheck(jsonHref);
    if (!response) {
      overlay.remove();
      const videoPlayBtn = node.shadowRoot.querySelector('vds-play-button');
      videoPlayBtn.click();
      node.setAttribute('autoplay', null);
      const video = node.shadowRoot.querySelector('video');
      video.play();
    }
  });
  overlay.appendChild(button);

  node.insertAdjacentElement('beforebegin', overlay);
}
