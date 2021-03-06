/// <reference types="chrome"/>
/// <reference types="node" />

import { broadcast } from '../operations/broadcast'
import type { BroadcastOptions } from '../operations/broadcast'
import type { IStateMessage } from './stateMessage'

export function set<T>({ value, key }: IStateMessage<T>) {
	console.log('devMode', process.env.devMode === 'true')
	if (process.env.devMode === 'true') {
		console.log('set for', key, value)
		localStorage.setItem(key, String(value))
		return
	}

	chrome.storage.sync.set({ [key]: value ?? '' }, () => {
		console.log('set for', key, value)
	})
}

export function get<T>({ key }: IStateMessage<T>): Promise<IStateMessage<string>> {
	return new Promise(r => {
		console.log('devMode', process.env.devMode === 'true')
		if (process.env.devMode === 'true') {
			var val = localStorage.getItem(key)
			console.log('get', key, val)
			r({ key, value: val })
		}

		chrome.storage.sync.get([key], items => {
			console.log('get', key, items[key])
			r({ key, value: items[key] })
		})
	})
}

export function setAndBroadcast<T>(message: IStateMessage<T>, { messageText }: BroadcastOptions) {
	set(message)
	broadcast(messageText)
}
