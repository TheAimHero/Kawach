export function filterSelectedImage(imgSrc) {
  fetch('http://localhost:3000/rate/image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imgSrc: imgSrc }),
  });
  chrome.storage.sync.get('blurAmt', data => {
    let imgNodeList = document.querySelectorAll(`img[src="${imgSrc}"]`);
    if (imgNodeList.length === 0) {
      const url = new URL(imgSrc);
      imgNodeList = document.querySelectorAll(`img[src="${url.pathname}"]`);
    }
    imgNodeList[0].style.filter = `blur(${data.blurAmt}px)`;
  });
}

export function uncensorSelectedImage(imgSrc) {
  let imgNodeList = document.querySelectorAll(`img[src="${imgSrc}"]`);
  if (imgNodeList.length === 0) {
    const url = new URL(imgSrc);
    imgNodeList = document.querySelectorAll(`img[src="${url.pathname}"]`);
  }
  imgNodeList[0].style.filter = `none`;
}
