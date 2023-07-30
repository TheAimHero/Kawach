function filterSelectedImage(imgSrc) {
  chrome.storage.sync.get('blurAmt', data => {
    // console.log(imgSrc);
    const img = document.querySelector(`img[src="${imgSrc}"]`);
    img.style.filter = `blur(${data.blurAmt}px)`;
  });
}

export default filterSelectedImage;
