import {
  tile, image, browser, loadLayersModel,
} from '@tensorflow/tfjs';

async function runModel(imgElement) {
  try {
    const start = Date.now();
    const pixelData = await browser.fromPixelsAsync(imgElement).catch((e) => {
      throw new Error(e.message);
    });
    const resizedImg = image.resizeBilinear(pixelData, [64, 64]);
    const model = await loadLayersModel(
      chrome.runtime.getURL('model/model.json'),
    );
    const batchedImg = resizedImg.expandDims(0);
    const repeatedImg = tile(batchedImg, [10, 1, 1, 1]);
    const timeDistributedInput = repeatedImg.reshape([1, 10, 64, 64, 3]);
    const prediction = model.predict(timeDistributedInput);
    const predictionArray = await prediction.array();

    const end = Date.now();
    console.log(end - start);
    return predictionArray;
  } catch (e) {
    console.error(e.message);
    return [];
  }
}

export default runModel;
