import { _ } from "svelte-i18n";
import type { IStateMessage, BroadcastOptions } from "../interfaces";
import { setAndBroadcast, get } from "./localStorage.adapter";

const storageKey = "slysh.arrived";

type ConnectedMessage = IStateMessage<boolean>;

const getLocalized = (name: string): Promise<string> => {
  return new Promise((r) => {
    _.subscribe((a) => {
      var result = a(name);
      r(result);
    });
  });
};

const set = (connected: boolean, messageText: string) => {
  setAndBroadcast({ value: connected, key: storageKey } as ConnectedMessage, {
    messageText,
  });
};

export const arrived = async () =>
  set(true, await getLocalized("popup.arrived"));

export const departed = async () =>
  set(false, await getLocalized("popup.departed"));

export const hasArrived = async () => {
  var here = await get({ key: storageKey } as ConnectedMessage);
  console.log("here", here);
  var connected = here as any;
  if (typeof connected !== "boolean") connected = here === "true";

  if (connected) {
    console.log("on start if ls exists", connected);
    return connected;
  } else {
    set(false, await getLocalized("popup.probablyArrived"));
    console.log("on start if ls does not exist", connected);
    return false;
  }
};

/*

here true
bundle.js:15 false
bundle.js:15 on start if ls does not exist false
*/
