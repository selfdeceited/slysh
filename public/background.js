const delayInMinutes = 5;
const connectedKey = "slysh.arrived";
// todo: render reminder notification only if connected = true in chrome.storage
// todo: play with interval in case I missed reminder a couple of times

chrome.alarms.create({ delayInMinutes: delayInMinutes });

chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.sync.get([connectedKey], (items) => {
    console.log(connectedKey, items[connectedKey]);
    if (items[connectedKey] === true) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "favicon.png",
        title: "Слышь",
        message: "Ну расскажи себе, что делаешь",
      });
    }
  });
});
