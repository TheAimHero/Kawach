import isPlaying from './isPlaying';

function captureFrame(video, context, canvas) {
  if (isPlaying(video)) return null;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Access the captured frame data
  const imageDataURL = canvas.toDataURL('image/png');
  return imageDataURL;
}

export default captureFrame;
