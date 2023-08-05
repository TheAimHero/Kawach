import processReddit from './sites/processReddit';
import processYoutube from './sites/processYoutube';

const websiteName = window.location.host.split('.')[1];
if (websiteName === 'reddit') {
  processReddit();
}

if (websiteName === 'youtube') {
  processYoutube();
}
