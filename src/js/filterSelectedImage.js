function filterSelectedImage(imgSrc) {
  chrome.storage.sync.get('blurAmt', data => {
    const imgNodeList = document.querySelectorAll(`img[src="${imgSrc}"]`);
    imgNodeList.forEach(img => {
      img.style.filter = `blur(${data.blurAmt}px)`;
    });
  });
}

export default filterSelectedImage;
