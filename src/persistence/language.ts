import type { IStateMessage } from './stateMessage'
import { get, set } from './localStorage.adapter'

type LanguageMessage = IStateMessage<string>
const key = 'slysh.language'

export const getCurrentLanguage = async (): Promise<string> => {
	const result = await get({ key } as LanguageMessage)
	return result.value
}

export const setCurrentLanguage = async (langCode: string): Promise<void> => {
	const languageMessage: LanguageMessage = { value: langCode, key }
	set(languageMessage)
}
