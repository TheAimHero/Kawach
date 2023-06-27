// Function to filter images
function filterImages() {
  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i += 1) {
    const image = images[i];
    // @todo: The logic of filtering is supposed to be implemented here
    // @note: currently blocks any images from wikimedia.org
    if (image.src.includes('wikimedia.org')) {
      // @note: this hides the images .
      // image.style.display = 'none';
      // @note: this blurs the images
      image.style.filter = 'blur(5px)';
    }
  }
}

export default filterImages;
