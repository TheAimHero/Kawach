function filterDomain(details) {
  const { hostname } = new URL(details.url);
  chrome.storage.sync.get('censoredDomains', (data) => {
    const censorDomains = data.censoredDomains || [];
    if (censorDomains.includes(hostname.split('.')[1])) {
      console.log(hostname.split('.')[1]);
      return true;
    }
    return false;
  });
}

export default filterDomain;
