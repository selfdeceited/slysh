import App from "./App.svelte";
import { localize } from "./i18n";

localize();
const app = new App({
  target: document.body,
});

export default app;
