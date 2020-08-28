/// <reference types="chrome"/>
import { broadcast } from "./broadcast";
import { devMode } from "./secret_key";

interface BroadcastOptions {
  messageText?: string;
  required?: boolean;
}

interface IStateMessage {
  connected: boolean;
}

const storageKey = "slysh.arrived";
const set = ({ connected }: IStateMessage) => {
  if (devMode) {
    localStorage.setItem(storageKey, String(connected));
    return;
  }

  chrome.storage.sync.set({ "slysh.arrived": connected }, function () {
    console.log("set connected", connected);
  });
};

const get: () => Promise<IStateMessage> = () => {
  return new Promise((r) => {
    if (devMode) {
      var connectedFromLs = localStorage.getItem(storageKey);
      console.log(connectedFromLs);
      r({ connected: connectedFromLs === "true" });
    }

    chrome.storage.sync.get([storageKey], (items) => {
      console.log("get connected", items[storageKey]);
      r({ connected: items[storageKey] });
    });
  });
};

const setAndBroadcast = (
  message: IStateMessage,
  { messageText, required }: BroadcastOptions
) => {
  set(message);
  if (required ?? true) broadcast(messageText);
};

export const arrived = () =>
  setAndBroadcast({ connected: true }, { messageText: "Пришел" });

export const departed = () =>
  setAndBroadcast({ connected: false }, { messageText: "Ушел" });

export const hasArrived = async () => {
  var here = await get();
  if (here.connected != void 0) {
    console.log("on start if ls exists", here.connected);
    return Boolean(here.connected);
  } else {
    setAndBroadcast({ connected: false }, { messageText: "мб пришел" });
    console.log("on start if ls does not exist", here.connected);
    return false;
  }
};
