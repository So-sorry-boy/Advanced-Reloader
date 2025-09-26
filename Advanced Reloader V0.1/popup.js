document.getElementById("start").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const interval = Number(document.getElementById("interval").value) || 5;
  const maxCount = Number(document.getElementById("count").value) || 0;

  chrome.runtime.sendMessage({
    action: "start",
    tabId: tab.id,
    interval: interval,
    maxCount: maxCount
  }, (res) => {
    document.getElementById("status").textContent = "Running in background";
  });
});

document.getElementById("stop").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.runtime.sendMessage({ action: "stop", tabId: tab.id }, (res) => {
    document.getElementById("status").textContent = "Stopped";
  });
});
