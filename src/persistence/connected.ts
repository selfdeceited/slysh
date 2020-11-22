import { _ } from 'svelte-i18n'
import type { IStateMessage } from './stateMessage'
import { setAndBroadcast, get } from './localStorage.adapter'
import { toBoolean } from './inference'

const key = 'slysh.arrived'

export type ConnectedMessage = IStateMessage<boolean>

const getLocalized = (name: string): Promise<string> => {
	return new Promise(resolve => _.subscribe(translate => resolve(translate(name))))
}

const set = (connected: boolean, messageText: string): void => {
	setAndBroadcast({ value: connected, key } as ConnectedMessage, {
		messageText,
	})
}

export const markArrived = async (): Promise<void> => set(true, await getLocalized('popup.arrived'))
export const markDeparted = async (): Promise<void> => set(false, await getLocalized('popup.departed'))

export const hasArrived = async (): Promise<boolean> => {
	var here = await get({ key } as ConnectedMessage)
	console.log('here', here)
	var connected = toBoolean(here).value

	if (connected) {
		console.log('on start if ls exists', connected)
		return connected
	} else {
		set(false, await getLocalized('popup.probablyArrived'))
		console.log('on start if ls does not exist', connected)
		return false
	}
}
