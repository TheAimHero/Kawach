function isElementVisible(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    && rect.bottom >= 0
    && rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    && rect.right >= 0
    && (rect.height > 300 || rect.width > 300)
  );
}

function keepVisible(imgElements) {
  const visibleImgElements = [];

  // Loop through each <img> element and check if it is visible in the window
  for (let i = 0; i < imgElements.length; i += 1) {
    const imgElement = imgElements[i];

    // Check if the image is visible
    if (isElementVisible(imgElement)) {
      visibleImgElements.push(imgElement);
    }
  }

  return visibleImgElements;
}

export default keepVisible;
