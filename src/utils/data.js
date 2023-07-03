import PromiseResolve from 'es-abstract/2018/PromiseResolve';

export async function getCensoredWords() {
  let censoredWords;
  chrome.storage.sync.get('censoredWords', (data) => {
    censoredWords = data.censoredWords || [];
  });
  return censoredWords
  // return PromiseResolve(censoredWords);
}

export const blockedDomains = ['pornhub', 'redtube', 'porn', 'xxnx'];
