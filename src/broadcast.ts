import { storeUri, apiKey, devMode } from './secret_key'

interface Message {
    postedAt: Date
    action: string
}

export const broadcast = (text: string) => {
  const now = new Date()
  const message: Message = {
    postedAt: now,
    action: text,
  }

  if (devMode) {
    console.log(message)
    return
  }

  fetch(storeUri, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(message)
  })
}