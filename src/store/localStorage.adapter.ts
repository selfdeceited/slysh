/// <reference types="chrome"/>
import { broadcast } from "../broadcast";
import { devMode } from "../secret_key";

import type { IStateMessage, BroadcastOptions } from "../interfaces";

export function set<T>({ value, key }: IStateMessage<T>) {
  console.log(devMode);
  if (devMode) {
    console.log("set for", key, value);
    localStorage.setItem(key, String(value));
    return;
  }

  chrome.storage.sync.set({ [key]: value ?? "" }, () => {
    console.log("set for", key, value);
  });
}

export function get<T>({ key }: IStateMessage<T>): Promise<string> {
  return new Promise((r) => {
    if (devMode) {
      var val = localStorage.getItem(key);
      console.log("get", key, val);
      r(val);
    }

    chrome.storage.sync.get([key], (items) => {
      console.log("get", key, items[key]);
      r(items[key]);
    });
  });
}

export function setAndBroadcast<T>(
  message: IStateMessage<T>,
  { messageText }: BroadcastOptions
) {
  set(message);
  broadcast(messageText);
}
