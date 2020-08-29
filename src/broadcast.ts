import { apiKey, devMode, storeUri } from "./secret_key";
import type { Message } from "./interfaces";

export const broadcast = (text: string) => {
  const now = new Date();
  const message: Message = {
    postedAt: now,
    action: text,
  };

  if (devMode) {
    console.log(message);
    return;
  }

  fetch(storeUri, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(message),
  });
};
