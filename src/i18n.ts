import { addMessages, getLocaleFromNavigator, init, locale } from 'svelte-i18n'

import en from './translations/en.json'
import { getCurrentLanguage } from './persistence/language'
import ru from './translations/ru.json'

export const localize = async () => {
	addMessages('en', en)
	addMessages('ru', ru)

	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator(),
	})
}

export const adjustLanguage = async () => {
	const currentLanguage = await getCurrentLanguage()
	console.log('currentLanguage', currentLanguage)
	if (currentLanguage) locale.set(currentLanguage)
}
