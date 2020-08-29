import { addMessages, init } from "svelte-i18n";

import en from "./translations/en.json";
import ru from "./translations/ru.json";

export const localize = () => {
  addMessages("en", en);
  addMessages("en-US", en);
  addMessages("ru", ru);

  init({
    fallbackLocale: "en",
    initialLocale: "ru", //getLocaleFromNavigator(),
  });
};
