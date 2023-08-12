const videoArray = document.getElementsByTagName('video');
const video = videoArray[0];

function isPlaying(video) {
  return !video.paused && !video.ended;
}

async function captureFrame(video, context, canvas) {
  if (!isPlaying(video)) return null;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const imgBuffer = imageData.data.buffer;

  const blob = new Blob([imgBuffer], { type: 'image/jpg' }); // Adjust the MIME type as needed

  // Create a FormData to send the Blob
  const formData = new FormData();
  formData.append('image', blob, 'image.jpg');

  const response = await fetch('http://localhost:3000/trial', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data;
}

// @todo: find a way to disable on hover playback
if (video) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  video.addEventListener('loadedmetadata', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  });

  setInterval(async () => {
    console.log(await captureFrame(video, context, canvas));
  }, 3000);
}
