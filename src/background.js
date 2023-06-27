/* eslint-disable no-console */
// background.js

// Event listener for intercepting requests
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // @note: print all the url
    // console.log('Intercepted request:', details.url);

    // @note: get only the links that are fetching images
    // may not work all the time have to look at the response
    const fileTypes = ['png', 'svg', 'jpg', 'jpeg'];
    fileTypes.forEach((type) => {
      if (details.url.endsWith(type)) {
        // console.log('Intercepted request:', details.url);
      }
    });
    // @note: If you want to block the request, you can return { cancel: true };
  },
  { urls: ['<all_urls>'] },
  ['blocking'],
);
