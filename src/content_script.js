/* eslint-disable no-console */
import captureFrame from './js/captureFrame';
import filterImages from './js/filterImages';
import filterText from './js/filterText';

// Add the listner to the video
const videoArray = document.getElementsByTagName('video');
const video = videoArray[0];

// @todo: find a way to disable on hover playback
if (video) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  video.addEventListener('loadedmetadata', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  });

  setInterval(() => {
    // console.log(captureFrame(video, context, canvas));
    captureFrame(video, context, canvas);
  }, 3000);
}

filterText();
filterImages();

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'censorText') {
    filterText(message.selectedText);}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action !== 'censorDomains') return;
  filterImages(message.selectedText);
});
