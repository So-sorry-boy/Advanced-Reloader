let timers = {};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "start") {
    const tabId = msg.tabId;
    const interval = msg.interval * 1000;
    const maxCount = msg.maxCount;
    let count = 0;

    if (timers[tabId]) clearInterval(timers[tabId]);

    timers[tabId] = setInterval(() => {
      count++;
      if (maxCount > 0 && count > maxCount) {
        clearInterval(timers[tabId]);
        delete timers[tabId];
        return;
      }
      chrome.tabs.reload(tabId);
    }, interval);

    sendResponse({ status: "started" });
  }

  if (msg.action === "stop") {
    const tabId = msg.tabId;
    if (timers[tabId]) {
      clearInterval(timers[tabId]);
      delete timers[tabId];
    }
    sendResponse({ status: "stopped" });
  }
});
