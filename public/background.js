const interval = 15 * 60 * 1000;

setInterval(() => {
  chrome.notifications.create("ask-me", {
    type: "basic",
    iconUrl: "favicon.png",
    title: "Слышь",
    message: "Ну расскажи себе, что делаешь",
  });
}, interval);

// todo: render reminder notification only if connected = true in chrome.storage
// todo: add jittering
// todo: play with interval in case I missed reminder a couple of times
