/// <reference types="node" />

export const broadcast = (text: string) => {
  const now = new Date();
  const message: Message = {
    postedAt: now,
    action: text,
  };

  if (Boolean(process.env.devMode)) {
    console.log(message);
    return;
  }

  fetch(process.env.storeUri, {
    method: "POST",
    headers: {
      "x-api-key": process.env.apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

export interface BroadcastOptions {
  messageText?: string;
  required?: boolean;
}

export interface Message {
  postedAt: Date;
  action: string;
}
