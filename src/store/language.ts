import type { IStateMessage } from "../interfaces";
import { get, set } from "./localStorage.adapter";

export type LanguageMessage = IStateMessage<string>;
const key = "slysh.language";

export const getCurrentLanguage = async () => {
  return await get({ key } as LanguageMessage);
};

export const setCurrentLanguage = async (langCode: string) => {
  const languageMessage: LanguageMessage = { value: langCode, key };
  await set(languageMessage);
};
