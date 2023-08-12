import processReddit from './sites/processReddit';
import processYoutube from './sites/processYoutube';
// import processSite from './sites/processSite';

const websiteName = window.location.host.split('.')[1];
if (websiteName === 'reddit') {
  processReddit();
} else if (websiteName === 'youtube') {
  processYoutube();
} else {
  // processSite();
}
