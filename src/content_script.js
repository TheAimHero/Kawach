/* eslint-disable no-console */
import captureFrame from './js/captureFrame';
import filterImages from './js/filterImages';
import filterAndReplaceText from './js/filterText';

// Add the listner to the video
const { body } = document;
const videoArray = document.getElementsByTagName('video');
const video = videoArray[0];

console.log(video);
// @todo: find a way to disable on hover playback
if (video) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  video.addEventListener('loadedmetadata', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  });

  setInterval(() => {
    console.log(captureFrame(video, context, canvas));
  }, 3000);
}

filterAndReplaceText(body);
filterImages();
