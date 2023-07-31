import processReddit from './sites/processReddit';

const websiteName = window.location.host.split('.')[1];
if (websiteName === 'reddit') {
  processReddit();
}

