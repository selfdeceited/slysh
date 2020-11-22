import type { IStateMessage } from './stateMessage'
import { get, set } from './localStorage.adapter'

type ChoreMessage = IStateMessage<string>

export const key = 'slysh.currentChore'
export const getCurrentChore = async (): Promise<string> => {
	const message = await get({ key } as ChoreMessage)
	return message.value
}

export const setCurrentChore = async (chore: string): Promise<void> => {
	const choreMessage: ChoreMessage = { value: chore, key }
	set(choreMessage)
}
