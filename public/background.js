const interval = 15 * 60 * 1000;

const delta = 0.15;
const jitter = 1 - delta + delta * 2 * Math.random();

setInterval(() => {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "favicon.png",
    title: "Слышь",
    message: "Ну расскажи себе, что делаешь",
  });
}, interval * jitter);

// todo: render reminder notification only if connected = true in chrome.storage
// todo: play with interval in case I missed reminder a couple of times
