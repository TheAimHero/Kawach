/* eslint-disable no-console */
import filter from './js/filter';
import filterText from './js/filterText';
import {
  filterSelectedImage,
  uncensorSelectedImage,
} from './js/filterSelectedImage';

filter();

chrome.runtime.onMessage.addListener(message => {
  if (message.action === 'censorText') {
    filterText(message.selectedText);
  } else if (message.action === 'censorImage') {
    filterSelectedImage(message.imgSrc);
  } else if (message.action === 'uncensorImage') {
    uncensorSelectedImage(message.imgSrc);
  }
});
