import type { IStateMessage } from './stateMessage'
import { get, set } from './localStorage.adapter'

type LanguageMessage = IStateMessage<string>
const key = 'slysh.language'

export const getCurrentLanguage = async () => {
	return await get({ key } as LanguageMessage)
}

export const setCurrentLanguage = async (langCode: string) => {
	const languageMessage: LanguageMessage = { value: langCode, key }
	set(languageMessage)
}
