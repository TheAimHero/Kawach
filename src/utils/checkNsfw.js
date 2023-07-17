// @todo: fix this to take in the severity set by the user
function checkNsfw(prediction) {
  console.log(prediction);
  if (!prediction) return true;
  const arr = [prediction[0].className];
  if (
    arr.includes('Porn')
    || arr.includes('Hentai')
    || arr.includes('Sexy')
    || arr.includes('Drawing')
  ) {
    return true;
  }
  return false;
}

export default checkNsfw;
