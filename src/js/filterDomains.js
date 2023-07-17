function filterDomain(details) {
  const { hostname } = new URL(details.url);
  chrome.storage.sync.get('censorSite', data => {
    const censorSite = data.censorSite || [];
    if (censorSite.includes(hostname.split('.')[1])) {
      return true;
    }
    return false;
  });
}

export default filterDomain;
