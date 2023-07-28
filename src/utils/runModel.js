/* eslint-disable no-console */
import { load } from 'nsfwjs';

let model;
async function getModel() {
  model = await load();
}

async function runModel(img) {
  try {
    if (!model) await getModel();
    const predictions = await model.classify(img);
    return predictions;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

export default runModel;
