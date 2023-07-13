import filterImages from './filterImages';

function filterSelectedImage(imgSrc) {
  console.log(imgSrc);
  // @note: for testing purposes later blur directly
  filterImages(imgSrc);
  // const img = document.querySelector(`img[src="${imgSrc}"]`);
  // img.style.filter = 'blur(5px)';
}

export default filterSelectedImage;
