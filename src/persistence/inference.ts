import type { IStateMessage } from './stateMessage'

export function toBoolean(message: IStateMessage<string>): IStateMessage<boolean> {
	return { key: message.key, value: message.value === 'true' }
}
